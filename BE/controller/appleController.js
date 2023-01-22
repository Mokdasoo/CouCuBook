import axios from "axios";
import models from '../model/index.js';

const getLoginView = (req, res) => {
    res.send('로그인 성공!');
}
const getLogin = async (req, res) => {
    console.log(req.body.token);
    const ACCESS_TOKEN = req.body.token;
    let tmp;
    /**사용자 정보 가져오기 */
    try{
        const url = 'https://kapi.kakao.com/v2/user/me';
        const Header = {
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`
            },
        };
        tmp = await axios.get(url, Header); //tmp = {id:kakao id , connected_at: date}
        
    }catch (e) {
        console.log("Axios Error: 사용자 정보 가져오기");
        console.log(e);
        const response = {
            result: 'fail',
            error: '토큰 에러'
        };
        res.send(response);
        return;
    }
    try{
        const {data} = tmp;
        const {id} = data;

        //데이터베이스에서 id와 맞는 유저 정보 불러와서 result에 저장하기
        const result = await models.User.findOne({
            where: {
                social_id: id
            }
        });

        if(result){
            const response = {
                result:'success',
                data: result.dataValues
            };
            res.send(response);
        }else{
            //카카오 간편가입은 돼서 id는 있지만 우리 데이터베이스에 나머지회원가입이 안되었을 때
            const response = {
                result: 'needInfo',
                data: {
                    id: id,
                    name: 'kakao'
                }
            };
            res.send(response);
        }
    } catch (e) {
        console.log(e);
        let msg = "";
        if (typeof e === 'string') {
            msg = e;
        } else if (e instanceof Error) {
            msg = e.message;
        }
        const response = {
            result: 'fail',
            error: msg,
        };
        res.send(response);
    }
}

const logout = (req, res) => {
    res.send('로그아웃 완료!');
}


const appleController = {
    getLoginView: getLoginView,
    getLogin: getLogin,
    logout: logout,
}

export default appleController;