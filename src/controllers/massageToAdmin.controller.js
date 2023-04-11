
const express = require('express');
const Massage = require("../models/massageToAdmin.model");
const Authenticator = require("../middleware/authentication");


//const { compareSync } = require('bcryptjs');
const router = express.Router();

//post method for product --------------------------------------------
router.post("/", async(req,res)=>{
	
	try{
		const massage = await Massage.create(req.body);
		return res.status(201).send({massage});
		
	}catch(err){
		res.status(500).send({message: err.message});
	}
});

// get all product ---------------------------------------------------
router.get("/",Authenticator, async(req,res)=>{
	try{
		const user = await req.user;
		if(user.user.role !=="admin"){
		   res.status(404).send({message:"you are not admin"})
		}else{
			const product = await Massage.find().lean().exec();
		    return res.status(201).send({product});
		}
		
	}catch(err){
		res.send({messge:err.message});
	}
});


module.exports = router;