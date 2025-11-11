import type { Request,Response } from "express"
import ShopModel from "../../models/shopModel/shopmodel.js"
import type {ShopInfo} from "../../models/shopModel/shopmodel.js"
export async function createShop(req:Request , res:Response) {

    
    try {

        const {
            ShopName,
            Industry,
            NumberOfWorkers,
            ElectricityPerUnitRate,
            ShopIsOnRent,
            ShopRent} : ShopInfo = req.body

const ShopPhoto=req.file?`/uploads/${req.file.filename}`:null

    await ShopModel.create({
    ShopName,
    ShopPhoto,
    Industry,
    NumberOfWorkers,
    ElectricityPerUnitRate,
    ShopIsOnRent,
    ShopRent
})
}catch(err) {
    console.log("error aya hai ")
    res.status(400).json({message:err})
}
}       


