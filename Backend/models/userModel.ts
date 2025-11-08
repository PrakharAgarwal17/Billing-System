import mongoose, { Schema, Document, Model } from "mongoose";

export interface UserInfo extends Document {
  name: string;
  email: string;
  password: string;
  shopName: string;
}

const userSchema: Schema<UserInfo> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, // ✅ fixed typo
  },
  shopName: {
    type: String,
    required: true,
  },
});

const userModel: Model<UserInfo> = mongoose.model<UserInfo>("user", userSchema);
export default userModel;
