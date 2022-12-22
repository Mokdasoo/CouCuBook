const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());

app.use(express.urlencoded({extended: true}));

const router = require("./routes");
const kakao = require("./routes/kakao");
app.use('/', router);
app.use('/kakao', kakao);



app.listen(port, () => {
    console.log( "Server Port : ", port );
});