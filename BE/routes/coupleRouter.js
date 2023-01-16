import express from "express";
import coupleController from '../controller/coupleController.js';
import multer from 'multer';
import path from 'path';

const coupleRouter = express.Router(); //  HOST_URL/couple 

const upload = multer({
    storage : multer.diskStorage({
        destination(req, file, done){
            done(null, 'public/images/coupleImages/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, req.body.user_code + ext);
        },
    }),
    limits: { fileSize: 5*1024*1024}, //5mb
});

coupleRouter.post('/img', upload.single('image'), coupleController.saveCoupleImg);

coupleRouter.put('/anniversary/update', coupleController.updateAnniversary);
coupleRouter.put('/break', coupleController.breakCouple);

export default coupleRouter;