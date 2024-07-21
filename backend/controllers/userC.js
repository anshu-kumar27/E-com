const User = require("../models/userM");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require('../middleware/catchAsyncerrors');
const sendToken = require('../utils/JWTtoken');
const sendEmail = require("../utils/sendEmail.js");

//Register a user 
exports.registerUser = catchAsync(async(req,res,next)=>{

    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicURL"
        }
    })

    sendToken(user,201,res);
})

//login user
exports.loginUser = catchAsync(async(req,res,next)=>{
    const {email,password} =req.body;

    //checking if user has given password and mail both 
    if(!email || !password){
        return next(new ErrorHandler("please Enter Email & password",400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user || !(await user.comparePassword(password))){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    sendToken(user,200,res);

})

//logout user 
exports.logout = catchAsync(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    
    res.status(200).json({
        success:true,
        message:'logged out',
    })
})

// forgot password 
exports.forgotpassword = catchAsync(async(req,res,next)=>{
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorHandler("user not found",404));
    }
    // get reset password token 
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false});
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    
    const message = `your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it `;
    try {
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message,
        })
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500))
        
    }
})

//Reset password 
exports.resetPassword = catchAsync(async(req,res,next)=>{

    //creating token hash 
    const resetpass = crypto.createHash('sha256')
    .update(req.params.token)
    .digest("hex"); 

    const user = await User.findOne({
        resetpass,
        resetPasswordExpire:{$gt: Date.now()},
    });
    if(!user){
        return next(new ErrorHandler("Reset pass token is invalid or has been expired ",404));
    }
    if(req.body.password !== req.body.confirmpassword){
        return next(new ErrorHandler("password does not match  ",400));
    }

    user.password = req.body.password;
    user.resetpass = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res);
})


// Get user details 
exports.getUserDetails = catchAsync(async(req,res,next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    });
})

//update user password 
exports.updatePassword = catchAsync(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password")
    const ispasswordMatched = await user.comparePassword(req.body.oldPassword);
    
    if(!ispasswordMatched ){
        return next(new ErrorHandler("old password is not correct" , 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("password does not match" , 400));
    }
    user.password = req.body.newPassword;
    await user.save();

    sendToken(user,200,res);
})

//udpate user profiles 
exports.updateUserProfiles = catchAsync(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        // we will add cloudinary later
    } 
    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new:true,
        runValidators:false,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        user
    })
})

// get all users   -------- admin
exports.getAllUsers = catchAsync(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success:true,
        users,
    })
})

//get a single user -----admin
exports.getSingleuser = catchAsync(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler("user does not exist with such id",400));
    }
    res.status(200).json({
        success:true,
        user,
    })
})

//updating profiles ---admin 
exports.updateProfile = catchAsync(async(req,res,next)=>{
    const newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role

    }

    const user = await User.findByIdAndUpdate(req.params.id,newData,{
        runValidators:false,
        new:true,
        useFindAndModify:false
    });

    if(!user){
        return next(new ErrorHandler("user doesn't exist",404));
    }

    res.status(200).json({
        success:true,
        user
    })
})

//delete a user --- admin
exports.deleteUser = catchAsync(async(req,res,next)=>{
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
        return next(new ErrorHandler("user with this id dosen't exist",404));
    }
    res.status(200).json({
        success:true,
        message:"user has been deleted"
    })
})

