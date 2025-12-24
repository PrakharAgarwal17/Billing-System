import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../../models/userModel/userModel.js";
import type { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
}

export default async function isloggedin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token =
      req.cookies.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as CustomJwtPayload;

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ attach ObjectId
    (req as any).userId = user._id;

    next();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
