import {combineReducers} from 'redux';
import authReducer from './authReducer';
import couponReducer from './couponReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    coupon: couponReducer,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;