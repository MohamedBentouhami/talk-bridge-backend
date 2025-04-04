import { Request } from "express";
import multer, { FileFilterCallback, Multer } from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    }
    ,
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

const fileFilter = (req :Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
  
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!') as any, false);
    }
  };
  
  const upload = multer({ 
    storage, 
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size
    fileFilter
  });

export default upload;