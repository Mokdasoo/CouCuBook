const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const router = require("./routes");
const kakaoRouter = require("./routes/kakaoRouter");
const authRouter = require('./routes/authRouter');
app.use('/', router);
app.use('/kakao', kakaoRouter);
app.use('/auth', authRouter);


app.listen(port, () => {
    console.log( "Server Port : ", port );
});