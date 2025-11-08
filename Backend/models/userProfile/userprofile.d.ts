import { Model, Document } from "mongoose";
export interface profile extends Document {
    name: string;
    contact: Number;
    profilePhoto: Buffer;
    region: string;
}
declare const profileModel: Model<profile>;
export default profileModel;
//# sourceMappingURL=userprofile.d.ts.map