import mongoose, { Schema, Model, Document } from "mongoose";
const expenseModel = new mongoose.Schema({
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
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    spend: {
        type: Number,
        required: true
    }
});
const expense = mongoose.model("expense", expenseModel);
export default expense;
//# sourceMappingURL=expenseModel.js.map