import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import userModel from "../../models/userModel/userModel.js";
import type { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}


export default async function isloggedin ( req:Request  , res:Response , next:NextFunction){
 try{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
 
 if(token){
    const decoded = jwt.verify(token, process.env.JWT_KEY as string) as CustomJwtPayload ;
   const userid = decoded.id  
   const user = await userModel.findById(userid)
 if(!user){
    res.send("user not found")
   }
   next();
 }
 else{
    res.status(400).json({message:"token not found"})
 }}
 catch(err){
    console.log(err)
 }
}
