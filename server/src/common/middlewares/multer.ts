import multer from 'multer';
import fs from 'fs';


//Setup Multer for file storage
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    }
});

 const upload = multer({storage: fileStorageEngine});
 
 export default upload;