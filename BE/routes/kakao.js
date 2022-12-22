const express = require("express");
const kakao = express.Router();

kakao.post('/login', function (req, res) {
    res.json({ 'aa' : 'bb'});
})

module.exports = kakao;