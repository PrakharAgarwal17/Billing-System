import express, { Router } from "express";
import isloggedin from "../../middleware/Auth/Auth.js";
import { businessanalytics, starproductsupdate } from "../../controllers/BusinessAnalyticsController/BusinessAnalyticsController.js";
const router = express.Router();
router.put("/businesslogic/:shopId/:orderId/:expenseId", isloggedin, businessanalytics);
router.put("/starproductupdate/:shopId/:businessanalyticsId", isloggedin, starproductsupdate);
export default router;
//# sourceMappingURL=businessAnalyticsroutes.js.map