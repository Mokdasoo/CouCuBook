import { ImageBackground, StyleSheet, Dimensions, Modal} from "react-native";
import Carousel from '../components/UI/Carousal';

import { Introduction_pages } from '../data/Introduction';
import KakaoLoginScreen from "./social_login/KakaoLoginScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../App";
import { authState} from '../store/redux/authReducer';
import { RootState } from '../store/redux/rootReducer';
import { useSelector} from 'react-redux';

export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const GreetingLoginScreen = () => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const PAGES = Introduction_pages;
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