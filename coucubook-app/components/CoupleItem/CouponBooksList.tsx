import { View, StyleSheet, Text, FlatList } from "react-native";
import CouponBookComponent from "./CouponBookComponent";
import { CouponBook } from "../../src/types/coupon";

interface Props {
    books: CouponBook[]
}

const CouponBooksList = ({books}: Props) : JSX.Element => {

    return (
        <View style={styles.screen}>
            <FlatList 
                data={books}
                keyExtractor={(item) => 'couponbook_'+item.id}
                renderItem={({item}) => (
                    <CouponBookComponent couponBook={item}/>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>아직 제작한 쿠폰북이 없습니다.</Text>
                    </View>
                }
            /> 

        </View>
    );
};

export default CouponBooksList;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 5,
        marginHorizontal: 8
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
});