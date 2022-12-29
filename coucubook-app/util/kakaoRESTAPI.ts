import axios from "axios";
import { BACKEND_ADDRESS, KAKAO_REST_API_KEY } from "@env";

export const tokenRenewal = async (refreshToken: string) => {
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
    const newToken = response.data.access_token;
    return newToken;
}

export const viewTokenInfo = async (token: string) => {
    const tokenInfo:{id: number, expires_in: number} = {id: 0, expires_in: 0};
    try {
        const response = await axios.get(
            `${BACKEND_ADDRESS}/auth/user/token`, 
            {
                params: {token: token}
            },
        );//{ id, expires_in}  but token expired -> {error code}
        tokenInfo.id = response.data.id;
        tokenInfo.expires_in = response.data.expires_in;
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