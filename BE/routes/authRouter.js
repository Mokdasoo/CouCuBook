import express from "express";
import appleController from "../controller/appleController.js";
import authController from '../controller/authController.js';
import kakaoController from '../controller/kakaoController.js';

const authRouter = express.Router(); //  HOST_URL/auth 


authRouter.get('/user', authController.getOneInfo);

authRouter.get('/user/token', authController.getUserTokenInfo);

authRouter.put('/user/lover', authController.updateLoverCode);

authRouter.post('/register', authController.postRegister);

authRouter.put('/user/update', authController.updateUserInfo);
authRouter.delete('/user/delete', authController.deleteUser);

authRouter.get('/kakao/login', kakaoController.getLoginView);
authRouter.post('/kakao/login', kakaoController.getLogin);
authRouter.get('/kakao/logout', kakaoController.logout);

authRouter.get('/apple/login', appleController.getLoginView);
authRouter.post('/apple/login', appleController.getLogin);
authRouter.post('/apple/login/refresh', appleController.getLoginToRefresh);
authRouter.post('/apple/revoke', appleController.onRevoke);


export default authRouter;