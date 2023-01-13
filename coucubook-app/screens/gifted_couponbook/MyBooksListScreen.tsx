import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { couponState, resetCoupon } from "../../store/redux/couponReducer";
import { RootState } from "../../store/redux/rootReducer";
import { fetchGiftedCouponBooks } from "../../util/backendRESTAPI";
import { useCallback, useState } from 'react';
import { CouponBook } from "../../src/types/coupon";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MyBooksStackParamList } from "./MyCouponBooksScreen";

export type MyBooksListScreenProps = NativeStackScreenProps<MyBooksStackParamList, 'MyBooksList'>;

const MyBooksListScreen = () :JSX.Element => {
    const navigation = useNavigation<MyBooksListScreenProps["navigation"]>();
    const coupon:couponState = useSelector((state: RootState) => state.coupon);
    const dispatch = useDispatch();
    const [couponBooks, setCouponBooks] = useState<CouponBook[]>([]);

    useFocusEffect(
        useCallback(()=> {
        const fetchDataHandler = async () => {
            const data = await fetchGiftedCouponBooks(coupon.userInfo.user_code);
            setCouponBooks(data);
        }
        fetchDataHandler();
        dispatch(resetCoupon());

        },[]),
    );
    const clickCouponBookDetail = (couponbook: CouponBook) => {
        navigation.navigate('BookDetail', { couponbook: couponbook});
    }

    return (
        <View style={styles.screen}>
            <View style={styles.myBooksContainer}>
                <Text style={styles.title}>🎁{coupon.loverInfo.nickname}에게 선물받은 쿠폰북 보관함</Text>
                <FlatList 
                    data={couponBooks}
                    keyExtractor={(item) => 'couponbook_'+item.id}
                    renderItem={({item}) => (
                        <Pressable 
                            style={({pressed}) => [styles.container, pressed && styles.pressed]} 
                            onPress={clickCouponBookDetail.bind(this, item)}
                        >
                            <MaterialCommunityIcons name='book' color={item.cover_color} size={80} />
                            <View style={styles.bookInfoContainer}>
                                <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.bookInfo, styles.bookTitle]}>{item.title}</Text>
                                <Text style={styles.bookInfo}>쿠폰 {item.coupons.length}개</Text>
                                <Text style={styles.bookInfo}>사용기한 : {item.publicationDate}~{item.expiredDate}</Text>
                            </View>
                        </Pressable>
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>아직 선물받으신 쿠폰북이 없습니다.</Text>
                        </View>
                    }
                /> 
            </View>
        </View>
    )
}
export default MyBooksListScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#ffe3f4'
    },
    myBooksContainer: {
        flex: 1,
        marginBottom: 16,
    },
    title: {
        fontFamily: 'godoMaum',
        fontSize: 30,
        backgroundColor: 'white',
        textAlign: 'center',
        paddingVertical: 4,
        borderBottomColor: '#ff6161',
        borderBottomWidth: 4,

    },
    pressed: {
        opacity: 0.75
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 2
        
    },
    bookInfoContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    bookInfo: {
        fontFamily: 'godoMaum',
        fontSize: 20,
        color: '#424242'
    },
    bookTitle: {
        fontSize: 30,
        color: 'black'
    },
    emptyContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontFamily: 'godoMaum',
        fontSize: 32,
        color: '#424242'
    }
})