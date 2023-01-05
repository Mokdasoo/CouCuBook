import { Coupon, CouponBook } from "../../src/types/coupon";

const SAVECOUPON = 'COUPON/SAVECOUPON' as const;
const SAVECOUPONBOOK = 'COUPON/SAVECOUPONBOOK' as const;

export interface couponState  {
    myCouponBooks: CouponBook[];
    createdCoupons: Coupon[];
};
const initState:couponState = {
    myCouponBooks: [],
    createdCoupons: []
};

export const saveCoupon = (coupon: Coupon) => ({
    type: SAVECOUPON,
    payload: {
        coupon: coupon,
    }
});

export const saveCouponBook = (couponBook: CouponBook) => ({
    type: SAVECOUPONBOOK,
    payload: {
        couponBook: couponBook,
    }
});

type couponAction = 
    ReturnType<typeof saveCoupon> | 
    ReturnType<typeof saveCouponBook>;

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
        case SAVECOUPONBOOK:
            //sqlite 저장함수
            const bookArray = [...state.myCouponBooks];
            bookArray.push(action.payload.couponBook);
            
            return {
                ...state,
                myCouponBooks: bookArray
            };
            
        default:
            return state;
    }
}

export default couponReducer;