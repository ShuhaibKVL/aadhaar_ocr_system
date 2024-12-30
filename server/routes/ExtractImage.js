import express from 'express'
import { extractImage} from '../controllers/ExtractController.js'
import multer from 'multer'

const upload = multer({dest:'uploads'})

const router = express.Router();

router.post('/upload_image',upload.fields([
    { name: 'frontImage' ,maxCount:1}, 
    { name: 'backImage' ,maxCount:1}]),
    extractImage);

export default router;