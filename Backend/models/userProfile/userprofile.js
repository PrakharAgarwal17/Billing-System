import { Schema, Model, Document } from "mongoose";
import mongoose from "mongoose";
const profileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "email",
        require: true
    },
    name: {
        type: String,
        require: true
    },
    contact: {
        type: Number,
        require: true
    },
    profilePhoto: {
        type: Buffer,
        require: true,
    },
    region: {
        type: String,
        require: true
    }
});
const profileModel = mongoose.model("profile", profileSchema);
export default profileModel;
//# sourceMappingURL=userprofile.js.map