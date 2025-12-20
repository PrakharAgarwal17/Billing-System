import mongoose from "mongoose";
import { Model, Document } from "mongoose";
export interface productInfo extends Document {
    userId: mongoose.Types.ObjectId;
    shopId: mongoose.Types.ObjectId;
    ProductName: String;
    ProductQty: Number;
    PerProductSP: Number;
    ProductPhoto: Buffer;
    PerProductCP: Number;
    DiscountedPrice: Number;
}
declare const product: Model<productInfo>;
export default product;
//# sourceMappingURL=productModel.d.ts.map