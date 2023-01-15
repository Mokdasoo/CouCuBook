import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Modal, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/UI/Button";
import { authState, modalControl } from "../../store/redux/authReducer";
import { RootState } from "../../store/redux/rootReducer";
import KakaoLogoutScreen from "../social_login/KakaoLogoutScreen";
import { MyAppSettingStackParamList } from "./MyAppSettingScreen";

export type MainSettingsScreenProps = NativeStackScreenProps<MyAppSettingStackParamList, 'MySettings'>;

const MainSettingsScreen = ({navigation, route}: MainSettingsScreenProps) : JSX.Element => {
    const auth:authState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(modalControl());
    }
    const toUserScreenHandler = () => {
        navigation.navigate('UserSetting');
    }
    const toCoupleScreenHandler = () => {
        navigation.navigate('CoupleSetting');
    }
    return(
        <View style={styles.screen}>
            <Button bgcolor="#7c197c" fontcolor="white" onPress={logoutHandler}>커쿠북 로그아웃</Button>
            <Modal 
                presentationStyle="formSheet"
                animationType="slide"
                visible={auth.modalIsOpen}
            >
                <KakaoLogoutScreen />
            </Modal>
            <Button bgcolor="#3336ff" fontcolor="white" onPress={toUserScreenHandler}>회원 정보 관리</Button>
            <Button bgcolor="#ff3c66" fontcolor="white" onPress={toCoupleScreenHandler}>커플 정보 관리</Button>

        </View>
    )
};

export default MainSettingsScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})