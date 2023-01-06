import { Image, StyleSheet, Text, View } from "react-native";

interface CouponComponentProps {
    bgcolor: string;
    title: string;
    content: string;
}
const CouponComponent = ({bgcolor, title, content}: CouponComponentProps) :JSX.Element => {
    const containerStyle = [styles.couponContainer, {backgroundColor: bgcolor}];
    return (
        <View style={containerStyle}>
            <View style={styles.imageContainer}>
                <View style={styles.imageBack}>
                    <Image style={styles.image} resizeMode='contain' source={require('../../assets/Images/bookcover.png')}/>
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