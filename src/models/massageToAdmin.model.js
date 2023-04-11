const mongoose = require('mongoose');

const MessSchema = new mongoose.Schema({
	email:{
		type:String,
		required:[true, "please add a product name"]
	},
	massage:{
		type:String,
		required:[true, "please add a description"]
	}
	
},{
	timestamps:true,
	versionKey:false
});


module.exports = mongoose.model("Massage",MessSchema);