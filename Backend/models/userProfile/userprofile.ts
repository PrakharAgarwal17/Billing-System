import {Schema,Model,Document} from "mongoose"
import mongoose from "mongoose"


export interface profile extends Document{
    user:mongoose.Schema.Types.ObjectId,
    name:string,
    contact:Number,
    profilePhoto:Buffer,
    region:string
}
const profileSchema:Schema<profile>=new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    name:{
        type:String,
        required: true
    } , 
    contact: {
        type : Number , 
        required: true
    },
    profilePhoto : {
    type : Buffer ,
    required : true,
    } , 
    region:{
        type:String,
        required:true
    }
})
const profileModel : Model<profile> = mongoose.model<profile>("profile" , profileSchema)
export default profileModel;