import axios from "axios";
import models from '../model/index.js';
import qs from 'qs';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const createClientSecretForApple = async () => {
    const claim_header = {
        alg: 'ES256',
        kid: process.env.APPLE_KEYID
    }
    const claim_payload = {
        iss: process.env.APPLE_TEAMID,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000)+15777000,
        aud: "https://appleid.apple.com",
        sub: process.env.APPLE_CLIENT_ID
    }
    const p8Key =  fs.readFileSync(process.env.APPLE_KEYFILE_PATH, "utf8");

    
    function getJwt() {
        return new Promise(async (resolve, reject) => {
            jwt.sign(claim_payload, p8Key, { 
                algorithm: 'ES256', header: claim_header }, (err, token) => {
                    if (err) {
                        console.log(err);
                    } else {
                        resolve(token)
                        return token
                    }
                }
            );
        });
    }
    const token = await getJwt();
    return token;
}
let client_secret;
createClientSecretForApple().then((res) => {
    client_secret = res;
});



const getLoginView = (req, res) => {
    res.send('로그인 성공!');
}
const getLogin = async (req, res) => {
    
    // 토큰으로 유저 고유 정보 소셜에 요청
    const { code } = req.body;
    const requestTokenUrl = "https://appleid.apple.com/auth/token";
    const options = qs.stringify({
        client_secret: client_secret,
        grant_type: "authorization_code",
        client_id: process.env.APPLE_CLIENT_ID,
        redirect_uri: process.env.APPLE_LOGIN_REDIRECT_URI,
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
    
    // apple --- tokenResponse.data => access_token, token_type, expires_in, refresh_token, id_token 있음 추후 처리
    const ACCESS_TOKEN = tokenResponse.data.access_token;
    const REFRESH_TOKEN = tokenResponse.data.refresh_token;
    const id_token = tokenResponse.data.id_token;
    
    // /** 소셜 고유 id 알아내기 애플 - id_token jwt 해석*/
    const base64Payload = id_token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64'); 
    const payloadResult = JSON.parse(payload.toString());
    const social_id = payloadResult.sub;
    
    try{
        //데이터베이스에서 id와 맞는 유저 정보 불러와서 result에 저장하기
        const result = await models.User.findOne({
            where: {
                social_id: social_id
            }
        });

        if(result){
            const response = {
                result:'success',
                name: 'apple',
                userData: result.dataValues,
                access_token: ACCESS_TOKEN,
                refresh_token: REFRESH_TOKEN
            };
            res.send(response);
        }else{
            //카카오 간편가입은 돼서 id는 있지만 우리 데이터베이스에 나머지회원가입이 안되었을 때
            const response = {
                result: 'needInfo',
                id: social_id,
                name: 'apple',
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

const getLoginToRefresh = async (req, res) => {
    const { refresh_token } = req.body;
    const requestTokenUrl = "https://appleid.apple.com/auth/token";
    const options = qs.stringify({
        client_id: process.env.APPLE_CLIENT_ID,
        client_secret: client_secret,
        grant_type: "refresh_token",
        refresh_token: refresh_token
    });
    
    
    /**인가 코드로 소셜 플랫폼에 토큰 요청 */
    try {
        const tokenResponse = await axios({
            method: "POST",
            url: requestTokenUrl,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            data: options,
        });
        const base64Payload = tokenResponse.data.id_token.split('.')[1];
        const payload = Buffer.from(base64Payload, 'base64'); 
        const payloadResult = JSON.parse(payload.toString());
        const social_id = payloadResult.sub;
        res.send({
            access_token: tokenResponse.data.access_token,
            social_id: social_id
        });
    } catch (error) {
        console.log("apple 리프레시 토큰으로 액세스토큰 갱신 에러");
        res.send({msg: 'error'});
    }

}

const onRevoke = async (req, res) => {
    const {refresh_token} = req.body;
    const options = qs.stringify({
        client_id: process.env.APPLE_CLIENT_ID,
        client_secret: client_secret,
        token: refresh_token,
        token_type_hint: "refresh_token",
    });
    try {
        const response = await axios({
            method: "POST",
            url: 'https://appleid.apple.com/auth/revoke',
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            data: options,
        });
        res.send({msg: 'success'});
    } catch (error) {
        res.send({msg: 'fail'});
    }
    

}


const appleController = {
    getLoginView: getLoginView,
    getLogin: getLogin,
    getLoginToRefresh: getLoginToRefresh,
    onRevoke: onRevoke,
}

export default appleController;