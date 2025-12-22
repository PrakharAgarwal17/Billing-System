import Razorpay from "razorpay";
import orderModel from "../../models/orderModel/orderModel.js";
import razorpayInstance from "../../config/Razorpay/RazorPay.js";
import crypto from "crypto";
export async function paymentGateway(req, res) {
    try {
        const userId = req.userId?.toString();
        const shopId = req.params.shopId;
        const orderId = req.params.orderId;
        // 🔐 Auth checks
        if (!userId) {
            return res.status(401).json({ message: "User unauthorized" });
        }
        if (!shopId || !orderId) {
            return res.status(400).json({ message: "shopId or orderId missing" });
        }
        // 📦 Fetch order from DB
        const order = await orderModel.findOne({
            _id: orderId,
            userId,
            shopId,
        });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        const amount = Number(order.totalPrice);
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid order amount" });
        }
        // 💳 Create Razorpay Order
        const razorpayOrder = await razorpayInstance.orders.create({
            amount: amount * 100, // ₹ → paise
            currency: "INR",
            receipt: `order_${orderId}`,
            notes: {
                userId,
                shopId,
                dbOrderId: orderId,
            },
        });
        console.log(razorpayOrder);
        // ✅ Send Razorpay order to frontend
        return res.status(200).json({
            success: true,
            razorpayOrder,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to create Razorpay order",
            error,
        });
    }
}
export async function verifyPayment(req, res) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", String(process.env.RAZORPAY_KEY_SECRET))
            .update(body.toString())
            .digest("hex");
        if (expectedSignature === razorpay_signature) {
            return res.status(200).json({ success: true });
        }
        else {
            return res.status(400).json({ success: false });
        }
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
}
//# sourceMappingURL=paymentController.js.map