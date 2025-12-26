import {  type Request, type Response } from "express";
import cartModel from "../../models/cartModel/cartModel.js";
import orderModel from "../../models/orderModel/orderModel.js";
import mongoose from "mongoose";
import axios from "axios";

export async function confirmOrder(req: Request, res: Response) {
  try {
    const userId = req.userId?.toString();
    const cartId = req.params.cartId;
    const shopId = req.params.shopId;
   let token: string | undefined;

if (req.cookies?.token) {
  token = req.cookies.token;
} else if (
  typeof req.headers.authorization === "string" &&
  req.headers.authorization.startsWith("Bearer ")
) {
  token = req.headers.authorization.split(" ")[1];
}

if (!token) {
  return res.status(401).json({ message: "Authentication token missing" });
}


    if (!userId) {
      return res.status(401).json({ message: "Unauthorised user" });
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

    axios.post(
  `http://localhost:3000/product/lowquantityalert/${shopId}/${order._id}`,
  {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
).catch(err => {
  console.error("Low stock alert failed:", err.message);
});

// ALWAYS succeed order
return res.status(200).json({
  message: "Order created successfully",
  orderId: order._id,
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
      return res.status(401).json({ message: "Unauthorized User" });
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

//http://localhost:3000/order/confirmorder/:6946a7f3437fae93a718b6d5/:69481db921bef9412fc3bda1