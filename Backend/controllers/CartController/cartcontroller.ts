import type { Request, Response } from "express";
import productModel from "../../models/productModel/productModel.js";
import cartModel from "../../models/cartModel/cartModel.js";
import orderModel from "../../models/orderModel/orderModel.js";
export async function addToCart(req: Request, res: Response) {
  try {
    const userId = req.userId?.toString();
    if (!userId) return res.status(401).json({ message: "Unauthorized user" });

    const shopId = req.params.shopId;
    if (!shopId) return res.status(400).json({ message: "Shop ID missing" });
    const productId = req.params.productId;
    if (!productId)
      return res.status(400).json({ message: "Product ID missing" });

    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const price = Number(product.DiscountedPrice ?? product.PerProductSP);

    await productModel.findOneAndUpdate(
      { userId: userId, shopId: shopId, _id: productId },
      {
        $inc: {
          ProductQty: -1,
        },
      }
    );

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

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "Failed to add product to cart", error: err });
  }
}

export async function removetoCart(req: Request, res: Response) {
  try {
    const userId = req.userId?.toString();
    const shopId = req.params.shopId;
    const productId = req.params.productId;
    if (!productId) {
      return res.status(400).json({ message: "Product not found" });
    }
    if (!shopId) {
      return res.status(400).json({ message: "Shop not found" });
    }
    if (!userId) {
      return res.status(401).json({ message: "Unauthorised u" });
    }
    //(!productId || !userId || !shopId )? res.status(404).json ({message : "invalid"}): res.send("all parameters are ok")
    console.log(productId, userId, shopId);

    const finalCart = await cartModel.findOne({ userId, shopId }); //yeh final cart h abhi tk

    if (!finalCart) {
      return res.status(404).json({ message: "cart not found" });
    }
    console.log(finalCart);
    //[{item},{item},{item},{item}]
    const cartIndex = finalCart?.cart.findIndex(function (item) {
      const productid = item.productId.toString();
      return productid === productId;
    });
    if (cartIndex == -1) {
      return res.status(404).json({ message: "Product not added in the cart" });
    }

    const price = finalCart.cart[cartIndex]?.price;

    // finalcart -> cart []-> productId (uska first occucrance) -> price

    finalCart.totalPrice = Number(finalCart.totalPrice) - Number(price);

    finalCart.cart.splice(cartIndex, 1);

    await productModel.findOneAndUpdate(
      { userId: userId, shopId: shopId, _id: productId },
      {
        $inc: {
          ProductQty: 1,
        },
      }
    );
    await finalCart.save();

    return res.status(200).json({ message: "product deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err });
  }
}

