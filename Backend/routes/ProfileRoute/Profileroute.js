import express from "express";
import { addprofile } from "../../controllers/ProfileController/profilecontroller.js";
import { upload } from "../../config/Multer_config/multer_config.js";
import isloggedin from "../../middleware/Auth/Auth.js";
const router = express.Router();
router.post("/addprofile", isloggedin, upload.single("profilePhoto"), addprofile);
export default router;
//# sourceMappingURL=Profileroute.js.map