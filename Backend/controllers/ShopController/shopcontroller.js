import ShopModel from "../../models/shopModel/shopmodel.js";
export async function createShop(req, res) {
    try {
        const { ShopName, Industry, NumberOfWorkers, ElectricityPerUnitRate, ShopIsOnRent, ShopRent } = req.body;
        const ShopPhoto = req.file ? `/uploads/${req.file.filename}` : null;
        await ShopModel.create({
            ShopName,
            ShopPhoto,
            Industry,
            NumberOfWorkers,
            ElectricityPerUnitRate,
            ShopIsOnRent,
            ShopRent
        });
    }
    catch (err) {
        console.log("error aya hai ");
        res.status(400).json({ message: err });
    }
}
//# sourceMappingURL=shopcontroller.js.map