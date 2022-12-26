import express from "express";
const router = express.Router();

export default router;

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

