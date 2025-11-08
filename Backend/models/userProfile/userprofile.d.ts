import { Model, Document } from "mongoose";
import mongoose from "mongoose";
export interface profile extends Document {
    user: mongoose.Schema.Types.ObjectId;
    name: string;
    contact: Number;
    profilePhoto: Buffer;
    region: string;
}
declare const profileModel: Model<profile>;
export default profileModel;
//# sourceMappingURL=userprofile.d.ts.map