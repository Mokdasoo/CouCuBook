import { ImageBackground, StyleSheet, Dimensions, Modal, View, Text} from "react-native";
import Carousel from '../components/UI/Carousal';
import LoginContent from "../components/IntroAndLogin/LoginContent";
import IntroContent from "../components/IntroAndLogin/IntroContent";

import KakaoLoginScreen from "./social_login/KakaoLoginScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../App";
import { authState} from '../store/redux/authReducer';
import { RootState } from '../store/redux/rootReducer';
import { useSelector} from 'react-redux';

export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

function GreetingLoginScreen():JSX.Element {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const PAGES = [
        {
            order: 1,
            content: <IntroContent text={"특별한 기념일...\n연인들을 위한 쿠폰북 만들기/선물하기"} src={require("../assets/Images/greetingImg1.png")}/>,
          },
          {
            order: 2,
            content: <IntroContent text={"어떠한 내용이든 좋아요\n연인을 위해 해주고 싶은 모든 쿠폰을 만들어 보세요"} src={require("../assets/Images/greetingImg2.png")} />,
          },
          {
            order: 3,
            content: <IntroContent text={"먼저 회원가입과 커플등록을 해주세요"} src={require("../assets/Images/greetingImg3.png")} />,
          },
          {
            order: 4,
            content: <LoginContent />,
          },
    ];
    const auth:authState = useSelector((state: RootState) => state.auth);
    
    return(
        <View style={styles.background}>
            <View>
                <Text style={styles.title}>CouCuBook</Text>
            </View>
            <View style={styles.carouselContainer}>
                <Carousel
                    gap={16}
                    offset={0}
                    pages={PAGES}
                    pageWidth={screenWidth - (16 + 0) * 2}
                />
            </View>
            <Modal 
                presentationStyle="formSheet"
                animationType="slide"
                visible={auth.modalIsOpen}
            >
                <KakaoLoginScreen />
            </Modal>
        </View>
    )
}

export default GreetingLoginScreen;

const styles = StyleSheet.create({
    
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselContainer:{
        height: '60%'
    },
    title: {
        fontSize: 50,
        fontFamily: 'godoMaum'
    }
});