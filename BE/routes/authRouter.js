import express from "express";
import authController from '../controller/authController.js';
import kakaoController from '../controller/kakaoController.js';

const authRouter = express.Router(); //  HOST_URL/auth 


authRouter.get('/user', authController.getOneInfo);

authRouter.get('/user/token', authController.getUserTokenInfo);

authRouter.put('/user/lover', authController.updateLoverCode);

authRouter.post('/register', authController.postRegister);

authRouter.post('/kakao/login', kakaoController.getLogin);

export default authRouter;