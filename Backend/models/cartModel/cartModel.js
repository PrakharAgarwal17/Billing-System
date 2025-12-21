import mongoose from "mongoose";
import { Schema, Model, Document } from "mongoose";
const cartSchema = new Schema({
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
    cart: {
        type: [{
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
        default: 0
    }
});
const cartModel = mongoose.model("Cart", cartSchema);
export default cartModel;
//# sourceMappingURL=cartModel.js.map