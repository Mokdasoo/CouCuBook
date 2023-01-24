import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Modal, StyleSheet, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/UI/Button";
import { authState, logout, modalControl } from "../../store/redux/authReducer";
import { RootState } from "../../store/redux/rootReducer";
import KakaoLogoutScreen from "../social_login/KakaoLogoutScreen";
import { MyAppSettingStackParamList } from "./MyAppSettingScreen";

export type MainSettingsScreenProps = NativeStackScreenProps<MyAppSettingStackParamList, 'MySettings'>;

const MainSettingsScreen = ({navigation, route}: MainSettingsScreenProps) : JSX.Element => {
    const auth:authState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const logoutHandler = (platform: string) => {
        if(platform === 'kakao'){
            dispatch(modalControl(platform));
        }else{
            dispatch(logout());
        }
    }
    const toUserScreenHandler = () => {
        navigation.navigate('UserSetting');
    }
    const toCoupleScreenHandler = () => {
        navigation.navigate('CoupleSetting');
    }
    return(
        <View style={styles.screen}>
            <Image style={styles.img} source={require('../../assets/icon.png')} />
            <Button bgcolor="#e4c1f9" fontcolor="#3f3f3f" onPress={logoutHandler.bind(this, auth.token.platform)}>커쿠북 로그아웃</Button>
            <Modal 
                presentationStyle="formSheet"
                animationType="slide"
                visible={auth.modalState.isOpen}
            >
                { auth.modalState.platform === 'kakao' && <KakaoLogoutScreen />}
                
            </Modal>
            <Button bgcolor="#a9def9" fontcolor="#3f3f3f" onPress={toUserScreenHandler}>회원 정보 관리</Button>
            <Button bgcolor="#ff99c8" fontcolor="#3f3f3f" onPress={toCoupleScreenHandler}>커플 정보 관리</Button>

        </View>
    )
};

export default MainSettingsScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d0f4de'
    },
    img: {
        width: 100,
        height: 100
    }
})