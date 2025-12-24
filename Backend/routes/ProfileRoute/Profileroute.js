import express from "express";
import { addprofile, updateprofile, getprofile } from "../../controllers/ProfileController/profilecontroller.js";
import { upload } from "../../config/Multer_config/multer_config.js";
import isloggedin from "../../middleware/Auth/Auth.js";
const router = express.Router();
router.post("/addprofile", isloggedin, upload.single("profilePhoto"), addprofile);
router.put("/updateprofile", isloggedin, upload.single("profilePhoto"), updateprofile);
router.get("/getprofile", isloggedin, getprofile);
export default router;
//# sourceMappingURL=Profileroute.js.map