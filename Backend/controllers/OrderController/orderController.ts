import type { Request, Response } from "express";
import cartModel from "../../models/cartModel/cartModel.js";
import orderModel from "../../models/orderModel/orderModel.js";
import mongoose from "mongoose";

export async function confirmOrder(req: Request, res: Response) {
  try {
    const userId = req.userId?.toString();
    const cartId = req.params.cartId;
    const shopId = req.params.shopId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorised u" });
    }
    if (
      typeof cartId !== "string" ||
      !mongoose.Types.ObjectId.isValid(cartId)
    ) {
      return res.status(400).json({ message: "Invalid cartId" });
    }
    if (
      typeof shopId !== "string" ||
      !mongoose.Types.ObjectId.isValid(shopId)
    ) {
      return res.status(400).json({ message: "Invalid shopId" });
    }

    const findingcart = await cartModel.findOne({
      userId: userId,
      shopId: shopId,
      _id: cartId,
    });

    if (!findingcart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const finalcart = findingcart?.cart;
    const finalprice = findingcart?.totalPrice;

    if (
      typeof findingcart.totalPrice !== "number" ||
      findingcart.totalPrice <= 0
    ) {
      return res.status(400).json({ message: "Invalid cart price" });
    }

    const order = await orderModel.create({
      userId: userId,
      shopId: shopId,
      cartId: cartId,
      cart: finalcart,
      totalPrice: finalprice,
      orderAt: new Date(),
    });

    console.log(finalprice);
    console.log(finalcart);

    return res.status(200).json({
      message: order,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function order(req: Request, res: Response) {
  try {
    const userId = req.userId?.toString();
    const cartId = req.params.cartId;
    const shopId = req.params.shopId;

    console.log(userId, shopId, cartId);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (
      typeof cartId !== "string" ||
      !mongoose.Types.ObjectId.isValid(cartId)
    ) {
      return res.status(400).json({ message: "Invalid cartId" });
    }
    if (
      typeof shopId !== "string" ||
      !mongoose.Types.ObjectId.isValid(shopId)
    ) {
      return res.status(400).json({ message: "Invalid shopId" });
    }
    if (!userId) {
      return res.status(401).json({ message: "Unauthorised u" });
    }

    const order = await orderModel.findOne({ userId, shopId, cartId });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    return res.status(201).json(order);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}