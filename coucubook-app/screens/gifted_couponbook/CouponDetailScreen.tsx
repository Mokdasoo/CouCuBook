import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, Dimensions, StyleSheet, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import CouponComponent from "../../components/CoupleItem/CouponComponent";
import Button from "../../components/UI/Button";
import { couponState, saveCoupons } from "../../store/redux/couponReducer";
import { RootState } from "../../store/redux/rootReducer";
import { useCoupon } from "../../util/backendRESTAPI";
import { MyBooksStackParamList } from "./MyCouponBooksScreen";

export type CouponDetailScreenProps = NativeStackScreenProps<MyBooksStackParamList, 'CouponDetail'>;
const CouponDetailScreen = ({navigation, route}: CouponDetailScreenProps) :JSX.Element => {
    const coupon:couponState = useSelector((state: RootState) => state.coupon);
    const dispatch = useDispatch();
    const coupondata = route.params.coupon;
    const screenWidth = Dimensions.get('window').width;
    const useCouponHandler= async () => {
        Alert.alert(
            '쿠폰 사용',
            '정말로 사용하시겠습니까? 연인분과 상의후 사용해주세요',
            [
              {text: '취소', onPress: () => {}, style: 'cancel'},
              {
                text: '사용',
                onPress: async() => {
                    const result = await useCoupon(coupondata);
                    if(result){
                        Alert.alert('쿠폰사용완료!', `사용완료`);
                        dispatch(saveCoupons(result));
                        navigation.goBack();
                    }else{
                        Alert.alert('쿠폰사용실패!', `잠시후에 다시 시도해 주세요!`);
                    }
                },
                style: 'default',
              },
            ],
            {
              cancelable: true,
              onDismiss: () => {},
            },
        );
    }

    return (
        <View style={styles.screen}>
            <CouponComponent 
                bgcolor={coupondata.paper_color} 
                title={coupondata.title} 
                content={coupondata.content} 
                selectedImage={coupondata.image}
                width={screenWidth- 64}
            />
            <Button bgcolor="#7ae582" fontcolor="white" onPress={useCouponHandler}>쿠폰 사용하기</Button>
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