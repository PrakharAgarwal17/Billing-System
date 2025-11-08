import type {profile } from "../../models/userProfile/userprofile.js";
import profileModel  from "../../models/userProfile/userprofile.js";
import multer from "multer"
import type { Request,Response } from "express";
import { upload } from "../../config/Multer_config/multer_config.js";
export async function addprofile (req:Request , res:Response) {
    try {
        
    const {name , contact , region} : profile =req.body;
    

    const profilePhoto = req.file ? `/uploads/${req.file.filename}` : null;
     
    await profileModel.create({
        name ,
        profilePhoto , 
        contact , 
        region
    })
    }
    catch (err) {
        console.log(err)
    }
}
   