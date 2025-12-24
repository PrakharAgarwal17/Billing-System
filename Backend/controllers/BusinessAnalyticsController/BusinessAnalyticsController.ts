import mongoose from "mongoose";
import type { Request, Response } from "express";
import orderModel from "../../models/orderModel/orderModel.js";
import businessAnalytics from "../../models/businessAnalyticsModel/businessAnalyticsModel.js";
import expenseModel from "../../models/expenseModel/expenseModel.js";
import { order } from "../OrderController/orderController.js";

export async function businessanalytics(req: Request, res: Response) {
  try {
    const userId = req.userId?.toString();
    const paramShopId = req.params.shopId;
    const orderId = req.params.orderId || null;
    const expenseId = req.params.expenseId || null;

    if (!userId || !paramShopId) {
      return res.status(400).json({ message: "Credentials missing" });
    }

    if (
      typeof orderId !== "string" ||
      !mongoose.Types.ObjectId.isValid(orderId)
    ) {
      return res.status(400).json({ message: "Invalid orderId" });
    }
    if (
      typeof expenseId !== "string" ||
      !mongoose.Types.ObjectId.isValid(expenseId)
    ) {
      return res.status(400).json({ message: "Invalid orderId" });
    }
    let shopId: mongoose.Types.ObjectId;
    try {
      shopId = new mongoose.Types.ObjectId(paramShopId);
    } catch (err) {
      return res.status(400).json({ message: "Invalid shopId" });
    }

    const sumOfTotalSale = await orderModel.aggregate([
      { $match: { shopId } },
      { $group: { _id: null, grandTotal: { $sum: "$totalPrice" } } },
    ]);
    if (!sumOfTotalSale) {
      return res.status(400).json({ message: "sum of total sale not found" });
    }
    const totalSale = sumOfTotalSale[0]?.grandTotal || 0;
    if (!totalSale) {
      return res.status(400).json({ message: "total sale not found" });
    }

    const expenseDone = await expenseModel.aggregate([
      { $match: { shopId } },
      { $group: { _id: null, totalSpend: { $sum: "$spend" } } },
    ]);
    if (!expenseDone) {
      return res.status(400).json({ message: "expense done not found" });
    }
    const totalExpense = expenseDone[0]?.totalSpend || 0;
    if (!totalExpense) {
      return res.status(400).json({ message: "total expense not found" });
    }

    const tillDateIncome = totalSale - totalExpense;

    if (!tillDateIncome) {
      return res
        .status(400)
        .json({ message: "tilldate income not calculated" });
    }
    const updatedData = await businessAnalytics.findOneAndUpdate(
      { userId, shopId: paramShopId },
      {
        userId,
        shopId: paramShopId,
        orderId,
        expenseId,
        totalmonthlyincome: tillDateIncome,
      },
      { new: true, upsert: true }
    );
    if (!updatedData) {
      return res.status(400).json({ message: "sale not updaetd" });
    } else {
      return res.status(200).json({
        success: true,
        totalSale,
        totalExpense,
        tillDateIncome,
        analytics: updatedData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err });
  }
}
export async function starproductsupdate(req: Request, res: Response) {
  try {
    const userId = req.userId?.toString();
    const paramShopId = req.params.shopId;
    const businessAnalyticsId = req.params.businessanalyticsId;

    if (
      typeof businessAnalyticsId !== "string" ||
      !mongoose.Types.ObjectId.isValid(businessAnalyticsId)
    ) {
      return res.status(400).json({ message: "Invalid orderId" });
    }

    const shopId = new mongoose.Types.ObjectId(paramShopId);

    const starProduct = await orderModel.aggregate([
      { $match: { shopId } },
      { $unwind: "$cart" },
      {
        $group: {
          _id: "$cart.productId",
          quantity: { $sum: 1 },
          price: { $sum: "$cart.price" },
        },
      },
      { $sort: { quantity: -1 } },
      { $limit: 10 },
      {
        $project: {
          id: "$cart.productId",
          quantity: 1,
          price: 1,
        },
      },
    ]);

    if (!starProduct) {
      return res.status(400).json({ message: "star product not found" });
    }
    const updatedAnalytics = await businessAnalytics.findByIdAndUpdate(
      businessAnalyticsId,
      { $set: { starProducts: starProduct } },
      { new: true }
    );

    if (!updatedAnalytics) {
      return res.status(400).json({ message: "not done updated analytics " });
    } else {
      return res.status(200).json({
        success: true,
        starProducts: starProduct,
      });
    }
  } catch (error) {
    console.error("Star product update error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
