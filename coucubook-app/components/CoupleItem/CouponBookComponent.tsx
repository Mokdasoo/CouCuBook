import { View, StyleSheet, Image, Text, Button, Pressable } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { CouponBook } from "../../src/types/coupon";
import { useNavigation } from "@react-navigation/native";
import { CreateBookListScreenProps } from "../../screens/create_couponbook/CreateCouponBookScreen";

interface CouponBookButtonProps {
    icon: any;
    size: number;
    color: string;
    text: string;
    backColor:string;
    onPress: () => void;
};
const CouponBookButton = ({icon, size, color, text,backColor, onPress}: CouponBookButtonProps) : JSX.Element => {
    
    return (
        <Pressable onPress={onPress} style={({pressed}) => [styles.buttonContainerWrap, pressed && styles.pressed, {backgroundColor: backColor}]}>
                <MaterialCommunityIcons name={icon} color={color} size={size} />
                <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    )
}

interface CouponBookProps {
    couponBook: CouponBook;
}

const CouponBookComponent = ({couponBook}:CouponBookProps) : JSX.Element => {
    const navigation = useNavigation<CreateBookListScreenProps["navigation"]>();
    const onGiftHandler = () => {
        //서버 DB에 쿠폰북 정보, 쿠폰정보 받는사람 보낸사람 저장하기
    }
    const onModifyHandler = () => {
        navigation.navigate('CreateBook', {
           couponBook: couponBook
        });
    }

    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name='book' color={couponBook.cover_color} size={80} />
            <View style={styles.bookInfoContainer}>
                <View>
                    <Text style={styles.bookInfo}>{couponBook.title}</Text>
                    <Text style={styles.bookInfo}>쿠폰 {couponBook.coupons.length}개</Text>
                    <Text style={styles.bookInfo}>{couponBook.publicationDate}~{couponBook.expiredDate}</Text>
                </View>
                <View style={styles.buttons}>
                    <CouponBookButton icon='gift' size={15} color='gold' text='선물하기' backColor='#ff000078' onPress={onGiftHandler} />
                    <CouponBookButton icon='lead-pencil' size={15} color='white' text='수정하기' backColor='#0000ff88' onPress={onModifyHandler} />
                </View>
            </View>
        </View>
    );
};

export default CouponBookComponent;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10
    },
    image: {
        width: 80,
        height: 100,
        marginRight: 16
    },
    title:{
        fontFamily: 'godoMaum',
        fontSize: 20
    },
    bookInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bookInfo: {
        fontFamily: 'godoMaum',
        fontSize: 18
    },
    buttons:{
        flexDirection: 'row'
    },
    buttonContainerWrap:{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
        borderRadius: 8,
        padding: 4
    },
    pressed: {
        opacity: 0.5,
    },
    buttonText: {
        fontFamily: 'godoMaum',
        fontSize: 20,
        color: 'white'
    },
});