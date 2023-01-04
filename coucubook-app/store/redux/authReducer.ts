import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTHENTICATE = 'AUTH/AUTHENTICATE' as const;
const LOGOUT = 'AUTH/LOGOUT' as const;
const MODAL = 'AUTH/MODAL' as const;

export interface authState  {
    token: {
        token: string;
        refreshToken: string;
        social_id: number;
    };
    isAuthenticated: boolean;
    modalIsOpen: boolean;
};
const initState:authState = {
    token: {
        token: '',
        refreshToken: '',
        social_id: 0
    }, 
    isAuthenticated: false, 
    modalIsOpen: false,
};

export const authenticate = (token:string, refreshToken: string, social_id: number) => ({
    type: AUTHENTICATE,
    payload: {
        token: token,
        refreshToken: refreshToken,
        social_id: social_id,
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

type authAction = 
    ReturnType<typeof authenticate> | 
    ReturnType<typeof logout> | 
    ReturnType<typeof modalControl> ;

const authReducer = (state:authState = initState, action: authAction) => {
    switch (action.type) {
        case AUTHENTICATE:
            const authenticateHandler = async () => {
                await AsyncStorage.setItem('token', action.payload.token);
                await AsyncStorage.setItem('refreshToken', action.payload.refreshToken);
            }
            authenticateHandler();
            
            return {
                ...state,
                token: action.payload,
                isAuthenticated: !!action.payload
            };
        case LOGOUT:
            const logoutHandler = async () => {
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('refreshToken');
            }
            logoutHandler();
            console.log('로그아웃');
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                modalIsOpen: false
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