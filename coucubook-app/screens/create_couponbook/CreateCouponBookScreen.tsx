import { StyleSheet, Text, View, Pressable } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import CouponBooksList from "../../components/CoupleItem/CouponBooksList";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CreateCouponBookStackParamList } from "../../App";

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
    
    return(
        <View style={styles.screen}>
            <View style={styles.createdBooksContainer}>
                <CouponBooksList />
            </View>
        </View>
    )
}

export default CreateCouponBookScreen;

const styles = StyleSheet.create({
    screen : {
        flex: 1,
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
        marginVertical: 16,
        borderTopColor: 'gold',
        borderTopWidth: 5,
        
    },
    
});