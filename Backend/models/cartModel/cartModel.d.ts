import mongoose from "mongoose";
import { Model, Document } from "mongoose";
export interface cartinfo extends Document {
    userId: mongoose.Types.ObjectId;
    shopId: mongoose.Types.ObjectId;
    cart: CartItem[];
    totalPrice: Number;
}
interface CartItem {
    productId: mongoose.Types.ObjectId;
    price: number;
    addedAt: Date;
}
declare const cartModel: Model<cartinfo>;
export default cartModel;
//# sourceMappingURL=cartModel.d.ts.map