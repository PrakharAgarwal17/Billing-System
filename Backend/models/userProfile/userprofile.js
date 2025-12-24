import { Schema, Model, Document } from "mongoose";
import mongoose from "mongoose";
const profileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    profilePhoto: {
        type: Buffer,
        required: true,
    },
    region: {
        type: String,
        required: true
    }
});
const profileModel = mongoose.model("profile", profileSchema);
export default profileModel;
//# sourceMappingURL=userprofile.js.map