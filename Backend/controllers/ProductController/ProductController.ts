import { response, type Request, type Response } from "express";
import productModel from "../../models/productModel/productModel.js";
import { error } from "console";
import mongoose from "mongoose";
import orderModel from "../../models/orderModel/orderModel.js";
import nodemailer from "nodemailer";
import userModel from "../../models/userModel/userModel.js";

export async function addProduct(req: Request, res: Response) {
  try {
    const userid = req.userId?.toString();

    if (!userid) {
      return res.status(401).json({ message: "Unauthorized entry" });
    }

    const {
      ProductName,
      ProductQty,
      PerProductSP,
      PerProductCP,
      DiscountedPrice,
    } = req.body;

    if (typeof ProductName !== "string" || !ProductName.trim()) {
      return res.status(400).json({ message: "Invalid type of ProductName" });
    }
    if (
      isNaN(Number(ProductQty)) ||
      typeof ProductQty !== "number" ||
      ProductQty < 0
    ) {
      return res
        .status(400)
        .json({ message: "Invalid type of Product Quantity" });
    }
    if (
      isNaN(Number(PerProductSP)) ||
      typeof PerProductSP !== "number" ||
      PerProductSP < 0
    ) {
      return res
        .status(400)
        .json({ message: "Invalid type of Product Selling Price" });
    }
    if (
      isNaN(Number(PerProductCP)) ||
      typeof PerProductCP !== "number" ||
      PerProductCP < 0
    ) {
      return res
        .status(400)
        .json({ message: "Invalid type of Product Cost Price" });
    }
    if (
      isNaN(Number(DiscountedPrice)) ||
      typeof DiscountedPrice !== "number" ||
      DiscountedPrice < 0
    ) {
      return res
        .status(400)
        .json({ message: "Invalid type of Discounted Price" });
    }

    const shopId = req.params.shopId;

    if (
      typeof shopId !== "string" ||
      !mongoose.Types.ObjectId.isValid(shopId)
    ) {
      return res.status(400).json({ message: "Error in finding the shop" });
    }

    const ProductPhoto = req.file ? `/uploads/${req.file.filename}` : null;
    if (ProductPhoto && typeof ProductPhoto !== "string") {
      return res.status(400).json({ message: "Invalid Product photo" });
    }

    const product = await productModel.create({
      userId: userid,
      shopId: shopId,
      ProductName,
      ProductQty,
      PerProductSP,
      PerProductCP,
      ProductPhoto,
      DiscountedPrice,
    });
    if (product) {
      return res.status(200).json({ message: "Product added successfully" });
    } else {
      return res.json(400).json({ message: "Something went wrong" });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const userId = req.userId?.toString();
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized entry" });
    }

    const shopId = req.params.shopId;
    if (
      typeof shopId !== "string" ||
      !mongoose.Types.ObjectId.isValid(shopId)
    ) {
      return res.status(400).json({ message: "Error in finding the shop" });
    }

    const productId = req.params.productId;
    if (
      typeof productId !== "string" ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).json({ message: "Error in finding product" });
    }

    const {
      ProductName,
      ProductQty,
      PerProductSP,
      PerProductCP,
      DiscountedPrice,
    } = req.body;

    if (typeof ProductName !== "string" || !ProductName.trim()) {
      return res.status(400).json({ message: "Invalid type of ProductName" });
    }
    if (
      isNaN(Number(ProductQty)) ||
      typeof ProductQty !== "number" ||
      ProductQty < 0
    ) {
      return res
        .status(400)
        .json({ message: "Invalid type of Product Quantity" });
    }
    if (
      isNaN(Number(PerProductSP)) ||
      typeof PerProductSP !== "number" ||
      PerProductSP < 0
    ) {
      return res
        .status(400)
        .json({ message: "Invalid type of Product Selling Price" });
    }
    if (
      isNaN(Number(PerProductCP)) ||
      typeof PerProductCP !== "number" ||
      PerProductCP < 0
    ) {
      return res
        .status(400)
        .json({ message: "Invalid type of Product Cost Price" });
    }
    if (
      isNaN(Number(DiscountedPrice)) ||
      typeof DiscountedPrice !== "number" ||
      DiscountedPrice < 0
    ) {
      return res
        .status(400)
        .json({ message: "Invalid type of Discounted Price" });
    }

    const ProductPhoto = req.file ? `/uploads/${req.file.filename}` : null;

    if (ProductPhoto && typeof ProductPhoto !== "string") {
      return res.status(400).json({ message: "Invalid Product photo" });
    }

    const updatedProduct = await productModel.findOneAndUpdate(
      { userId: userId, shopId: shopId, _id: productId },
      {
        ProductName,
        ProductQty,
        PerProductSP,
        ProductPhoto,
        PerProductCP,
        DiscountedPrice,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Something went wrong" });
    } else {
      return res
        .status(200)
        .json({ message: "Product updated succesfully", updatedProduct });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

export async function delProduct(req: Request, res: Response) {
  try {
    const userId = req.userId?.toString();
    const shopId = req.params.shopId;
    const productId = req.params.productId;
    if (
      typeof userId !== "string" ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(401).json({ message: "Invalid user" });
    } else if (
      typeof shopId !== "string" ||
      !mongoose.Types.ObjectId.isValid(shopId)
    ) {
      return res.status(400).json({ message: "Shop not found" });
    } else if (
      typeof productId !== "string" ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).json({ message: "Product not found" });
    } else {
      await productModel.findOneAndDelete({
        userId: userId,
        shopId: shopId,
        _id: productId,
      });
      return res.status(200).json({ message: "Deleted successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

export async function getProduct(req: Request, res: Response) {
  try {
    const userId = req.userId?.toString();
    const productId = req.params.productId;
    const shopId = req.params.shopId;

    const Response = await productModel.findOne({
      userId: userId,
      _id: productId,
      shopId: shopId,
    });

    if (
      typeof userId !== "string" ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(401).json({ message: "Invalid user" });
    }
    if (
      typeof shopId !== "string" ||
      !mongoose.Types.ObjectId.isValid(shopId)
    ) {
      return res.status(400).json({ message: "Shop not found" });
    }
    if (
      typeof productId !== "string" ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).json({ message: "Product not found" });
    }

    if (!Response) {
      return res.status(404).json({ message: error });
    }

    return res.send(Response);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

export async function lowquantityalert(req: Request, res: Response) {
  try {
    const userId = req.userId?.toString();

    if (
      typeof userId !== "string" ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(401).json({ message: "User unauthorised" });
    }

    const shopId = req.params.shopId;

    if (
      typeof shopId !== "string" ||
      !mongoose.Types.ObjectId.isValid(shopId)
    ) {
      return res.status(400).json({ message: "Shop Id not found" });
    }

    const orderId = req.params.orderId;

    if (
      typeof orderId !== "string" ||
      !mongoose.Types.ObjectId.isValid(orderId)
    ) {
      return res.status(400).json({ message: "order Id not found" });
    }

    const order = await orderModel.findOne({ _id: orderId, shopId, userId });

    if (order == null || order == undefined) {
      return res.status(400).json({ message: "order  is null or undefined" });
    }

    const cartofOrder = order?.cart;
    let arrayofProduct: string[] = [];

    let productId;

    cartofOrder.map((product) => {
      productId = product.productId.toString();
      arrayofProduct.push(productId);
    });

    for (const product of arrayofProduct) {
      const findproduct = await productModel.findOne({
        _id: product,
        userId,
        shopId,
      });

      if (findproduct == null || findproduct == undefined) {
        return res.status(400).json({ message: "product not found" });
      }

      const productquantity = Number(findproduct?.ProductQty);

      if (productquantity < 10) {
        const userData = await userModel.findOne({ _id: userId });
        if(userData===null || userData===undefined){
          return res.status(400).json({message:"User not found"})
        }
        
        const email = userData?.email;
        const username = userData?.name
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });

        await transporter.sendMail({
  from: `"Billing System" <${process.env.EMAIL}>`,
  to: email,
  subject: "🚨 Critical Stock Alert | Immediate Attention Required",
  html: `
  <div style="margin:0;padding:0;background-color:#0f172a;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
      <tr>
        <td align="center">

          <!-- Main Container -->
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;font-family:Segoe UI,Roboto,Arial,sans-serif;">

            <!-- Header -->
            <tr>
              <td style="background:#020617;padding:20px 24px;color:#ffffff;">
                <h1 style="margin:0;font-size:20px;font-weight:600;letter-spacing:0.5px;">
                  BILLING SYSTEM
                </h1>
                <p style="margin:6px 0 0;font-size:13px;color:#94a3b8;">
                  Inventory Monitoring Alert
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px;color:#0f172a;">
                <p style="margin:0 0 14px;font-size:14px;">
                  Hello <strong>${username}</strong>,
                </p>

                <p style="margin:0 0 18px;font-size:14px;line-height:1.6;">
                  This is a system-generated alert to inform you that the following
                  product has reached a <strong style="color:#dc2626;">critical stock level</strong>.
                </p>

                <!-- Product Card -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;">
                  <tr>
                    <td style="padding:14px;background:#f8fafc;border-bottom:1px solid #e5e7eb;">
                      <span style="font-size:12px;color:#64748b;">PRODUCT NAME</span>
                      <div style="font-size:15px;font-weight:600;margin-top:4px;">
                        ${findproduct.ProductName}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px;">
                      <span style="font-size:12px;color:#64748b;">REMAINING QUANTITY</span>
                      <div style="font-size:22px;font-weight:700;color:#dc2626;margin-top:4px;">
                        ${findproduct.ProductQty}
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Warning -->
                <div style="margin-top:22px;padding:14px;border-left:4px solid #dc2626;background:#fef2f2;">
                  <p style="margin:0;font-size:13px;color:#991b1b;">
                    Immediate restocking is strongly recommended to avoid
                    operational disruption.
                  </p>
                </div>

                <!-- CTA -->
                <div style="margin-top:26px;text-align:center;">
                  <span style="display:inline-block;background:#020617;color:#ffffff;padding:12px 20px;border-radius:6px;font-size:13px;font-weight:500;">
                    Review Inventory Dashboard
                  </span>
                </div>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc;padding:16px;text-align:center;">
                <p style="margin:0;font-size:11px;color:#64748b;">
                  © ${new Date().getFullYear()} Billing System • Automated Notification
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </div>
  `
});

        
      return res.status(200).json({message : `email send to ${email}`})}
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err });
  }
}
