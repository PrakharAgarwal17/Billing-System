import mongoose from "mongoose"
import {Schema,Model,Document} from "mongoose"

export interface productInfo extends Document{
    userId:mongoose.Types.ObjectId,
    shopId:mongoose.Types.ObjectId,
    ProductName:String,
    ProductQty:Number,
    PerProductSP:Number,
    ProductPhoto:Buffer,
    PerProductCP:Number,
    DiscountedPrice:Number
}

const ProductSchema = new Schema<productInfo>({
    
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true,
},
shopId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Shop",
    required:true
},
ProductName:{
    type:String,
    required:true,
},
ProductPhoto:{
    type:Buffer,
    required:false
},
ProductQty:{
    type:Number,
    required:true
},
PerProductSP:{
    type:Number,
    required:true
},
PerProductCP:{
    type:Number,
    required:true
},
DiscountedPrice : {
     type: Number,
     required:false
    }
}
)

const product:Model<productInfo>=mongoose.model<productInfo>("product",ProductSchema)
export default product