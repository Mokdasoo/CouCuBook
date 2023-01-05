import { ScrollView, StyleSheet, Text } from "react-native";
import CouponBook from "./CouponBook";


const CouponBooksList = () : JSX.Element => {

    return (
        <ScrollView style={styles.screen}>
            <CouponBook />
        </ScrollView>
    );
};

export default CouponBooksList;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 5,
        marginLeft: 10
    },
    title:{
        fontFamily: 'godoMaum',
        fontSize: 20
    }
});