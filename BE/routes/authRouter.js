const express = require("express");
const authRouter = express.Router();
const authController = require('../controller/authController');

authRouter.post('/register', authController.postRegister);

module.exports = authRouter;