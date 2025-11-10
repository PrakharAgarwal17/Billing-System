import type { Request,Response } from "express";
import isloggedin from "../../middleware/Auth/Auth.js";
import express from "express"
import { createShop } from "../../controllers/ShopController/shopcontroller.js";
import { upload } from "../../config/Multer_config/multer_config.js";

const router = express.Router()

router.post("/addshop" , isloggedin , upload.single("ShopPhoto") , createShop )

export default router