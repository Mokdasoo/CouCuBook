import models from '../model/index.js';
import axios from 'axios';

const getOneInfo = async (req, res) => {
    const valueType = req.query.valueType;
    const value = req.query.value;
    try {
        const result = await models.User.findOne({
            where: {
                [valueType]: value
            },
            include: [{
                model: models.Couple,
                required: false
            }]
        });
        
        const returnInfo = {
            "birth": result.birth,
            "id": result.id, 
            "nickname": result.nickname,  
            "social_id": result.social_id,  
            "social_platform": result.social_platform,  
            "user_code": result.user_code,
            "lover_code" : result.couple.lover_code,
            "anniversary": result.couple.anniversary,
            "couple_image": result.couple.couple_image,
            "msg": 'success'
        }
        res.json(returnInfo);
    } catch (error) {
        res.json({
            msg: 'fail'
        })
    }
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
        user_code: generateRandomString(10)
    }
    const registerHandler = async() => {
        try {
            const result = await models.User.create(object);
        } catch (error) {
            console.log(error);
            object.user_code = generateRandomString(10);
            registerHandler();
        }
        try {
            const result = await models.Couple.create({
                user_code: object.user_code,
                anniversary: anniversary
            });
            res.status(200).send('register success');
        } catch (error) {
            console.log(error);
        }
    }
    registerHandler();
    
}

const updateLoverCode = (req, res) => {
    const { user_code, lover_code } = req.body;
    //커플 테이블에 업데이트
    const updateLoverCodeHandler = async () => {
        const response1 = await models.Couple.update({ lover_code: lover_code }, //본인  러버코드 업데이트  response1에는 성공하면 1 들어감
            { where: {user_code: user_code} }
        );
        const response2 = await models.Couple.update({ lover_code: user_code }, // 상대방 러버코드 본인로 업데이트
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
const updateUserInfo = async (req, res) => {
    const {id, nickname, birth} = req.body;
    try {
        const response = await models.User.update({ nickname: nickname, birth: birth},{where: {id: id}});
        console.log(response);
        res.send({msg: 'success'});
    } catch (error) {
        console.log('회원정보업데이트오류에러', error);
        res.send({msg: 'fail'});
    }

}

const deleteUser = async (req, res) => {
    const {id, user_code} = req.body;
    try {
        await models.User.destroy({where: {id: id}});
        await models.Couple.update({lover_code: null}, {where: {lover_code: user_code}});
        res.send({msg: 'success'});
    } catch (error) {
        res.send({msg: 'fail'});
    }
}




const authController = {
    getOneInfo: getOneInfo,
    postRegister: postRegister,
    getUserTokenInfo: getUserTokenInfo,
    updateLoverCode: updateLoverCode,
    updateUserInfo: updateUserInfo,
    deleteUser: deleteUser
}
export default authController;