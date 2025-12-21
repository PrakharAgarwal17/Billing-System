import mongoose from "mongoose"
import {Schema,Model,Document} from "mongoose"

export interface cartinfo extends Document{
    userId:mongoose.Types.ObjectId,
    shopId:mongoose.Types.ObjectId,
    cart:CartItem[],
    totalPrice:Number
}

interface CartItem {
  productId: mongoose.Types.ObjectId;
  price: number;
  addedAt: Date;
}

const cartSchema=new Schema<cartinfo>({
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
     },
     shopId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"shop",
        required:true
     },
     cart:{
        type:[{
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
        default : 0
     }
})

const cartModel:Model<cartinfo>=mongoose.model<cartinfo>("Cart",cartSchema)

export default cartModel
