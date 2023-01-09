import { Coupon, CouponBook } from "../../src/types/coupon";

const SAVECOUPON = 'COUPON/SAVECOUPON' as const;
const RESETCOUPON = 'COUPON/RESETCOUPON' as const;
const DELETECOUPON = 'COUPON/DELETECOUPON' as const;
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

type couponAction = 
    ReturnType<typeof saveCoupon> | 
    ReturnType<typeof resetCoupon> |
    ReturnType<typeof deleteCoupon> |
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
            
        default:
            return state;
    }
}

export default couponReducer;