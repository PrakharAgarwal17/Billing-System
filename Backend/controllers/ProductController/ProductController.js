import { response } from "express";
import productModel from "../../models/productModel/productModel.js";
import { error } from "console";
export async function addProduct(req, res) {
    try {
        const userid = req.userId?.toString();
        console.log(userid);
        const { ProductName, ProductQty, PerProductSP, PerProductCP, DiscountedPrice, } = req.body;
        const shopId = req.params.shopId;
        console.log(shopId);
        if (!userid) {
            res.status(401).json({ message: "Unauthorized entry" });
        }
        else if (!shopId) {
            res.status(400).json({ message: "Shop not found" });
        }
        const ProductPhoto = req.file ? `/uploads/${req.file.filename}` : null;
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
            res.status(201).json({ message: "Product added successfully" });
            console.log(product);
        }
        else {
            res.json(400).json({ message: "Something went wrong" });
        }
    }
    catch (err) {
        res.status(404).json({ message: err });
    }
}
export async function updateProduct(req, res) {
    try {
        const userId = req.userId?.toString();
        console.log(userId);
        const shopId = req.params.shopId;
        console.log(shopId);
        const productId = req.params.productId;
        console.log(productId);
        const { ProductName, ProductQty, PerProductSP, PerProductCP, DiscountedPrice, } = req.body;
        if (!shopId) {
            res.status(400).json({ message: "Shop not found" });
        }
        if (!userId) {
            res.status(400).json({ message: "Unauthorised user" });
        }
        const ProductPhoto = req.file ? `/uploads/${req.file.filename}` : null;
        const updatedProduct = await productModel.findOneAndUpdate({ userId: userId, shopId: shopId, _id: productId }, {
            ProductName,
            ProductQty,
            PerProductSP,
            ProductPhoto,
            PerProductCP,
            DiscountedPrice
        }, { new: true });
        console.log(updatedProduct);
        if (!updatedProduct) {
            res.status(404).json({ message: "Something went wrong" });
        }
        else {
            res.status(200).json({ message: "Product updated succesfully", updatedProduct });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
}
export async function delProduct(req, res) {
    try {
        const userId = req.userId?.toString();
        const shopId = req.params.shopId;
        const productId = req.params.productId;
        await productModel.findOneAndDelete({ userId: userId, shopId: shopId, _id: productId });
        if (!userId) {
            res.status(401).json({ message: "Unauthorised user" });
        }
        else if (!shopId) {
            res.status(400).json({ message: "Shop not found" });
        }
        else if (!productId) {
            res.status(400).json({ message: "Product not found" });
        }
        else {
            res.status(200).json({ message: "Deleted successfully" });
        }
    }
    catch (err) {
        res.status(404).json("");
    }
}
export async function getProduct(req, res) {
    try {
        const userId = req.userId?.toString();
        const productId = req.params.productId;
        const shopId = req.params.shopId;
        const Response = await productModel.findOne({ userId: userId, _id: productId, shopId: shopId });
        if (!userId) {
            res.status(401).json({ message: "Unauthorised user" });
        }
        if (!shopId) {
            res.status(400).json({ message: "Shop not found" });
        }
        if (!productId) {
            res.status(400).json({ message: "Product not found" });
        }
        if (!response) {
            res.status(404).json({ message: error });
        }
        else {
            res.json(Response);
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: err });
    }
}
//# sourceMappingURL=ProductController.js.map