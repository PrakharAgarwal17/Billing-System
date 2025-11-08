import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import type { Request } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, path.join(__dirname, "../uploads")); // ✅ correct relative folder
  },
  filename: function (req: Request, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });
