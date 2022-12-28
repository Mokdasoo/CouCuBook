import models from '../model/index.js';
import axios from 'axios';

const generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const getUserInfo = async (req, res) => {
    const token = req.query.token;
    const url = 'https://kapi.kakao.com/v2/user/me';
        const Header = {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        };
        let tmp;
        try {
            tmp = await axios.get(url, Header); //tmp.data = {id:kakao id , connected_at: date}
            console.log(tmp);
            
        } catch (error) {
            console.log(error);
            
        }
}


const postRegister = (req,res) => {
    const {social_platform, id, nickname, birth, anniversary} = req.body;
    
    const object = {
        social_id: id,
        social_platform: social_platform,
        nickname: nickname,
        birth: birth,
        anniversary: anniversary,
        user_code: generateRandomString(10)
    }
    const registerHandler = async() => {
        try {
            const result = await models.User.create(object);
            res.status(200).send('register success');
        } catch (error) {
            console.log(error);
            object.user_code = generateRandomString(10);
            registerHandler();
        }
    }
    registerHandler();
    
}




const authController = {
    postRegister: postRegister,
    getUserInfo: getUserInfo,
}
export default authController;