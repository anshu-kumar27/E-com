const Order = require('../models/OrderM');
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require('../middleware/catchAsyncerrors');
const Product = require("../models/productM");

// create new order 
exports.newOrder = catchAsync(async(req,res,next)=>{
    const {
        shippingInfo, 
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice} = req.body;

        const order = await Order.create({
        shippingInfo, 
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
        });
        res.status(201).json({
            success:true,
            order,
        })
})


// get single order 
exports.getSingleOrder = catchAsync(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if(!order){
        return next(new ErrorHandler("order not found this ID ", 404));

    }

    res.status(200).json({
        success:true,
        order,
    })
})

//get logged in user orders 
exports.myOrders = catchAsync(async(req,res,next)=>{
    const order = await Order.find({user:req.user._id});
    
    res.status(200).json({
        success:true,
        order,
    })
})


//get all orders
exports.getAllOrders = catchAsync(async(req,res,next)=>{
    const orders = await Order.find();
    
    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})

// //update order status
// exports.updateOrder = catchAsync(async(req,res,next)=>{
//     const order = await Order.find(req.params.id);
    
//     if(order.orderStatus === 'Delivered'){
//         return next(new ErrorHandler( "you have already delivered this order",404));
//     }

//     order.orderItems.forEach(async (order)=>{
//         await updateStock(order.Product,order.quantity);
//     })

//     order.orderStatus = req.body.status;
//     order.deliveredAt = Date.now();
//     res.status(200).json({
//         success:true,
//         order
//     })
// })