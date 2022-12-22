const express = require("express");
const kakaoRouter = express.Router();
const kakaoController = require('../controller/kakaoController');

kakaoRouter.get('/login', kakaoController.alreadyToken);
kakaoRouter.post('/login', kakaoController.getToken);

module.exports = kakaoRouter;