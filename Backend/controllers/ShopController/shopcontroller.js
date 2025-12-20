import ShopModel from "../../models/shopModel/shopmodel.js";
export async function createShop(req, res) {
    try {
        const { ShopName, Industry, NumberOfWorkers, ElectricityPerUnitRate, ShopIsOnRent, ShopRent, } = req.body;
        if (!req.userId) {
            return res.status(401).json({ message: "unauthorized" });
        }
        const ShopPhoto = req.file ? `/uploads/${req.file.filename}` : null;
        await ShopModel.create({
            UserId: req.userId, // 🔥 LOGGED IN USER ID
            ShopName,
            ShopPhoto,
            Industry,
            NumberOfWorkers,
            ElectricityPerUnitRate,
            ShopIsOnRent,
            ShopRent,
        });
        return res.status(201).json({
            success: true,
            message: "Shop created successfully",
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message || "Something went wrong",
        });
    }
}
export async function updateShop(req, res) {
    try {
        const shopId = req.params.shopId;
        console.log(shopId);
        const { ShopName, Industry, NumberOfWorkers, ElectricityPerUnitRate, ShopIsOnRent, ShopRent, } = req.body;
        const userId = req.userId?.toString();
        if (!req.userId) {
            return res.status(401).json({ message: "unauthorized" });
        }
        const ShopPhoto = req.file ? `/uploads/${req.file.filename}` : null;
        const shopinfo = await ShopModel.findOneAndUpdate({ UserId: userId, _id: shopId }, {
            ShopName,
            ShopPhoto,
            Industry,
            NumberOfWorkers,
            ElectricityPerUnitRate,
            ShopIsOnRent,
            ShopRent,
        });
        if (!shopinfo) {
            res.status(404).send({ message: "Shop not found" });
        }
        else {
            res.status(200).send({ message: "Done updating..." });
        }
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err || "Something went wrong",
        });
    }
}
export async function delShop(req, res) {
    try {
        const userId = req.userId?.toString();
        const shopId = req.params.shopId;
        await ShopModel.findOneAndDelete({ UserId: userId, _id: shopId });
        if (!userId) {
            res.status(404).json({ message: "User is unauthorized" });
        }
        if (!shopId) {
            res.json({ message: "shop does not exist" });
        }
        else {
            res.status(201).json({ message: "shop deleted successfully" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "There is an error" });
    }
}
export async function renderShop(req, res) {
    try {
        const userId = req.userId?.toString();
        const shopId = req.params.shopId;
        if (!shopId) {
            return res.status(400).json({ message: "Shop ID missing" });
        }
        const store = await ShopModel.findOne({
            UserId: userId,
            _id: shopId,
        });
        if (!store) {
            return res.status(404).json({ message: "Shop Not Found" });
        }
        res.status(200).json(store);
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err,
        });
    }
}
//# sourceMappingURL=shopcontroller.js.map