import mongoose, { Schema, Document, Model } from "mongoose";

export interface ShopInfo extends Document {
  UserId: mongoose.Types.ObjectId;
  ShopName: string;
  ShopPhoto: Buffer;
  Industry: string;
  NumberOfWorkers: number;
  ElectricityPerUnitRate: number;
  ShopIsOnRent: boolean;
  ShopRent?: number;
}

const shopSchema = new Schema<ShopInfo>({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  ShopName: {
    type: String,
    required: true,
  },
  ShopPhoto: {
    type: Buffer,
    required: true,
  },
  Industry: {
    type: String,
    required: true,
  },
  NumberOfWorkers: {
    type: Number,
    required: true,
  },
  ElectricityPerUnitRate: {
    type: Number,
    required: true,
  },
  ShopIsOnRent: {
    type: Boolean,
    required: true,
  },
  ShopRent: {
    type: Number,
    required: function (this: ShopInfo) {
      return this.ShopIsOnRent;
    }, 
  },
});

const ShopModel: Model<ShopInfo> = mongoose.model<ShopInfo>("Shop", shopSchema);
export default ShopModel;
