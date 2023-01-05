import { ScrollView, StyleSheet, Text } from "react-native";
import CouponBookComponent from "./CouponBookComponent";
import { useDispatch, useSelector } from "react-redux";
import { couponState } from "../../store/redux/couponReducer";
import { RootState } from "../../store/redux/rootReducer";


const CouponBooksList = () : JSX.Element => {
    const coupon:couponState = useSelector((state: RootState) => state.coupon);
    const dispatch = useDispatch();

    return (
        <ScrollView style={styles.screen}>

            {coupon.myCouponBooks.map((book) => {
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
        marginLeft: 10
    },
    title:{
        fontFamily: 'godoMaum',
        fontSize: 20
    }
});