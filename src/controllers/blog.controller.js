const express = require('express');
const Product = require("../models/blog.model");
const upload = require("../middleware/file-upload");
const Authenticator = require("../middleware/authentication");


//const { compareSync } = require('bcryptjs');
const router = express.Router();

//post method for product --------------------------------------------
router.post("/",Authenticator, async(req,res)=>{
	
	try{
		const user = await req.user;

		if(user.user.role !=="admin"){
		 res.status(404).send({message:"you are not admin"})
		}else{
			const blog = await Product.create(req.body);
			return res.status(201).send({blog});
		}
		
	}catch(err){
		res.status(500).send({message: err.message});
	}
});

// get all product ---------------------------------------------------
router.get("/",async(req,res)=>{
	try{
		const product = await Product.find().lean().exec();
		return res.status(201).send({product});
	}catch(err){
		res.send({messge:err.message});
	}
});


// //search product------------------------------------------------------
router.get("/search",async(req,res)=>{
	try{
		if(!req.query.name){
			req.query.name = "";
		}
		
		const blog = await Product.find(
			{
				$or:[
					{BlogTilte:{"$regex":req.query.name,"$options":"i"}}
				]
			}
		);

		return res.json({blog})
		
		// 	const product = await Product.find({
		// 		$and:[
		// 			{$or:[
		// 				{ProductName:{"$regex":req.query.name,"$options":"i"}},
		// 				{brand:{$regex:req.query.name,"$options":"i"}},
		// 				{category:{$regex:req.query.name,"$options":"i"}}
		// 			]},
		// 			{
		// 				category:{$in:[...Qcategory]}
		// 			},
		// 			{
		// 				brand:{$in:[...QueryBrand]}
		// 			},
		// 			{
		// 				newPrice:{$gte:Qlowprice,$lte:Qhighprice}
		// 			},
		// 			{
		// 				// rating:{$gte:lRating,$lte:hRating}
		// 				rating:{$in:[...Rating]}
		// 			},
		// 			{
		// 				discount:{$gte:lDiscount,$lte:hDiscount}
		// 			}
		// 		]
		// 	}).skip(offset).limit(item);




		
		// }else{
		// 	try{
		// 		const product = await Product.find().lean().exec();
		// 		return res.status(201).send(product);
		// 	}catch(err){
		// 		res.send(err.message);
		// 	}
		// }

		
	}catch(err){
		res.send({message:err.message});
	}
});




// // testing search api---------------------------------
// router.get("/search/test",async(req,res)=>{
// 	try{
// 		const product = await Product.find({
// 			$and:[
// 				{newPrice:{$gte:5000,$lte:9000}}
// 			]
// 		});
// 		// const product = await Product.find().where("newPrice").gte(1000).where("newPrice").gte(9000).exec()
// 		return res.status(201).send(product);
// 	}catch(err){
// 		res.status(500).send({message:err.message});
// 	}
// })



// //update single product---------------------------------------------------------
// router.patch("/:id",Authenticator, async(req,res)=>{
// 	const user = await req.user
// 	try{
// 		let product;
// 		// if user is admin----------
// 		if(user.user.role == "admin"){
// 			const disObj = await Product.findOne({
// 				_id:req.params.id
// 			}).exec();
// 			let discount;
// 			req.body.newPrice = Number(req.body.newPrice)
// 			disObj.oldPrice = Number(disObj.oldPrice)
// 			if(Number(disObj.oldPrice) > req.body.newPrice){
// 				discount = Math.round(((disObj.oldPrice-req.body.newPrice)*100)/disObj.oldPrice);
// 			}
// 			// req.body.discount = discount;
// 			// product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});

// 			//updating new price and old price------------------------

// 			const brandCate = await Product.findOne({
// 				_id: req.params.id
// 			});

// 			// let lprice = Number(brandCate.newPrice);
// 			// if(lprice > req.body.newPrice){
// 			// 	lprice = req.body.newPrice;
// 			// }
// 			// let hprice = Number(brandCate.newPrice);
// 			// // req.body.oldPrice = Number(req.body.newPrice);
// 			// if(hprice < req.body.newPrice){
// 			// 	hprice = req.body.newPrice;
// 			// }
// 			const BC = await BrandCategory.findOne({
// 				category: brandCate.category
// 			});
// 			let lprice = Number(BC.lowPrice)
// 			if(lprice > req.body.newPrice){
// 				lprice = req.body.newPrice;
// 			}
// 			if(BC){
// 				await BrandCategory.findByIdAndUpdate(BC._id,{
// 					lowPrice:lprice,
// 					// highPrice:hprice
// 				},{new:true})
// 			}
// 			req.body.discount = discount;
// 			product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
// 			return res.status(201).send({product});
// 			//if user is user----------
// 		}else if(user.user.role == "user"){

