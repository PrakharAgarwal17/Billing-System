import expenseModel from "../../models/expenseModel/expenseModel.js";
export async function addexpense(req, res) {
    try {
        const userId = req.userId?.toString();
        if (!userId) {
            return res.status(401).json({ message: "Unauthorised user" });
        }
        const shopId = req.params.shopId;
        console.log(shopId);
        if (!shopId) {
            return res.status(401).json({ message: "Shop doesnt exists" });
        }
        const { heading, description, spend } = req.body;
        const expense = await expenseModel.create({
            userId, shopId, heading, description, spend
        });
        console.log(expense);
        if (!expense) {
            return res.status(404).json({ success: false });
        }
        else {
            return res.status(202).json({ success: true });
        }
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
}
export async function deletexpense(req, res) {
    try {
        const userId = req.userId?.toString();
        if (!userId) {
            return res.status(401).json({ message: "Unauthorised user" });
        }
        const shopId = req.params.shopId;
        if (!shopId) {
            return res.status(401).json({ message: "Shop doesnt exists" });
        }
        const expenseId = req.params.expenseId;
        if (!expenseId) {
            return res.status(404).json({ message: "Expense not found" });
        }
        const remove = await expenseModel.findOneAndDelete({ shopId: shopId, userId: userId, _id: expenseId });
        console.log(remove);
        if (!remove) {
            return res.status(404).json({ message: "Expense not removed " });
        }
        else {
            return res.status(202).json({ success: true });
        }
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}
//# sourceMappingURL=expenseController.js.map