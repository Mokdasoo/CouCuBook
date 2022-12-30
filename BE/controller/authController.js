import models from '../model/index.js';
import axios from 'axios';

const getUserInfo = async (req, res) => {

    const valueType = req.query.valueType;
    const value = req.query.value;
    const result = await models.User.findOne({
        where: {
            [valueType]: value
        }
    });
    console.log(result.dataValues);
    res.json(result.dataValues);
}

const generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const getUserTokenInfo = async (req, res) => {
    const token = req.query.token;
    const url = 'https://kapi.kakao.com/v1/user/access_token_info';
    const Header = {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    };
    let tmp;
    try {
        tmp = await axios.get(url, Header); //tmp.data = {id:kakao id , connected_at: date}
    } catch (error) {
        console.log('error Hi', error.response.data); //{ msg: 'this access token does not exist', code: -401 }
        tmp = error.response;
    }
    res.json(tmp.data);
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

const updateLoverCode = (req, res) => {
    const { user_code, lover_code } = req.body;

    const updateLoverCodeHandler = async () => {
        const response1 = await models.User.update({ lover_code: lover_code }, //본인  러버코드 업데이트  response1에는 성공하면 1 들어감
            { where: {user_code: user_code} }
        );
        const response2 = await models.User.update({ lover_code: user_code }, // 상대방 러버코드 본인로 업데이트
            { where: {user_code: lover_code} }
        );
    }
    try {
        updateLoverCodeHandler();
        res.send('lover code updated!');
    } catch (error) {
        console.log(error);
        res.send('lover code update failed!')
    }
    
}




const authController = {
    getUserInfo: getUserInfo,
    postRegister: postRegister,
    getUserTokenInfo: getUserTokenInfo,
    updateLoverCode: updateLoverCode,
}
export default authController;