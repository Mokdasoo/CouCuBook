import express from "express";
import couponController from "../controller/couponController.js";

const couponRouter = express.Router(); //  HOST_URL/coupon

couponRouter.post('/saveAll', couponController.saveCouponBookAndCouponAll);
couponRouter.get('/mybooks', couponController.getGitedMyCouponBooks);
couponRouter.put('/use', couponController.updateCouponUsed);

export default couponRouter;