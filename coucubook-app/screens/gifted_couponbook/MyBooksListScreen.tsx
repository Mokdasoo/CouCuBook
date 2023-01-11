import { useFocusEffect } from "@react-navigation/native";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import { useSelector } from "react-redux";
import { couponState } from "../../store/redux/couponReducer";
import { RootState } from "../../store/redux/rootReducer";
import { fetchGiftedCouponBooks } from "../../util/backendRESTAPI";
import { useCallback, useState } from 'react';
import { CouponBook } from "../../src/types/coupon";
import {MaterialCommunityIcons} from '@expo/vector-icons';


const MyBooksListScreen = () :JSX.Element => {
    const coupon:couponState = useSelector((state: RootState) => state.coupon);
    const [couponBooks, setCouponBooks] = useState<CouponBook[]>([]);

    useFocusEffect(
        useCallback(()=> {
        const fetchDataHandler = async () => {
            const data = await fetchGiftedCouponBooks(coupon.userInfo.user_code);
            setCouponBooks(data);
        }
        fetchDataHandler();
        },[]),
    );

    return (
        <View style={styles.screen}>
            <View style={styles.myBooksContainer}>
                <Text style={styles.title}>선물받은 쿠폰북 보관함</Text>
                <FlatList 
                    data={couponBooks}
                    keyExtractor={(item) => 'couponbook_'+item.id}
                    renderItem={({item}) => (
                        <Pressable style={({pressed}) => [styles.container, pressed && styles.pressed]}>
                            <MaterialCommunityIcons name='book' color={item.cover_color} size={80} />
                            <View style={styles.bookInfoContainer}>
                                <Text style={[styles.bookInfo, styles.bookTitle]}>{item.title}</Text>
                                <Text style={styles.bookInfo}>쿠폰 {item.coupons.length}개</Text>
                                <Text style={styles.bookInfo}>{item.publicationDate}~{item.expiredDate}</Text>
                            </View>
                        </Pressable>
                    )}
                /> 
            </View>
        </View>
    )
}
export default MyBooksListScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#e2e2e2'
    },
    myBooksContainer: {
        flex: 1,
        marginVertical: 16,
    },
    title: {
        fontFamily: 'godoMaum',
        fontSize: 30,
        backgroundColor: 'white',
        textAlign: 'center',
        paddingVertical: 4,
        borderBottomColor: '#ff0000',
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
        backgroundColor: 'white',
        borderRadius: 10
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

    }
})