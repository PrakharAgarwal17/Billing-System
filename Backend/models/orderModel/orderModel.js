import mongoose from "mongoose";
import { Schema, Model, Document } from "mongoose";
const orderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shop",
        required: true
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
        required: true
    },
    cart: { type: [{
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                price: {
                    type: Number,
                    require: true
                },
                addedAt: {
                    type: Date,
                    default: Date.now
                }
            }],
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderAt: {
        type: Date,
        required: true
    },
});
const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
//# sourceMappingURL=orderModel.js.map