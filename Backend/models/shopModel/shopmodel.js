import mongoose, { Schema, Document, Model } from "mongoose";
const shopSchema = new Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ShopName: {
        type: String,
        required: true,
    },
    ShopPhoto: {
        type: Buffer,
        required: true,
    },
    Industry: {
        type: String,
        required: true,
    },
    NumberOfWorkers: {
        type: Number,
        required: true,
    },
    ElectricityPerUnitRate: {
        type: Number,
        required: true,
    },
    ShopIsOnRent: {
        type: Boolean,
        required: true,
    },
    ShopRent: {
        type: Number,
        required: function () {
            return this.ShopIsOnRent;
        },
    },
});
const ShopModel = mongoose.model("Shop", shopSchema);
export default ShopModel;
//# sourceMappingURL=shopmodel.js.map