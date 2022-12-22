const express = require("express");
const kakao = express.Router();
const controller = require('../controller/kakaoController');

kakao.post('/login', controller.getToken);

module.exports = kakao;