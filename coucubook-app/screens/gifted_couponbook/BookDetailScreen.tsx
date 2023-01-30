import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, View, Dimensions, Pressable } from "react-native"
import { MyBooksStackParamList } from "./MyCouponBooksScreen";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { couponState, resetCoupon, saveCoupons } from "../../store/redux/couponReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootReducer";
import CouponComponent from "../../components/CoupleItem/CouponComponent";
import { Coupon } from "../../src/types/coupon";
import {useEffect} from 'react';

export type BookDetailScreenProps = NativeStackScreenProps<MyBooksStackParamList, 'BookDetail'>;
const BookDetailScreen = ({navigation, route}: BookDetailScreenProps) :JSX.Element => {
    const couponbook = route.params.couponbook;
    const coupon:couponState = useSelector((state: RootState) => state.coupon);
    const dispatch = useDispatch();
    useEffect(()=> {
        if(coupon.createdCoupons.length === 0){
            dispatch(saveCoupons(couponbook.coupons));
        }
    },[]);

    const screenWidth = Dimensions.get('window').width;
    const clickCouponHandler = (coupon: Coupon) => {
        navigation.navigate('CouponDetail', {coupon: coupon});
    }
    return (
        <View style={styles.screen}>
            <View style={styles.bookInfoContainer}>
                <View style={styles.bookCoverContainer}>
                    <MaterialCommunityIcons name='book' color={couponbook.cover_color} size={screenWidth/5} />
                </View>
                <View style={styles.textInfoContainer}>
                    <Text style={styles.text}>쿠폰북 제목 : {couponbook.title}</Text>
                    <Text style={styles.text}>보낸 사람 : {coupon.loverInfo.nickname}</Text>
                    <Text style={styles.text}>쿠폰 갯수 : {couponbook.coupons.length}개</Text>
                    <Text style={styles.text}>발행 날짜 : {couponbook.publicationDate}</Text>
                    <Text style={styles.text}>만료 날짜 : {couponbook.expiredDate}</Text>
                </View>
            </View>

            <View style={styles.couponsContainer}>
                <View style={styles.couponsListHeader}>
                    <Text style={styles.text}>쿠폰 목록</Text>
                </View>
                <FlatList 
                    data={coupon.createdCoupons}
                    extraData={coupon.createdCoupons}
                    renderItem={({item}) => (
                        <Pressable 
                            onPress={clickCouponHandler.bind(this, item)} 
                            style={({pressed}) => [pressed && styles.pressedCoupon]}
                            disabled={item.is_used ? true: false}    
                        >
                            <CouponComponent
                                    bgcolor={item.paper_color} 
                                    title={item.title} 
                                    content={item.content} 
                                    selectedImage={item.image}
                                    width={screenWidth/2 - 32}
                                    is_used={item.is_used}
                            />
                        </Pressable>
                    )}
                    keyExtractor={(item) => item.book_id + 'coupon' + item.id}
                    horizontal={false}
                    numColumns={2}
                    
                />
            </View>
        </View>
    )
}
export default BookDetailScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    bookInfoContainer:{
        flexDirection: 'row',
        flex: 1,
    },
    bookCoverContainer:{
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gold',
        borderWidth: 3
    },
    textInfoContainer:{
        flex: 3,
        backgroundColor: 'white',
        margin: 4,
        borderRadius: 16,
        justifyContent: 'center',
        paddingLeft: 16,
        paddingVertical: 8,
        borderColor: 'gold',
        borderWidth: 3,
        
    },
    text:{
        fontFamily: 'godoMaum',
        fontSize: 24
    },
    couponsContainer: {
        flex: 2,
    },
    couponsListHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 16,
        borderWidth: 2,
        borderColor: 'black'
    },
    pressedCoupon: {
        opacity: 0.75
    },
    

});