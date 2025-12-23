import mongoose from "mongoose";
import orderModel from "../../models/orderModel/orderModel.js";
import businessAnalytics from "../../models/businessAnalyticsModel/businessAnalyticsModel.js";
import expenseModel from "../../models/expenseModel/expenseModel.js";
export async function businessanalytics(req, res) {
    try {
        const userId = req.userId;
        const paramShopId = req.params.shopId;
        const orderId = req.params.orderId || null;
        const expenseId = req.params.expenseId || null;
        if (!userId || !paramShopId) {
            return res.status(400).json({ message: "Credentials missing" });
        }
        let shopId;
        try {
            shopId = new mongoose.Types.ObjectId(paramShopId);
        }
        catch (err) {
            return res.status(400).json({ message: "Invalid shopId" });
        }
        const sumOfTotalSale = await orderModel.aggregate([
            { $match: { shopId } },
            { $group: { _id: null, grandTotal: { $sum: "$totalPrice" } } }
        ]);
        const totalSale = sumOfTotalSale[0]?.grandTotal || 0;
        const expenseDone = await expenseModel.aggregate([
            { $match: { shopId } },
            { $group: { _id: null, totalSpend: { $sum: "$spend" } } }
        ]);
        const totalExpense = expenseDone[0]?.totalSpend || 0;
        const tillDateIncome = totalSale - totalExpense;
        const updatedData = await businessAnalytics.findOneAndUpdate({ userId, shopId: paramShopId }, {
            userId,
            shopId: paramShopId,
            orderId,
            expenseId,
            totalmonthlyincome: tillDateIncome
        }, { new: true, upsert: true });
        return res.status(200).json({
            success: true,
            totalSale,
            totalExpense,
            tillDateIncome,
            analytics: updatedData
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err });
    }
}
export async function starproductsupdate(req, res) {
    try {
        const userId = req.userId;
        const paramShopId = req.params.shopId;
        const businessAnalyticsId = req.params.businessanalyticsId;
        if (!paramShopId || !businessAnalyticsId) {
            return res.status(400).json({ message: "All requirements not filled" });
        }
        const shopId = new mongoose.Types.ObjectId(paramShopId);
        const starProduct = await orderModel.aggregate([
            { $match: { shopId } },
            { $unwind: "$cart" },
            {
                $group: {
                    _id: "$cart.productId",
                    quantity: { $sum: 1 },
                    price: { $sum: "$cart.price" }
                }
            },
            { $sort: { quantity: -1 } },
            { $limit: 10 },
            {
                $project: {
                    id: "$cart.productId",
                    quantity: 1,
                    price: 1
                }
            }
        ]);
        const updatedAnalytics = await businessAnalytics.findByIdAndUpdate(businessAnalyticsId, { $set: { starProducts: starProduct } }, { new: true });
        return res.status(200).json({
            success: true,
            starProducts: starProduct
        });
    }
    catch (error) {
        console.error("Star product update error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
//# sourceMappingURL=BusinessAnalyticsController.js.map