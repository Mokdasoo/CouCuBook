import axios from "axios";
import { BACKEND_ADDRESS } from "@env";

export const getOneInfo = async (valueType:string, value: string | number| null) => {
    let Info;
    try {
        const response = await axios.get(
            `${BACKEND_ADDRESS}/auth/user`, 
            {
                params: {
                    valueType: valueType,
                    value : value
                }
            },
        );
        Info = response.data;
    } catch (error) {
        console.log(error);
    }
    return Info;
}

//커플 테이블 lover_code 업데이트 위해 백엔드에 요청
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
        message = '커플 등록 완료!';
    } catch (error) {
        console.log(error);
        message = '커플 등록 실패!'
    }
    return message;
}