
const express = require('express');
const connection = require("./configs/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//all controllers
const userController = require("./controllers/user.controller");


//all midleware
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());



require("dotenv").config();
const port = process.env.PORT || 4232;


//all apis
app.use("/user",userController);
app.get("/",(req,res)=>{
	return res.json({massage:"your application is working perfectaly"})
})

app.listen(port, async()=>{
	await connection();
	console.log(`listening on port ${port}`);
})


