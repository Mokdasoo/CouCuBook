import { ScrollView, StyleSheet, Text } from "react-native";
import CouponBookComponent from "./CouponBookComponent";
import { CouponBook } from "../../src/types/coupon";

interface Props {
    books: CouponBook[]
}

const CouponBooksList = ({books}: Props) : JSX.Element => {

    return (
        <ScrollView style={styles.screen}>

            {books.map((book) => {
                return(
                    <CouponBookComponent key={book.id} couponBook={book}/>
                )
            })}
        </ScrollView>
    );
};

export default CouponBooksList;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 5,
        marginHorizontal: 8
    },
});