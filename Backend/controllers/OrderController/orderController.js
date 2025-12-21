import cartModel from "../../models/cartModel/cartModel.js";
import orderModel from "../../models/orderModel/orderModel.js";
export async function confirmOrder(req, res) {
    try {
        const userId = req.userId?.toString();
        const cartId = req.params.cartId;
        const shopId = req.params.shopId;
        console.log(userId, shopId, cartId);
        if (!cartId) {
            return res.status(400).json({ message: "Cart not found" });
        }
        if (!shopId) {
            return res.status(400).json({ message: "Shop not found" });
        }
        if (!userId) {
            return res.status(401).json({ message: "Unauthorised u" });
        }
        const findingcart = await cartModel.findOne({
            userId: userId,
            shopId: shopId,
            _id: cartId,
        });
        console.log(findingcart);
        const finalcart = findingcart?.cart;
        const finalprice = findingcart?.totalPrice;
        const order = await orderModel.create({
            userId: userId,
            shopId: shopId,
            cartId: cartId,
            cart: finalcart,
            totalPrice: finalprice,
            orderAt: new Date()
        });
        console.log(finalprice);
        console.log(finalcart);
        return res.status(200).json({
            message: order
        });
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
}
export async function order(req, res) {
    try {
        const userId = req.userId?.toString();
        const cartId = req.params.cartId;
        const shopId = req.params.shopId;
        console.log(userId, shopId, cartId);
        if (!cartId) {
            return res.status(400).json({ message: "Cart not found" });
        }
        if (!shopId) {
            return res.status(400).json({ message: "Shop not found" });
        }
        if (!userId) {
            return res.status(401).json({ message: "Unauthorised u" });
        }
        const order = await orderModel.findOne({ userId, shopId, cartId });
        return res.status(201).json(order);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
}
//# sourceMappingURL=orderController.js.map