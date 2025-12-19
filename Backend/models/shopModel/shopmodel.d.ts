import mongoose, { Document, Model } from "mongoose";
export interface ShopInfo extends Document {
    UserId: mongoose.Types.ObjectId;
    ShopName: string;
    ShopPhoto?: string;
    Industry: string;
    NumberOfWorkers: number;
    ElectricityPerUnitRate: number;
    ShopIsOnRent: boolean;
    ShopRent?: number;
}
declare const ShopModel: Model<ShopInfo>;
export default ShopModel;
//# sourceMappingURL=shopmodel.d.ts.map