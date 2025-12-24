import type { Request, Response } from "express";
import expenseModel from "../../models/expenseModel/expenseModel.js";
import mongoose from "mongoose";

export async function addexpense(req: Request, res: Response) {
  try {
    const userId = req.userId?.toString();
    if (!userId) {
      return res.status(401).json({ message: "Unauthorised user" });
    }
    const shopId = req.params.shopId;
    console.log(shopId);

    if (
      typeof shopId !== "string" ||
      !mongoose.Types.ObjectId.isValid(shopId)
    ) {
      return res.status(400).json({ message: "shopId do not exist" });
    }

    const { heading, description, spend } = req.body;

    if (typeof heading !== "string" || !heading.trim()) {
      return res.status(400).json({ message: "Invalid heading" });
    }

    if (typeof description !== "string" || !description.trim()) {
      return res.status(400).json({ message: "Invalid description" });
    }

    if (typeof spend !== "number" || spend <= 0 || Number.isNaN(spend)) {
      return res.status(400).json({ message: "Invalid spend amount" });
    }

    const expense = await expenseModel.create({
      userId,
      shopId,
      heading,
      description,
      spend,
    });

    if (!expense) {
      return res.status(400).json({ success: false });
    } else {
      return res.status(202).json({ success: true });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

export async function deletexpense(req: Request, res: Response) {
  try {
    const userId = req.userId?.toString();
    if (!userId) {
      return res.status(401).json({ message: "Unauthorised user" });
    }
    const shopId = req.params.shopId;
    if (
      typeof shopId !== "string" ||
      !mongoose.Types.ObjectId.isValid(shopId)
    ) {
      return res.status(400).json({ message: "shopId do not exist" });
    }
    const expenseId = req.params.expenseId;

    if (
      typeof expenseId !== "string" ||
      !mongoose.Types.ObjectId.isValid(expenseId)
    ) {
      return res.status(400).json({ message: "expenseId do not exist" });
    }

    const remove = await expenseModel.findOneAndDelete({
      shopId: shopId,
      userId: userId,
      _id: expenseId,
    });
    console.log(remove);
    if (!remove) {
      return res.status(404).json({ message: "Expense not removed " });
    } else {
      return res.status(202).json({ success: true });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
