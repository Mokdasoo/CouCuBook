import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { Coupon, CouponBook } from "../../src/types/coupon";
import BookDetailScreen from "./BookDetailScreen";
import CouponDetailScreen from "./CouponDetailScreen";
import MyBooksListScreen from "./MyBooksListScreen";

export type MyBooksStackParamList = {
  MyBooksList: undefined;
  BookDetail: {
    couponbook: CouponBook;
  };
  CouponDetail: {
    coupon: Coupon;
  }
};

const Stack = createNativeStackNavigator<MyBooksStackParamList>();
const MyCouponBooksScreen = () : JSX.Element => {
    return(
        <Stack.Navigator screenOptions={{
          headerTitleStyle: {fontFamily: 'godoMaum', fontSize: 25},
          headerTitleAlign: 'center',
          title: 'CouCuBook'
          }}>
            <Stack.Screen name='MyBooksList' component={MyBooksListScreen} />
            <Stack.Screen name='BookDetail' component={BookDetailScreen} />
            <Stack.Screen name='CouponDetail' component={CouponDetailScreen} />
        </Stack.Navigator>
    )
}

export default MyCouponBooksScreen;