// 			// let productArray = await Product.findById(req.params.id);
// 			// let totalRating = 0;
// 			// let checkUserReview = true;
// 			// productArray.reviews.forEach((el)=>{
// 			// 	if(el.email == user.user.email){
// 			// 		checkUserReview = false;
// 			// 		el.rating = req.body.rating;
// 			// 		el.comment = req.body.comment;
// 			// 	}
// 			// 	totalRating += el.rating;
// 			// })
// 			// if(checkUserReview){
// 			// 	product = await Product.findByIdAndUpdate(req.params.id,
// 			// 		{
// 			// 			reviews:[...productArray.reviews,{
// 			// 					name:user.user.name,
// 			// 					email:user.user.email,
// 			// 					rating:req.body.rating,
// 			// 					comment:req.body.comment
// 			// 				}],
// 			// 			numOfReviews:productArray.reviews.length+1,
// 			// 			rating:totalRating+req.body.rating
// 			// 		}	
// 			// 		,{new:true});
	
// 			// 		return res.status(201).send(product);
// 			// }else{
// 			// 	product = await Product.findByIdAndUpdate(req.params.id,
// 			// 		{
// 			// 			reviews:[...productArray.reviews],
// 			// 			numOfReviews:productArray.reviews.length,
// 			// 			rating:totalRating
// 			// 		}
						
// 			// 		,{new:true});
	
// 			// 		return res.status(201).send(product);
// 			// }




		


// 			const existReview = await Reviews.findOne({
// 				creater:user.user._id,
// 				item:req.params.id}).exec();
// 			//	console.log(existReview);
// 			let finalnumOfReviews;
// 			let finalRating;
// 			if(!existReview){
			
// 				const rw = await Reviews.create({
// 					comment: req.body.comment,
// 					rating:req.body.rating,
// 					creater:user.user._id,
// 					item:req.params.id
// 					});
					
// 				const oldrating = await Product.findOne({
// 					_id:req.params.id
// 				}).exec();
// 				finalnumOfReviews = oldrating.numOfReviews + 1;
// 				finalRating = Math.ceil((oldrating.rating*oldrating.numOfReviews + parseInt(req.body.rating))/finalnumOfReviews);
// 			}else{
			
// 				const creater = await Reviews.findOne({
// 					creater:user.user._id,
// 					item:req.params.id
// 				});
// 				await Reviews.findByIdAndUpdate(creater._id,{
// 					comment:req.body.comment,
// 					rating:req.body.rating
// 				},{new:true})
// 				const oldrating = await Product.findOne({
// 					_id:req.params.id
// 				}).exec();
// 				finalnumOfReviews = oldrating.numOfReviews;
// 				finalRating = Math.ceil((oldrating.rating*oldrating.numOfReviews-creater.rating + parseInt(req.body.rating))/finalnumOfReviews)
// 				//console.log(creater)
// 			}
			
// 			product = await Product.findByIdAndUpdate(req.params.id,
// 						{
// 							rating:finalRating,
// 							numOfReviews:finalnumOfReviews
// 						}	
// 						,{new:true});
// 			const reviews = await Reviews.find({item:req.params.id}).populate({
// 				path:"creater",
// 				select:["name", "email"]
// 			}).exec();

// 			res.status(200).send({product,reviews});
// 		}
		
// 	}catch(err){
// 		res.send({message:err.message});
// 	}
// })

// //get single product----------------------------------------------------
// router.get("/:id",async(req,res)=>{
// 	try{
		
// 		const product = await Product.findOne({_id:req.params.id}).lean().exec();
// 		if(!product){
// 			return res.status(500).json({
// 				success:false,
// 				message: 'Product not found'
// 			})
// 		}
// 		let searchName = product.ProductName;
// 		//for similer product
// 		const Similerproduct = await Product.find(
// 			{
// 				$or:[
// 					{ProductName:{"$regex":searchName.substring(0,5),"$options":"i"}},
// 					{brand:{$regex:product.brand,"$options":"i"}}
					
// 				]
// 			}
// 		).where("category").equals(product.category)
// 		.where("newPrice").gte(product.newPrice).exec();
// 		return res.status(201).send({product,Similerproduct});

// 	}catch(err){
// 		res.send(err.message);
// 	}
// });

// // delete single product--------------------------------------------------
// router.delete("/:id",Authenticator,async(req,res)=>{
// 	try{
// 		const user = await req.user;
// 		if(user.user.role == "admin"){
// 			const product = await Product.findByIdAndDelete({_id:req.params.id},{new:true});
// 			return res.status(201).send(product);
// 		}else{
// 			return res.status(404).send(
// 				{message:"you are not allowed to delete a product"});
// 		}
// 		//console.log(user.user);
		
// 	}catch(err){
// 		res.send(err.message);
// 	}
// });


// router.delete("/all/delete",Authenticator,async(req,res)=>{
// 	try{
// 		const user = await req.user;
// 	    if(user.user.role === "user"){
// 		res.status(404).send({
// 			message:"you can not delete all product"
// 		  })
// 	    }
// 		const product = await Product.deleteMany();
// 		return res.status(201).send(product);
// 	}catch(err){
// 		res.send(err.message);
// 	}
// })








module.exports = router;