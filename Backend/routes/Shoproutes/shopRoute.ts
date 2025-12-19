import type { Request,Response } from "express";
import isloggedin from "../../middleware/Auth/Auth.js";
import express from "express"
import { createShop } from "../../controllers/ShopController/shopcontroller.js";
import { upload } from "../../config/Multer_config/multer_config.js";
import { updateShop } from "../../controllers/ShopController/shopcontroller.js";

const router = express.Router()

router.post("/addshop",isloggedin  , upload.single("ShopPhoto") , createShop )

router.put("/updateShop/:shopId", isloggedin,upload.single("ShopPhoto"),updateShop)

export default router