import './env/env.js';

import express from 'express';
import cors from 'cors';

import router  from "./routes/index.js";
import authRouter  from './routes/authRouter.js';
import db from './model/index.js';
import coupleRouter from './routes/coupleRouter.js';

const sequelize = db.sequelize;
const app = express();
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


app.listen(port, () => {
    console.log( "Server Port : ", port );
});