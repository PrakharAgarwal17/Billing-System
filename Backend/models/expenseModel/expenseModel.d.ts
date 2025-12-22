import mongoose, { Model, Document } from "mongoose";
export interface expenseInterface extends Document {
    userId: mongoose.Types.ObjectId;
    shopId: mongoose.Types.ObjectId;
    heading: string;
    description: string;
    spend: Number;
}
declare const expense: Model<expenseInterface>;
export default expense;
//# sourceMappingURL=expenseModel.d.ts.map