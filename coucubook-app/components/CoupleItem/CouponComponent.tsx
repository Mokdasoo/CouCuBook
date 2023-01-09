import { Image, StyleSheet, Text, View } from "react-native";

interface CouponComponentProps {
    bgcolor: string;
    title: string;
    content: string;
    selectedImage: number;
}
const CouponComponent = ({bgcolor, title, content, selectedImage}: CouponComponentProps) :JSX.Element => {
    const containerStyle = [styles.couponContainer, {backgroundColor: bgcolor}];
    const coupon_image01 = require('../../assets/Images/default/coupon_image01.png');
    const coupon_image02 = require('../../assets/Images/default/coupon_image02.png');
    const coupon_image03 = require('../../assets/Images/default/coupon_image03.png');
    const coupon_image04 = require('../../assets/Images/default/coupon_image04.png');
    const coupon_image05 = require('../../assets/Images/default/coupon_image05.png');
    let selectImg;
    switch (selectedImage) {
        case 0:
            selectImg = coupon_image01;
            break; 
        case 1:
            selectImg = coupon_image02;
            break; 
        case 2:
            selectImg = coupon_image03;
            break; 
        case 3:
            selectImg = coupon_image04;
            break; 
        case 4:
            selectImg = coupon_image05;
            break; 
        default:
            selectImg = coupon_image01;
            break;
    }

    return (
        <View style={containerStyle}>
            <View style={styles.imageContainer}>
                <View style={styles.imageBack}>
                    <Image style={styles.image} resizeMode='contain' source={selectImg}/>
                </View>
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
            </View>
            <View style={styles.barcode}>
                <Image style={styles.barcodeImg} source={require('../../assets/Images/barcode.png')} />
            </View>
        </View>
    );
};

export default CouponComponent;

const styles = StyleSheet.create({
    couponContainer:{
        marginTop: 16,
        marginHorizontal: 16,
        width: 250,
        height: 400,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black'
    },
    imageContainer:{
        flex: 3,
    },
    imageBack:{
        flex: 1,
        marginVertical: 16,
        marginHorizontal: 24,
        backgroundColor: 'white',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',

    },
    info:{
        flex:2,
        alignItems: 'center'
    },
    title:{
        fontFamily: 'godoMaum',
        fontSize: 32,
    },
    content:{
        fontFamily: 'godoMaum',
        fontSize: 24,
    },
    barcode:{
        flex:1,
        paddingHorizontal: 16,
        paddingBottom: 20
    },
    barcodeImg: {
        width: '100%',
        height: '100%'
    }
});