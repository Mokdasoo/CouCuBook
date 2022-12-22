const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const router = require("./routes");
const kakaoRouter = require("./routes/kakaoRouter");
app.use('/', router);
app.use('/kakao', kakaoRouter);



app.listen(port, () => {
    console.log( "Server Port : ", port );
});