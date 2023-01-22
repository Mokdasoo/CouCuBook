import './env/env.js';

import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from "fs";

import router  from "./routes/index.js";
import authRouter  from './routes/authRouter.js';
import db from './model/index.js';
import coupleRouter from './routes/coupleRouter.js';
import couponRouter from './routes/couponRouter.js';

const sequelize = db.sequelize;
const app = express();

const privateKey = fs.readFileSync("/etc/letsencrypt/live/coucubook.online/privkey.pem", "utf8");
const certificate = fs.readFileSync("/etc/letsencrypt/live/coucubook.online/cert.pem", "utf8")
const ca = fs.readFileSync("/etc/letsencrypt/live/coucubook.online/chain.pem", "utf8")

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};
const httpsServer = https.createServer(credentials, app);


const port = 8000;
sequelize.sync({ force: false})
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/', router);
app.use('/auth', authRouter);
app.use('/couple', coupleRouter);
app.use('/coupon', couponRouter);


httpsServer.listen(port, () => {
    console.log( "Https Server Port : ", port );
});