import mongoose from "mongoose";
import { Model, Document } from "mongoose";
export interface orderinfo extends Document {
    userId: mongoose.Types.ObjectId;
    shopId: mongoose.Types.ObjectId;
    cartId: mongoose.Types.ObjectId;
    cart: CartData[];
    totalPrice: Number;
    orderAt: Date;
}
interface CartData {
    productId: mongoose.Types.ObjectId;
    price: number;
    addedAt: Date;
}
declare const orderModel: Model<orderinfo>;
export default orderModel;
//# sourceMappingURL=orderModel.d.ts.map