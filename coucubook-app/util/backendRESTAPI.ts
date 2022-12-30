import axios from "axios";
import { BACKEND_ADDRESS } from "@env";

export const getUserInfo = async (valueType:string, value: string | number) => {
    let userInfo;
    try {
        const response = await axios.get(
            `${BACKEND_ADDRESS}/auth/user/`, 
            {
                params: {
                    valueType: valueType,
                    value : value
                }
            },
        );
        userInfo = response.data;
        console.log("get user info ::: ",response.data);
    } catch (error) {
        console.log(error);
    }
    return userInfo;
}

export const saveLoverCode = async (userCode: string, loverCode: string) => {
    console.log("usercode lovercode :::::",userCode, loverCode)
    let message;
    try {
        const response = await axios({
            url: `${BACKEND_ADDRESS}/auth/user/lover`, 
            method: 'PUT',
            data : {
                user_code : userCode,
                lover_code : loverCode
            }
        });
        console.log(response);
        message = 'success';
    } catch (error) {
        console.log(error);
        message = 'fail'
    }
    return message;
}