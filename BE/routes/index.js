const express = require("express");
const router = express.Router();

router.get('/', function (req, res) {
    res.send('서버 열림');
})

router.get('/:id', function (req, res) {
    const { id } = req.params;
    console.log(id);
    const q = req.query;
    console.log(q);
    res.json({userId: id});
})

module.exports = router;