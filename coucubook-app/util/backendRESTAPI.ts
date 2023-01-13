import axios from "axios";
import { BACKEND_ADDRESS } from "@env";
import FormData from "form-data";
import { Coupon, CouponBook } from "../src/types/coupon";

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

export const imageUpload = async (imgUri: string, user_code: string, lover_code: string) => {
    const localUri = imgUri;
    const filename = localUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename ?? '');
    const type = match ? `image/${match[1]}` : 'image';
    const formData = new FormData();
    formData.append('user_code', user_code);
    formData.append('lover_code', lover_code);
    formData.append('image', {
        uri: localUri,
        name: filename,
        type,
    });
    
    try {
        await axios({
            method: 'post',
            url: `${BACKEND_ADDRESS}/couple/img`,
            headers: {
                'content-type': 'multipart/form-data',
            },
            data: formData
        });
    } catch (error) {
        console.log(error);
    }
}

export const giftCouponBookToLover = async (couponBook: CouponBook, user_code: string, lover_code:string | null) => {
    if(lover_code === null){
        return false;
    }
    try {
        const response = await axios({
            url: `${BACKEND_ADDRESS}/coupon/saveAll`, 
            method: 'POST',
            data : {
                couponBook : couponBook,
                user_code: user_code,
                lover_code : lover_code
            }
        });
        if(response.data.msg === 'success'){
            console.log("쿠폰북&쿠폰 생성 ",response.data.msg);
            return true;
        }else{
            console.log("쿠폰북선물하기 백엔드 통신에러 ");
            return false;
        }
    } catch (error) {
        console.log("쿠폰북선물하기 백엔드 통신에러 ",error);
        return false;
    }
}
export const fetchGiftedCouponBooks = async (user_code: string) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${BACKEND_ADDRESS}/coupon/mybooks`,
            params: {
                user_code: user_code
            }
        });
        return (response.data);
    } catch (error) {
        console.log("선물받은 쿠폰북 갱신로직 에러",error);
    }
}

export const useCoupon = async (coupon: Coupon) => {
    try {
        const response = await axios({
            method: 'PUT',
            url: `${BACKEND_ADDRESS}/coupon/use`,
            data: {
                coupon: coupon
            }
        });

        if( response.data.msg === 'success'){
            return response.data.couponArray;
        }else{
            return null;
        }
    } catch (error) {
        return false;
    }
}