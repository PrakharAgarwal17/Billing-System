import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../models/userModel/userModel.js";
import xss from "xss";
import nodemailer from "nodemailer";
const otpStorage = new Map();
export const SignUp = async (req, res) => {
    try {
        const rawData = req.body;
        const name = xss(rawData.name);
        const email = xss(rawData.email);
        const password = xss(rawData.password);
        const shopName = xss(rawData.shopName);
        console.log("Signup request received:", {
            name,
            email,
            shopName,
        });
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(otp);
        otpStorage.set(email, {
            otp,
            name,
            email,
            password,
            shopName,
        });
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        await transporter.sendMail({
            from: `"Billing System" <${process.env.EMAIL}>`,
            to: email,
            subject: "Verify your Billing System OTP",
            html: `
  <div style="margin:0;padding:0;background-color:#0f172a;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
      <tr>
        <td align="center">

          <!-- Main Container -->
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;font-family:Segoe UI,Roboto,Arial,sans-serif;">

            <!-- Header -->
            <tr>
              <td style="background:#020617;padding:20px 24px;color:#ffffff;">
                <h1 style="margin:0;font-size:20px;font-weight:600;letter-spacing:0.5px;">
                  BILLING SYSTEM
                </h1>
                <p style="margin:6px 0 0;font-size:13px;color:#94a3b8;">
                  Secure Account Verification
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px;color:#0f172a;">
                <p style="margin:0 0 14px;font-size:14px;">
                  Hello <strong>${email}</strong>,
                </p>

                <p style="margin:0 0 18px;font-size:14px;line-height:1.6;">
                  To continue with your request, please verify your identity
                  using the One-Time Password (OTP) provided below.
                </p>

                <!-- OTP Box -->
                <div style="text-align:center;margin:26px 0;">
                  <div style="
                    display:inline-block;
                    padding:16px 28px;
                    font-size:28px;
                    font-weight:700;
                    letter-spacing:8px;
                    color:#1e293b;
                    background:#f1f5f9;
                    border-radius:8px;
                    border:1px dashed #cbd5f5;
                  ">
                    ${otp}
                  </div>
                </div>

                <!-- Info -->
                <div style="padding:14px;background:#f8fafc;border-left:4px solid #2563eb;">
                  <p style="margin:0;font-size:13px;color:#1e3a8a;">
                    This OTP is valid for <strong>5 minutes</strong>.
                    Please do not share it with anyone.
                  </p>
                </div>

                <!-- Warning -->
                <p style="margin-top:18px;font-size:12px;color:#64748b;">
                  If you did not request this verification, you can safely ignore this email.
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc;padding:16px;text-align:center;">
                <p style="margin:0;font-size:11px;color:#64748b;">
                  © ${new Date().getFullYear()} Billing System • This is an automated message
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </div>
  `,
        });
        res.status(200).json({ message: "OTP sent successfully" });
        setTimeout(() => otpStorage.delete(email), 5 * 60 * 1000);
    }
    catch (err) {
        console.error("❌ Error in SignUp:", err);
        res.status(500).json({ error: "Failed to send OTP" });
    }
};
export const VerifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const data = otpStorage.get(email);
        if (!data || data.otp !== otp) {
            console.log("❌ Invalid or expired OTP");
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }
        // ✅ Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);
        // ✅ Create user
        await userModel.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            shopName: data.shopName,
        });
        const user = await userModel.findOne({ email: data.email });
        if (!user) {
            console.log("❌ User not found after creation");
            return res.status(404).json({ error: "User not found" });
        }
        otpStorage.delete(email);
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY, { expiresIn: "7d" });
        console.log("🪪 JWT Payload:", {
            id: user._id.toString(),
            email: user.email,
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        console.log("✅ User created successfully:", user.email);
        res.status(201).json({ message: "User created successfully", token });
    }
    catch (err) {
        console.error("❌ Error in VerifyOTP:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
};
export const SignIn = async (req, res) => {
    try {
        console.log("🟢 SignIn route hit");
        const { email, password } = req.body;
        console.log("📨 SignIn body:", req.body);
        const user = await userModel.findOne({ email });
        console.log("👤 Found user:", user ? user.email : "none");
        if (!user) {
            console.log("❌ User not found");
            return res.status(404).json({ error: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("🔑 Password valid:", isPasswordValid);
        if (!isPasswordValid) {
            console.log("❌ Invalid password");
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY, {
            expiresIn: "7d",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        console.log("✅ Login successful for:", user.email);
        res.status(200).json({ message: "Login successful", token });
    }
    catch (err) {
        console.error("🔥 SignIn error:", err);
        res.status(500).json({ error: "Server error" });
    }
};
export const ForgotPassword = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            otpStorage.set(email, {
                otp,
                email,
                password,
                confirmPassword,
            });
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            });
            const info = await transporter.sendMail({
                from: `"Billing System" <${process.env.EMAIL}>`,
                to: email,
                subject: "Verify your Billing System OTP",
                html: `
        <p>Hello ${email},</p>
        <p>Your OTP for Billing System is <b>${otp}</b>.</p>
        <p>This OTP will expire in 5 minutes.</p>
      `,
            });
            console.log("✅ OTP sent to:", email);
            console.log("🔢 OTP:", otp);
            console.log("📬 Message ID:", info.messageId);
            res.status(200).json({ message: "OTP sent successfully" });
            // Auto-delete OTP after 5 min
            setTimeout(() => otpStorage.delete(email), 5 * 60 * 1000);
        }
        else {
            console.log("user does not exist ");
        }
    }
    catch (err) {
        console.error("🔥 forgotpass error:", err);
        res.status(500).json({ error: "Server error" });
    }
};
export const VerifyForgotPassword = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const data = otpStorage.get(email);
        if (otp === data.otp) {
            if (data.password === data.confirmPassword) {
                const hashedPassword = await bcrypt.hash(data.password, 10);
                userModel.findOneAndUpdate({ email }, { password: hashedPassword });
            }
            else {
                res.status(400).json({ error: "Entered pass does not match" });
                otpStorage.delete(email);
            }
        }
        else {
            res.status(400).json({ error: "OTP doesnt match" });
            otpStorage.delete(email);
        }
    }
    catch (err) {
        console.log(err);
    }
};
//# sourceMappingURL=userController.js.map