import { response } from "express";
import productModel from "../../models/productModel/productModel.js";
import { error } from "console";
import mongoose from "mongoose";
export async function addProduct(req, res) {
    try {
        const userid = req.userId?.toString();
        if (!userid) {
            return res.status(401).json({ message: "Unauthorized entry" });
        }
        const { ProductName, ProductQty, PerProductSP, PerProductCP, DiscountedPrice, } = req.body;
        if (typeof ProductName !== "string" || !ProductName.trim()) {
            return res.status(400).json({ message: "Invalid type of ProductName" });
        }
        if (isNaN(Number(ProductQty)) || typeof ProductQty !== "number" || ProductQty < 0) {
            return res.status(400).json({ message: "Invalid type of Product Quantity" });
        }
        if (isNaN(Number(PerProductSP)) || typeof PerProductSP !== "number" || PerProductSP < 0) {
            return res.status(400).json({ message: "Invalid type of Product Selling Price" });
        }
        if (isNaN(Number(PerProductCP)) || typeof PerProductCP !== "number" || PerProductCP < 0) {
            return res.status(400).json({ message: "Invalid type of Product Cost Price" });
        }
        if (isNaN(Number(DiscountedPrice)) || typeof DiscountedPrice !== "number" || DiscountedPrice < 0) {
            return res.status(400).json({ message: "Invalid type of Discounted Price" });
        }
        const shopId = req.params.shopId;
        if (typeof shopId !== "string" || !mongoose.Types.ObjectId.isValid(shopId)) {
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
        }
        else {
            return res.json(400).json({ message: "Something went wrong" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
}
export async function updateProduct(req, res) {
    try {
        const userId = req.userId?.toString();
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized entry" });
        }
        const shopId = req.params.shopId;
        if (typeof shopId !== "string" || !mongoose.Types.ObjectId.isValid(shopId)) {
            return res.status(400).json({ message: "Error in finding the shop" });
        }
        const productId = req.params.productId;
        if (typeof productId !== "string" || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Error in finding product" });
        }
        const { ProductName, ProductQty, PerProductSP, PerProductCP, DiscountedPrice, } = req.body;
        if (typeof ProductName !== "string" || !ProductName.trim()) {
            return res.status(400).json({ message: "Invalid type of ProductName" });
        }
        if (isNaN(Number(ProductQty)) || typeof ProductQty !== "number" || ProductQty < 0) {
            return res.status(400).json({ message: "Invalid type of Product Quantity" });
        }
        if (isNaN(Number(PerProductSP)) || typeof PerProductSP !== "number" || PerProductSP < 0) {
            return res.status(400).json({ message: "Invalid type of Product Selling Price" });
        }
        if (isNaN(Number(PerProductCP)) || typeof PerProductCP !== "number" || PerProductCP < 0) {
            return res.status(400).json({ message: "Invalid type of Product Cost Price" });
        }
        if (isNaN(Number(DiscountedPrice)) || typeof DiscountedPrice !== "number" || DiscountedPrice < 0) {
            return res.status(400).json({ message: "Invalid type of Discounted Price" });
        }
        const ProductPhoto = req.file ? `/uploads/${req.file.filename}` : null;
        if (ProductPhoto && typeof ProductPhoto !== "string") {
            return res.status(400).json({ message: "Invalid Product photo" });
        }
        const updatedProduct = await productModel.findOneAndUpdate({ userId: userId, shopId: shopId, _id: productId }, {
            ProductName,
            ProductQty,
            PerProductSP,
            ProductPhoto,
            PerProductCP,
            DiscountedPrice
        }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Something went wrong" });
        }
        else {
            return res.status(200).json({ message: "Product updated succesfully", updatedProduct });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
}
export async function delProduct(req, res) {
    try {
        const userId = req.userId?.toString();
        const shopId = req.params.shopId;
        const productId = req.params.productId;
        if (typeof userId !== "string" || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(401).json({ message: "Invalid user" });
        }
        else if (typeof shopId !== "string" || !mongoose.Types.ObjectId.isValid(shopId)) {
            return res.status(400).json({ message: "Shop not found" });
        }
        else if (typeof productId !== "string" || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Product not found" });
        }
        else {
            await productModel.findOneAndDelete({ userId: userId, shopId: shopId, _id: productId });
            return res.status(200).json({ message: "Deleted successfully" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
}
export async function getProduct(req, res) {
    try {
        const userId = req.userId?.toString();
        const productId = req.params.productId;
        const shopId = req.params.shopId;
        const Response = await productModel.findOne({ userId: userId, _id: productId, shopId: shopId });
        if (typeof userId !== "string" || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(401).json({ message: "Invalid user" });
        }
        if (typeof shopId !== "string" || !mongoose.Types.ObjectId.isValid(shopId)) {
            return res.status(400).json({ message: "Shop not found" });
        }
        if (typeof productId !== "string" || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Product not found" });
        }
        if (!Response) {
            return res.status(404).json({ message: error });
        }
        return res.send(Response);
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
}
//# sourceMappingURL=ProductController.js.map