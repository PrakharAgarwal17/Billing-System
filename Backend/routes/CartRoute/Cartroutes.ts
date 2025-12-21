import express, { Router } from "express"
import isloggedin from "../../middleware/Auth/Auth.js"
import { addToCart, removetoCart } from "../../controllers/CartController/cartcontroller.js"

const router = express.Router()

router.post("/addtocart/:shopId/:productId" , isloggedin , addToCart )
router.post("/removetocart/:shopId/:productId" , isloggedin , removetoCart )

export default router