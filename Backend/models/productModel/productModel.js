import mongoose from "mongoose";
import { Schema, Model, Document } from "mongoose";
const ProductSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    ProductName: {
        type: String,
        required: true,
    },
    ProductPhoto: {
        type: Buffer,
        required: false
    },
    ProductQty: {
        type: Number,
        required: true
    },
    PerProductSP: {
        type: Number,
        required: true
    },
    PerProductCP: {
        type: Number,
        required: true
    },
    DiscountedPrice: {
        type: Number,
        required: false
    }
});
const product = mongoose.model("product", ProductSchema);
export default product;
//# sourceMappingURL=productModel.js.map