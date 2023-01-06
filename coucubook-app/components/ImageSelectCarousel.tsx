import { Dimensions, Image, StyleSheet } from "react-native";
import Carousel from "./UI/Carousal";
import {Dispatch} from 'react';


interface Props {
    setSelectedImage: any;
}
const ImageSelectCarousel = ({setSelectedImage}: Props) : JSX.Element => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const PAGES = [
        {
            order: 1,
            content: <Image style={styles.image} resizeMode="contain" source={require("../assets/Images/default/coupon_image01.png")}/>,
        },
        {
            order: 2,
            content: <Image style={styles.image} resizeMode="contain" source={require("../assets/Images/default/coupon_image02.png")}/>,
        },
        {
            order: 3,
            content: <Image style={styles.image} resizeMode="contain" source={require("../assets/Images/default/coupon_image03.png")}/>,
        },
        {
            order: 4,
            content: <Image style={styles.image} resizeMode="contain" source={require("../assets/Images/default/coupon_image04.png")}/>,
        },
        {
            order: 5,
            content: <Image style={styles.image} resizeMode="contain" source={require("../assets/Images/default/coupon_image05.png")}/>,
        },
        
        
    ];
    return (
        <Carousel 
            gap={16}
            offset={0}
            pages={PAGES}
            pageWidth={screenWidth - (16 + 0) * 2}
            setSelectedImage={setSelectedImage}
        />
    );
};

export default ImageSelectCarousel;

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
    }
});