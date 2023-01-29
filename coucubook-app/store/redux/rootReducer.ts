import {combineReducers, createStore} from 'redux';
import authReducer from './authReducer';
import couponReducer from './couponReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    coupon: couponReducer,
});

const store = createStore(rootReducer);
export default store;

export type RootState = ReturnType<typeof rootReducer>;