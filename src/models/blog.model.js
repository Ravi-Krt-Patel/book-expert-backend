const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
	BlogTilte:{
		type:String,
		required:[true, "please add a product name"]
	},
	Description:{
		type:String,
		required:[true, "please add a description"]
	},
	Image:{type:String, required:[false, "please add a brand"]},
	
},{
	timestamps:true,
	versionKey:false
});


module.exports = mongoose.model("Blog",BlogSchema);