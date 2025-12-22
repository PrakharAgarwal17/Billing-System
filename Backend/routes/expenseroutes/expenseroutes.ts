import express from "express"
import { addexpense ,deletexpense } from "../../controllers/ExpenseController/expenseController.js"
import isloggedin from "../../middleware/Auth/Auth.js"


const router = express.Router()

router.post("/addexpense/:shopId" , isloggedin , addexpense )
router.delete("/deleteexpense/:shopId/:expenseId",isloggedin,deletexpense)

export default router