import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTHENTICATE = 'AUTH/AUTHENTICATE' as const;
const LOGOUT = 'AUTH/LOGOUT' as const;
const MODAL = 'AUTH/MODAL' as const;

export interface authState  {
    token: {
        token: string;
        refreshToken: string;
        social_id: string;
        platform: string;
    };
    isAuthenticated: boolean;
    modalState: {
        isOpen: boolean;
        platform: string;
    };
};
const initState:authState = {
    token: {
        token: 'dasf',
        refreshToken: '',
        social_id: '',
        platform: ''
    }, 
    isAuthenticated: false, 
    modalState: {
        isOpen: false,
        platform: ''
    },
};

export const authenticate = (token:string, refreshToken: string, social_id: string, platform: string) => ({
    type: AUTHENTICATE,
    payload: {
        token: token,
        refreshToken: refreshToken,
        social_id: social_id,
        platform: platform
    }
});

export const logout = () => ({
    type: LOGOUT,
    payload: null
});

export const modalControl = (platform: string) => ({
    type: MODAL,
    payload: {
        platform: platform
    }
});

type authAction = 
    ReturnType<typeof authenticate> | 
    ReturnType<typeof logout> | 
    ReturnType<typeof modalControl>;

const authReducer = (state:authState = initState, action: authAction) => {
    switch (action.type) {
        case AUTHENTICATE:
            const authenticateHandler = async () => {
                await AsyncStorage.setItem('token', action.payload.token);
                await AsyncStorage.setItem('refreshToken', action.payload.refreshToken);
                await AsyncStorage.setItem('platform', action.payload.platform);
            }
            authenticateHandler();
            console.log('디스패치 합니다~');
            
            return {
                ...state,
                token: {
                    ...action.payload
                },
                isAuthenticated: true,
            };
        case LOGOUT:
            const logoutHandler = async () => {
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('refreshToken');
                await AsyncStorage.removeItem('platform');
            }
            logoutHandler();
            return {
                ...state,
                ...initState
            };
        case MODAL:
            return  {
                ...state,
                modalState: {
                    isOpen : !state.modalState.isOpen,
                    platform: action.payload.platform
                }
            };
        default:
            return state;
    }
}

export default authReducer;