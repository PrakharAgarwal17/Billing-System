import mongoose, { Schema, Model, Document, mongo, trusted } from "mongoose";
const businessAnalyticsSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    expenseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expense",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    totalmonthlyincome: {
        type: Number,
        required: true
    },
    starProducts: {
        type: [{
                productName: {
                    type: String
                },
                productQtySold: {
                    type: Number
                },
                salesDone: {
                    type: Number
                }
            }]
    }
});
businessAnalyticsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 90 });
const businessAnalytics = mongoose.model("businessAnalytics", businessAnalyticsSchema);
export default businessAnalytics;
//# sourceMappingURL=businessAnalyticsModel.js.map