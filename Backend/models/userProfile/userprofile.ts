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
        ref: "email",
        require:true
    },
    name:{
        type:String,
        require: true
    } , 
    contact: {
        type : Number , 
        require: true
    },
    profilePhoto : {
    type : Buffer ,
    require : true,
    } , 
    region:{
        type:String,
        require:true
    }
})
const profileModel : Model<profile> = mongoose.model<profile>("profile" , profileSchema)
export default profileModel;