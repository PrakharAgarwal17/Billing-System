import  express  from "express";
import isloggedin from "../../middleware/Auth/Auth.js";
import {addProduct} from "../../controllers/ProductController/ProductController.js";
import {updateProduct} from "../../controllers/ProductController/ProductController.js"
import { delProduct } from "../../controllers/ProductController/ProductController.js";
import { getProduct } from "../../controllers/ProductController/ProductController.js";

import { upload } from "../../config/Multer_config/multer_config.js";
const router = express.Router()

router.post("/addproduct/:shopId" , isloggedin ,upload.single("ProductPhoto"), addProduct)
router.put("/updateproduct/:shopId/:productId",isloggedin,upload.single("ProductPhoto") , updateProduct)
router.delete("/deleteproduct/:shopId/:productId" , isloggedin , delProduct)
router.get("/renderproduct/:shopId/:productId" , isloggedin , getProduct)
export default router