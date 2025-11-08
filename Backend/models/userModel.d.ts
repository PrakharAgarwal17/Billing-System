import { Document, Model } from "mongoose";
export interface UserInfo extends Document {
    name: string;
    email: string;
    password: string;
    shopName: string;
}
declare const userModel: Model<UserInfo>;
export default userModel;
//# sourceMappingURL=userModel.d.ts.map