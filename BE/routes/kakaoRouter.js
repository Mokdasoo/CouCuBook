const express = require("express");
const kakaoRouter = express.Router();
const kakaoController = require('../controller/kakaoController');

kakaoRouter.post('/login', kakaoController.getLogin);

module.exports = kakaoRouter;