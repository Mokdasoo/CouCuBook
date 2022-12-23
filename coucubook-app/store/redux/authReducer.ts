import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTHENTICATE = 'AUTH/AUTHENTICATE' as const;
const LOGOUT = 'AUTH/LOGOUT' as const;
const MODAL = 'AUTH/MODAL' as const;

export type authState = {
    token: string;
    isAuthenticated: boolean;
    modalIsOpen: boolean;
};
const initState:authState = {token: '', isAuthenticated: false, modalIsOpen: false};

export const authenticate = (token:string, refreshToken: string) => ({
    type: AUTHENTICATE,
    payload: {
        token: token,
        refreshToken: refreshToken
    }
});
export const logout = () => ({
    type: LOGOUT,
    payload: null
});

export const modalControl = () => ({
    type: MODAL,
    payload: null
});

type authAction = ReturnType<typeof authenticate> | ReturnType<typeof logout> | ReturnType<typeof modalControl> ;

const authReducer = (state:authState = initState, action: authAction) => {
    switch (action.type) {
        case AUTHENTICATE:
            AsyncStorage.setItem('token', action.payload.token);
            AsyncStorage.setItem('refreshToken', action.payload.refreshToken);
            return {
                ...state,
                token: action.payload,
                isAuthenticated: !!action.payload
            };
    
        case LOGOUT:
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('refreshToken');
            console.log('로그아웃');
            return {
                token: '',
                isAuthenticated: false
            };
        case MODAL:
            return  {
                ...state,
                modalIsOpen: !state.modalIsOpen
            };
        default:
            return state;
    }
}

export default authReducer;