import express from "express";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../models/userModel/userModel.js";
import type { UserInfo } from "../../models/userModel/userModel.js";

import nodemailer from "nodemailer";

const otpStorage = new Map<string, any>();

export const SignUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, shopName }: UserInfo = req.body;
    console.log(" Signup request received:", req.body);

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

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
        pass: process.env.PASSWORD, // Must be Google App Password!
      },
    });

    const info = await transporter.sendMail({
      from: `"Billing System" <${process.env.EMAIL}>`,
      to: email,
      subject: "Verify your Billing System OTP",
      html: `
        <p>Hello ${name},</p>
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
  } catch (err) {
    console.error("❌ Error in SignUp:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};



export const VerifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    console.log("🔍 Verifying OTP for:", email);

    const data = otpStorage.get(email);
    if (!data || data.otp !== otp) {
      console.log("❌ Invalid or expired OTP");
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await userModel.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      shopName: data.shopName,
    });

    otpStorage.delete(email);

    const token: string = jwt.sign({ email: data.email }, process.env.JWT_KEY as string, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    console.log("✅ User created successfully:", data.email);
    res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    console.error("❌ Error in VerifyOTP:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};


export const SignIn = async (req: Request, res: Response) => {
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

const isPasswordValid = await bcrypt.compare(password, user.password as string);

    console.log("🔑 Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("❌ Invalid password");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token: string = jwt.sign({ email: user.email }, process.env.JWT_KEY as string, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    console.log("✅ Login successful for:", user.email);
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("🔥 SignIn error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const ForgotPassword= async (req: Request , res:Response)=>{

  try {
    const {email , password, confirmPassword} = req.body
    const user = await userModel.findOne({email})
     
    if(user) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStorage.set(email, {
      otp,
      email,
      password,
      confirmPassword
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD, // Must be Google App Password!
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
    }else{
      console.log("user does not exist ")
    }


  }catch(err){
  console.error("🔥 forgotpass error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export const VerifyForgotPassword=async (req:Request,res:Response)=>{

  try{
    const {email , otp} = req.body
    const data=otpStorage.get(email)
    if(otp===data.otp){
      if(data.password===data.confirmPassword){
        const hashedPassword=await bcrypt.hash(data.password,10)
        userModel.findOneAndUpdate({email},{password : hashedPassword})
      }
      else{
        res.status(400).json({error: "Entered pass does not match"})
        otpStorage.delete(email)
      }
    }else {
      res.status(400).json({error:"OTP doesnt match"})
      otpStorage.delete(email)
  }

  
  }catch(err){
  console.log(err)
    
  }
   
}

