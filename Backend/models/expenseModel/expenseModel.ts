import mongoose , {Schema,Model,Document} from "mongoose"

export interface expenseInterface extends Document{
    userId:mongoose.Types.ObjectId,
    shopId:mongoose.Types.ObjectId,
    heading:string,
    description:string,
    spend:Number
}

const expenseModel =new mongoose.Schema<expenseInterface>({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    shopId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"shop",
        required:true
    },
    heading:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    spend:{
        type:Number,
        required:true
    }
})

const expense:Model<expenseInterface>=mongoose.model("expense",expenseModel)
export default expense