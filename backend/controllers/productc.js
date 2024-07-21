const Product = require("../models/productM");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require('../middleware/catchAsyncerrors')
const ApiFeatures = require('../utils/apifeatures');

//creating a  product --admin
exports.createProduct = catchAsync(async (req,res,next)=>{

    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})

// getting all products 
exports.getAllProducts = catchAsync(async (req,res,next)=>{

    const resultPerPage = 5;
    const productCount = await Product.countDocuments()
    const apifeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const product = await apifeature.query;
    res.status(201).json({
        product,
        productCount
    })
})

//update product 
exports.updateProduct = catchAsync(async (req,res,next)=>{
    let product = Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id , req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:"true",
        product
    })
})

//delete a product 
exports.deleteProduct = catchAsync(async(req,res,next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }

    await product.deleteOne()
    
    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
})

// to get a single product 
exports.getOneProduct = catchAsync(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404));
        }

    res.status(200).json({
        success:true,
        product
    })
})

// create new review or update the review 
exports.createProductreview = catchAsync(async(req,res,next)=>{
    const{rating,comment,productID} = req.body;
    const review = {
        user: req.user.id,
        name: req.user.name,
        rating:Number(rating),
        comment,
    }

    const product = await Product.findById(productID);

    if(!product){
        return next(new ErrorHandler("product not found",400));
    }

    const isReviewed = product.reviews.find(rev =>rev.user.toString()===req.user._id.toString());
    if(isReviewed){
        product.reviews.forEach(rev=>{
            if(rev.user.toString()=== req.user._id.toString()){
            (rev.rating = rating);
            (rev.comment = comment);}
        });
    }
    else{
        product.reviews.push(review);
        product.numofReviews = product.reviews.length;
    }
    let avg = product.reviews.reduce((total, rev) => total + rev.rating, 0) / product.reviews.length;
    product.ratings = avg;

    await product.save({
        validateBeforeSave:false,
    })
    res.status(200).json({
        success:true,
        rating
    })
})

// get all reviews of a product 
exports.getProductReviews = catchAsync(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("product not found",400));
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews,
    })
})

// delete a review 
exports.deleteReview = catchAsync(async(req,res,next)=>{
    const product = await Product.findById(req.query.productid);
    if(!product){
        return next(new ErrorHandler("product not found",400));
    }

    const reviews = product.reviews.filter(rev=> rev._id.toString() !== req.query.id.toString())

    let avg = 0;
reviews.forEach((rev) => {
    avg += rev.rating;
});
const ratings = avg / reviews.length;
    const numofReviews = reviews.length;
    console.log("Before Update:", product);

    await Product.findByIdAndUpdate(req.query.productid,{
        reviews,
        ratings,
        numofReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    console.log("After Update:", product);

    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})