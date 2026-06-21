import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../models/userModel/userModel.js";
import type { UserInfo } from "../../models/userModel/userModel.js";

export const SignUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, shopName }: UserInfo = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      shopName,
    });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_KEY as string,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    console.error("❌ Error in SignUp:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const SignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user)
    const isPasswordValid = await bcrypt.compare(password, user.password as string);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_KEY as string,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("🔥 SignIn error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const SignOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("❌ Error in SignOut:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};