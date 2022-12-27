import './env/env.js';

import express from 'express';
import cors from 'cors';

import router  from "./routes/index.js";
import authRouter  from './routes/authRouter.js';
import db from './model/index.js';

const sequelize = db.sequelize;
const app = express();
const port = 8000;
sequelize.sync();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/', router);
app.use('/auth', authRouter);


app.listen(port, () => {
    console.log( "Server Port : ", port );
});