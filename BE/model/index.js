import { Sequelize } from "sequelize";
import dbInfo from "../config/config.js";
import User from "./User.js";
import Couple from "./Couple.js";
import CouponBook from "./CouponBook.js";
import Coupon from "./Coupon.js";

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
db.Couple = Couple(sequelize, Sequelize);
db.CouponBook = CouponBook(sequelize, Sequelize);
db.Coupon = Coupon(sequelize, Sequelize);

db.User.hasOne(db.Couple, {foreignKey: 'user_code', sourceKey: 'user_code'});
db.Couple.belongsTo(db.User, {foreignKey: 'user_code', sourceKey: 'user_code'});
db.CouponBook.hasMany(db.Coupon, {foreignKey: 'book_id', sourceKey: 'id'});
db.Coupon.belongsTo(db.CouponBook, {foreignKey: 'book_id', sourceKey: 'id'});

export default db;
