import axios from "axios";
import models from '../model/index.js';
import qs from 'qs';

const getLoginView = (req, res) => {
    res.send('로그인 성공!');
}
const getLogin = async (req, res) => {
    
    const { code } = req.body;
    const requestTokenUrl = "https://kauth.kakao.com/oauth/token";
    const options = qs.stringify({
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        code: code,
    });


    /**인가 코드로 소셜 플랫폼에 토큰 요청 */
    const tokenResponse = await axios({
        method: "POST",
        url: requestTokenUrl,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        data: options,
    });
    // kakao --- tokenResponse.data => access_token, expires_in, refresh_token, refresh_token_expires_in 있음 추후 처리
    const ACCESS_TOKEN = tokenResponse.data.access_token;
    const REFRESH_TOKEN = tokenResponse.data.refresh_token;

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
        const {id} = tmp.data;
        //데이터베이스에서 id와 맞는 유저 정보 불러와서 result에 저장하기
        const result = await models.User.findOne({
            where: {
                social_id: id
            }
        });

        if(result){
            const response = {
                result:'success',
                name: 'kakao',
                userData: result.dataValues,
                access_token: ACCESS_TOKEN,
                refresh_token: REFRESH_TOKEN
            };
            res.send(response);
        }else{
            //카카오 간편가입은 돼서 id는 있지만 우리 데이터베이스에 나머지회원가입이 안되었을 때
            const response = {
                result: 'needInfo',
                id: id,
                name: 'kakao',
                access_token: ACCESS_TOKEN,
                refresh_token: REFRESH_TOKEN
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


const kakaoController = {
    getLoginView: getLoginView,
    getLogin: getLogin,
    logout: logout,
}

export default kakaoController;