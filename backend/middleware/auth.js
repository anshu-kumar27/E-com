const ErrorHandler = require("../utils/errorHandler");
const catchAsyncerrors = require("./catchAsyncerrors");
const jwt = require('jsonwebtoken')
const User = require('../models/userM')


exports.isAuthenticatedUser = catchAsyncerrors(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401))
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});


exports.authorizedRoles=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){          
            return next( new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403))
        }
        next()
    }

}