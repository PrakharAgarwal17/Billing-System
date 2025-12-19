import type { Request, Response } from "express";
import ShopModel from "../../models/shopModel/shopmodel.js";

export async function createShop(req: Request, res: Response) {
  try {
    const {
      ShopName,
      Industry,
      NumberOfWorkers,
      ElectricityPerUnitRate,
      ShopIsOnRent,
      ShopRent,
    } = req.body;

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

  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
}

export async function updateShop (req:Request,res:Response) {
try { 

 const shopId = req.params.shopId
 console.log(shopId)
 const {
      ShopName,
      Industry,
      NumberOfWorkers,
      ElectricityPerUnitRate,
      ShopIsOnRent,
      ShopRent,
    } = req.body;
    
    
    if (!req.userId) {
      return res.status(401).json({ message: "unauthorized" });
    }
    console.log(req.userId)
    console.log(req.userId.toString())
    const userId=req.userId.toString()
    
    const ShopPhoto = req.file ? `/uploads/${req.file.filename}` : null;
    
    const shopinfo  = await ShopModel.findOneAndUpdate({UserId:userId,_id:shopId},{
      ShopName,
      ShopPhoto,
      Industry,
      NumberOfWorkers,
      ElectricityPerUnitRate,
      ShopIsOnRent,
      ShopRent,
    })
    if(!shopinfo){
      res.status(404).send({message:"Shop not found"})
    }else {
    res.status(200).send({message:"Done updating..."})
    }
  }catch(err){
  return res.status(400).json({
      success: false,
      message: err || "Something went wrong",
    });
}
}