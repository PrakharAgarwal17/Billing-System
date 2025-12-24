import type { Request, Response } from "express";
import productModel from "../../models/productModel/productModel.js";
import cartModel from "../../models/cartModel/cartModel.js";
import mongoose from "mongoose";
export async function addToCart(req: Request, res: Response) {
  try {
    const userId = req.userId?.toString();
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const shopId = req.params.shopId;

    if (
      typeof shopId !== "string" ||
      !mongoose.Types.ObjectId.isValid(shopId)
    ) {
      return res.status(400).json({ message: "shop if not found" });
    }

    const productId = req.params.productId;

    if (
      typeof productId !== "string" ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).json({ message: "shop if not found" });
    }

    const product = await productModel.findById(productId);

    if (!product) return res.status(400).json({ message: "Product not found" });

    const price = Number(product.DiscountedPrice ?? product.PerProductSP);

    const updateproductquantity = await productModel.findOneAndUpdate(
      { userId: userId, shopId: shopId, _id: productId },
      {
        $inc: { ProductQty: -1 },
      }
    );

    if (!updateproductquantity) {
      return res.status(400).json({ message: "product not found" });
    }
    const cart = await cartModel.findOneAndUpdate(
      { userId, shopId },
      {
        $push: {
          cart: {
            productId: product._id,
            price,
            addedAt: new Date(),
          },
        },
        $inc: {
          totalPrice: price,
        },
      },
      { new: true, upsert: true }
    );
    if (!cart) {
      res.status(400).json({ message: "cart not updated" });
    }
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to add product to cart", error: err });
  }
}

export async function removetoCart(req: Request, res: Response) {
  try {
    const userId = req.userId?.toString();
    const shopId = req.params.shopId;
    const productId = req.params.productId;
    if (
      typeof productId !== "string" ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).json({ message: "shop if not found" });
    }
    if (
      typeof shopId !== "string" ||
      !mongoose.Types.ObjectId.isValid(shopId)
    ) {
      return res.status(400).json({ message: "shop if not found" });
    }
    if (!userId) {
      return res.status(401).json({ message: "Unauthorised u" });
    }
    //(!productId || !userId || !shopId )? res.status(404).json ({message : "invalid"}): res.send("all parameters are ok")
    console.log(productId, userId, shopId);

    const finalCart = await cartModel.findOne({ userId, shopId }); //yeh final cart h abhi tk

    if (!finalCart) {
      return res.status(400).json({ message: "cart not found" });
    }
    console.log(finalCart);
    //[{item},{item},{item},{item}]
    const cartIndex = finalCart?.cart.findIndex(function (item) {
      const productid = item.productId.toString();
      return productid === productId;
    });

    if (cartIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    const price = finalCart.cart[cartIndex]?.price;

    if (!price) {
      return res.status(400).json({ message: "price do not exist" });
    }

    finalCart.totalPrice = Number(finalCart.totalPrice) - Number(price);

    finalCart.cart.splice(cartIndex, 1);

    const updateproductquantity = await productModel.findOneAndUpdate(
      { userId: userId, shopId: shopId, _id: productId },
      {
        $inc: {
          ProductQty: 1,
        },
      }
    );

    if (!updateproductquantity) {
      return res.status(400).json({ message: "product quantity not updated" });
    } else {
      await finalCart.save();
      return res.status(200).json({ message: "product deleted successfully" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
}
