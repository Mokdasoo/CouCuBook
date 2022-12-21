import { ImageBackground, StyleSheet, Dimensions} from "react-native";
import Carousel from '../components/UI/Carousal';

import { Introduction_pages } from '../data/Introduction';

const GreetingLoginScreen = () => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const PAGES = Introduction_pages;
    return(
        <ImageBackground style={styles.backgroundImage} source={require('../assets/Images/sketch.png')}>
            <Carousel
                gap={16}
                offset={0}
                pages={PAGES}
                pageWidth={screenWidth - (16 + 0) * 2}
            />
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