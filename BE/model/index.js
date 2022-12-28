import { Sequelize } from "sequelize";
import dbInfo from "../config/config.js";
import User from "./User.js";

// const config = dbInfo.development;
const config = dbInfo.production;

const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User(sequelize, Sequelize);


export default db;
