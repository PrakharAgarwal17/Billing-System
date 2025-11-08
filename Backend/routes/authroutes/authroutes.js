import express from "express";
import { SignUp, VerifyOTP, SignIn, ForgotPassword, VerifyForgotPassword } from "../../controllers/AuthController/userController.js";
const router = express.Router();
router.post("/signup", SignUp);
router.post("/verify", VerifyOTP);
router.post("/signin", SignIn);
router.post("/forgotpassword", ForgotPassword);
router.put("/verifyforgotpassword", VerifyForgotPassword);
export default router;
//# sourceMappingURL=authroutes.js.map