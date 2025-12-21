import mongoose from "mongoose";
import {Schema,Model,Document} from "mongoose"


export interface orderinfo extends Document {
     userId:mongoose.Types.ObjectId,
     shopId:mongoose.Types.ObjectId,
     cartId:mongoose.Types.ObjectId,
     cart:CartData[],
     totalPrice:Number,
     orderAt:Date,
}
interface CartData{
    productId:mongoose.Types.ObjectId,
    price:number,
    addedAt:Date
}

const orderSchema = new Schema<orderinfo>({

    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    shopId: {
         type : mongoose.Schema.Types.ObjectId,
         ref:"shop",
         required:true
    },
    cartId: {
     type : mongoose.Schema.Types.ObjectId,
     ref: "cart",
     required:true
    },
    cart:{type:[{
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            price : {
                type : Number , 
                require : true
            } , 
            addedAt : {
                type : Date , 
                default : Date.now
            }
        
        }],
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    orderAt : {
        type:Date,
        required:true
    },
})

const orderModel: Model<orderinfo> = mongoose.model<orderinfo>("order" , orderSchema)

export default orderModel