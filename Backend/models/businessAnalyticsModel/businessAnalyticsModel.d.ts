import mongoose, { Model, Document } from "mongoose";
export interface businessAnalyticsInterface extends Document {
    userId: mongoose.Types.ObjectId;
    shopId: mongoose.Types.ObjectId;
    orderId: mongoose.Types.ObjectId;
    expenseId: mongoose.Types.ObjectId;
    createdAt: Date;
    totalmonthlyincome: Number;
    starProducts: insideStarProducts[];
}
interface insideStarProducts {
    productName: string;
    productQtySold: Number;
    salesDone: Number;
}
declare const businessAnalytics: Model<businessAnalyticsInterface>;
export default businessAnalytics;
//# sourceMappingURL=businessAnalyticsModel.d.ts.map