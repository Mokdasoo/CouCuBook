import axios from "axios";
import { BACKEND_ADDRESS} from "@env";

export const getAppleAuthToRefreshToken = async (refreshToken: string) => {
    try {
        const response = await axios({
            method: 'POST',
            url: BACKEND_ADDRESS + '/auth/apple/login/refresh',
            data: {
                refresh_token: refreshToken
            }
        });
        if(response.data.access_token){
            const newTokenInfo = response.data;
            return newTokenInfo;
        }else{
            return 'refresh token expired';
        }
    }catch (error) {
        console.log(error);
        return 'refresh token expired';
    }
}