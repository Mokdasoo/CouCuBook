import { StyleSheet, Text, View, Pressable } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import CouponBooksList from "../../components/CoupleItem/CouponBooksList";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { fetchBooks } from "../../util/database";
import { CouponBook } from "../../src/types/coupon";
import { CreateCouponBookStackParamList } from "./CouponBookStack";

export const CreateCouponBookButton = (): JSX.Element => {
    const navigation = useNavigation<CreateBookListScreenProps["navigation"]>();
    const createCouponBookHandler = () => {
        navigation.navigate('CreateBook');
    }
    return (
        <View style={styles.createButtonContainer}>
            <Pressable onPress={createCouponBookHandler} style={({pressed}) => [styles.buttonContainerWrap, pressed && styles.pressed]}>
                <MaterialCommunityIcons name='book-plus-outline' color='#000000' size={24} />
                <Text style={styles.buttonText}>쿠폰북 만들기</Text>
            </Pressable>
        </View>
    );
};
export type CreateBookListScreenProps = NativeStackScreenProps<CreateCouponBookStackParamList, 'BooksList'>;


const CreateCouponBookScreen = () => {

    const [loadedBooks, setLoadedBooks] = useState<CouponBook[]>([]);

    const isFocused = useIsFocused();
    
    useEffect(()=> {
        const loadBooks = async() => {
            const books: CouponBook[] = await fetchBooks();
            setLoadedBooks((prevState) => ([
                ...books
            ]));
        };
        if(isFocused ){
            loadBooks();
            // setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]);
        }
    }, [isFocused]);
    
    return(
        <View style={styles.screen}>
            <View style={styles.createdBooksContainer}>
                <Text style={styles.title}>🛠쿠폰북 제작 보관함</Text>
                <CouponBooksList books={loadedBooks}/>
            </View>
        </View>
    )
}

export default CreateCouponBookScreen;

const styles = StyleSheet.create({
    screen : {
        flex: 1,
        backgroundColor: '#fde2e4'
    },
    createButtonContainer: {
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,

    },
    buttonContainerWrap:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    pressed: {
        opacity: 0.5,
    },
    buttonText: {
        fontFamily: 'godoMaum',
        fontSize: 20
    },
    createdBooksContainer: {
        flex: 1,
        marginBottom: 16,
    },
    title: {
        fontFamily: 'godoMaum',
        fontSize: 30,
        backgroundColor: 'white',
        textAlign: 'center',
        paddingVertical: 4,
        borderBottomColor: 'gold',
        borderBottomWidth: 4,

    }
    
});