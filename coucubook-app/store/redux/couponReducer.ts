import { Coupon, CouponBook } from "../../src/types/coupon";
import { userInfo } from "../../src/types/vari";

const SAVECOUPON = 'COUPON/SAVECOUPON' as const;
const SAVECOUPONS = 'COUPON/SAVECOUPONS' as const;
const RESETCOUPON = 'COUPON/RESETCOUPON' as const;
const DELETECOUPON = 'COUPON/DELETECOUPON' as const;
const SAVECOUPONBOOK = 'COUPON/SAVECOUPONBOOK' as const;
const SAVEUSERINFO = 'COUPON/SAVEUSERINFO' as const;
const SAVELOVERINFO = 'COUPON/SAVELOVERINFO' as const;
const CHANGELOVERCODE = 'COUPON/CHANGELOVERCODE' as const;


export interface couponState  {
    myCouponBooks: CouponBook[];
    createdCoupons: Coupon[];
    userInfo: userInfo;
    loverInfo: userInfo;
};
const userInfoInitState = {
    "birth": '',
    "id": 0, 
    "nickname": '',  
    "social_id": '',  
    "social_platform": '',  
    "user_code": '',
    "lover_code" : null,
    "anniversary": '',
    "couple_image": null,
    "msg": '',
};
const initState:couponState = {
    myCouponBooks: [],
    createdCoupons: [],
    userInfo: userInfoInitState,
    loverInfo: userInfoInitState
};

export const saveCoupon = (coupon: Coupon) => ({
    type: SAVECOUPON,
    payload: {
        coupon: coupon,
    }
});

export const saveCoupons = (coupons: Coupon[]) => ({
    type: SAVECOUPONS,
    payload: {
        coupons: coupons,
    }
})

export const resetCoupon = () => ({
    type: RESETCOUPON,
});
export const deleteCoupon = (id: number | string) => ({
    type: DELETECOUPON,
    payload: {
        id: id,
    }
});

export const saveCouponBook = (couponBook: CouponBook) => ({
    type: SAVECOUPONBOOK,
    payload: {
        couponBook: couponBook,
    }
});
export const saveUserInfo = (userInfo: userInfo) => ({
    type: SAVEUSERINFO,
    payload: {
        userInfo: userInfo,
    }
});
export const saveLoverInfo = (loverInfo: userInfo) => ({
    type: SAVELOVERINFO,
    payload: {
        loverInfo: loverInfo,
    }
});
export const changeLoverCode = (loverCode: string) => ({
    type: CHANGELOVERCODE,
    payload: {
        loverCode: loverCode
    }
})

type couponAction = 
    ReturnType<typeof saveCoupon> | 
    ReturnType<typeof saveCoupons> | 
    ReturnType<typeof resetCoupon> |
    ReturnType<typeof deleteCoupon> |
    ReturnType<typeof saveCouponBook> |
    ReturnType<typeof saveUserInfo> |
    ReturnType<typeof saveLoverInfo>|
    ReturnType<typeof changeLoverCode>;

const couponReducer = (state:couponState = initState, action: couponAction) => {
    switch (action.type) {
        case SAVECOUPON:
            //sqlite 저장함수
            
            const newArray = [...state.createdCoupons];

            
            newArray.push(action.payload.coupon);
            
            return {
                ...state,
                createdCoupons: newArray
            };
        case SAVECOUPONS:
            return {
                ...state,
                createdCoupons: action.payload.coupons
            }
        case RESETCOUPON:
            return {
                ...state,
                createdCoupons: []
            }
        case DELETECOUPON:

            const deletedNewArray = state.createdCoupons.filter((coupon) => coupon.id !== action.payload.id);

            return {
                ...state,
                createdCoupons: deletedNewArray
            }
        case SAVECOUPONBOOK:
            //sqlite 저장함수
            const bookArray = [...state.myCouponBooks];
            const isExistIndex = bookArray.findIndex(book => book.id === action.payload.couponBook.id);
            if(isExistIndex === -1){
                bookArray.push(action.payload.couponBook);
            }else{
                bookArray[isExistIndex] = action.payload.couponBook;
            }
            
            return {
                ...state,
                myCouponBooks: bookArray,
                createdCoupons: []
            };
        case SAVEUSERINFO:
            return {
                ...state,
                userInfo: action.payload.userInfo
            }
        case SAVELOVERINFO:
            return {
                ...state,
                loverInfo: action.payload.loverInfo
            }
        case CHANGELOVERCODE:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    lover_code: action.payload.loverCode
                }
            }
            
        default:
            return state;
    }
}

export default couponReducer;