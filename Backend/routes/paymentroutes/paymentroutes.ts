import express from "express"
import isloggedin from "../../middleware/Auth/Auth.js"
import {paymentGateway} from "../../controllers/PaymentController/paymentController.js"
import {verifyPayment } from "../../controllers/PaymentController/paymentController.js"

const  router = express.Router()

router.post("/paymentorder/:shopId/:orderId" , isloggedin , paymentGateway)


router.post("/verify-payment",isloggedin,verifyPayment)

export default router



