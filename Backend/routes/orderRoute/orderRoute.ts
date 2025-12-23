import express, { Router } from "express"
import isloggedin from "../../middleware/Auth/Auth.js"
import { confirmOrder, order } from "../../controllers/OrderController/orderController.js"

const router = express.Router()

router.post("/confirmorder/:shopId/:cartId",isloggedin , confirmOrder )
router.get("/getorder/:shopId/:cartId",isloggedin , order)
export default router