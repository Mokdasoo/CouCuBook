import { ImageBackground, StyleSheet, Dimensions, Modal} from "react-native";
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
            content: <IntroContent text={"첫번째 페이지"} src={require("../assets/Images/introexample.jpeg")}/>,
          },
          {
            order: 2,
            content: <IntroContent text={"두번째 페이지"} src={require("../assets/Images/introexample.jpeg")} />,
          },
          {
            order: 3,
            content: <IntroContent text={"세번째 페이지"} src={require("../assets/Images/introexample.jpeg")} />,
          },
          {
            order: 4,
            content: <LoginContent />,
          },
    ];
    const auth:authState = useSelector((state: RootState) => state.auth);
    
    return(
        <ImageBackground style={styles.backgroundImage} source={require('../assets/Images/sketch.png')}>
            <Carousel
                gap={16}
                offset={0}
                pages={PAGES}
                pageWidth={screenWidth - (16 + 0) * 2}
            />
            <Modal 
                presentationStyle="formSheet"
                animationType="slide"
                visible={auth.modalIsOpen}
            >
                <KakaoLoginScreen />
            </Modal>
        </ImageBackground>
    )
}

export default GreetingLoginScreen;

const styles = StyleSheet.create({
    
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
});