import { DB_HOST, DB_USER, DB_PASS } from '../env/db.js';

const config = {
    "development" :{
        "host": "localhost",
        "database": "coucubook",
        "username": "user",
        "password": "1234",
        "dialect": "mysql"
    },

    "production" :{
        "host": DB_HOST,
        "database": "coucubook",
        "username": DB_USER,
        "password": DB_PASS,
        "dialect": "mysql"
    },
    "test" : {

    }
}
export default config;