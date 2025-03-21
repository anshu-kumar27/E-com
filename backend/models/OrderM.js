const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    shippingInfo:{
        address:{
            type:String , 
            required:true
        },
        country:{
            type:String , 
            default:"india",
        },
        city:{
            type:String , 
            required:true
        },
        state:{
            type:String , 
            required:true
        },
        pincode:{
            type:Number , 
            required:true
        },
        phoneNo:{
            type:Number , 
            required:true,
            minLength:[10,"phone number should be of min 10 digits"],
            maxLength:[10,"phone number should be of max 10 digits"]
        },
    },
    orderItems:[
        {
        name:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
        },
        image:{
            type:String,
            required:true,
        },
        product:{
            type: mongoose.Schema.ObjectId,
            ref:"Product",
            required:true, // 4:11
        }
    }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    paymentInfo:{
        id:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            required:true,
        }
    },
    paidAt:{
        type:Date,
        required:true,
    },
    itemsPrice:{
        type:Number,
        default:0,
        required:true
    },
    taxPrice:{
        type:Number,
        default:0,
        required:true
    },
    shippingPrice:{
        type:Number,
        default:0,
        required:true
    },
    totalPrice:{
        type:Number,
        default:0,
        required:true
    },
    orderStatus:{
        type:String,
        default:"Processing",
        required:true
    },
    deliveredAt:Date,
    createdAt:{
        type:Date,
        default:Date.now,
        
    },
})

module.exports = mongoose.model("Order", OrderSchema);