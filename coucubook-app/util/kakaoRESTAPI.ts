import axios from "axios";
import { BACKEND_ADDRESS, KAKAO_REST_API_KEY } from "@env";

export const tokenRenewal = async (refreshToken: string) => {
    try {
        const response = await axios({
            method: 'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            data: {
                grant_type: 'refresh_token',
                client_id: KAKAO_REST_API_KEY,
                refresh_token: refreshToken
            }
        });
        console.log(response.data);
        const newToken = response.data.access_token;
        return newToken;
    }catch (error) {
        console.log(error);
        return 'refresh token expired';
    }
}

export const viewTokenInfo = async (token: string) => {
    const tokenInfo:{id: string, expires_in: number} = {id: '', expires_in: 0};
    try {
        const response = await axios.get(
            `${BACKEND_ADDRESS}/auth/user/token`, 
            {
                params: {token: token}
            },
        );//{ id, expires_in}  but token expired -> {msg, code}
        if(response.data.id){
            tokenInfo.id = response.data.id;
            tokenInfo.expires_in = response.data.expires_in;
        }
    } catch (error) {
        console.log(error);
    }
    return tokenInfo;
}

export const getUserInfo = async (social_id: string) => {
    let userInfo;
    try {
        const response = await axios.get(
            `${BACKEND_ADDRESS}/auth/user/`, 
            {
                params: {social_id: social_id}
            },
        );
        userInfo = response.data;
        console.log(response);
    } catch (error) {
        console.log(error);
    }
    return userInfo;
}