import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, StyleSheet, View } from "react-native"
import CouponComponent from "../../components/CoupleItem/CouponComponent";
import { MyBooksStackParamList } from "./MyCouponBooksScreen";

export type CouponDetailScreenProps = NativeStackScreenProps<MyBooksStackParamList, 'CouponDetail'>;
const CouponDetailScreen = ({navigation, route}: CouponDetailScreenProps) :JSX.Element => {
    const coupon = route.params.coupon;
    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={styles.screen}>
            <CouponComponent 
                bgcolor={coupon.paper_color} 
                title={coupon.title} 
                content={coupon.content} 
                selectedImage={coupon.image}
                width={screenWidth- 64}
            />

        </View>
    )
}
export default CouponDetailScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'

    }
});