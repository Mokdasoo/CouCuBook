import { Button, View, Modal } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../store/redux/authReducer";
import { authState, modalControl } from "../../store/redux/authReducer";
import { RootState } from '../../store/redux/rootReducer';
import { useSelector} from 'react-redux';
import KakaoLogoutScreen from "../social_login/KakaoLogoutScreen";

const MyAppSettingScreen = () => {
    const auth:authState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(modalControl());
    }
    return(
        <View>
            <Button title='로그아웃' onPress={logoutHandler} />
            <Modal 
                presentationStyle="formSheet"
                animationType="slide"
                visible={auth.modalIsOpen}
            >
                <KakaoLogoutScreen />
            </Modal>
        </View>
    )
}

export default MyAppSettingScreen;