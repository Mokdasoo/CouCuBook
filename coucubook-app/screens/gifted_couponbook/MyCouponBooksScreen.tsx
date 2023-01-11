import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import BookDetailScreen from "./BookDetailScreen";
import CouponDetailScreen from "./CouponDetailScreen";
import MyBooksListScreen from "./MyBooksListScreen";

const Stack = createNativeStackNavigator();
const MyCouponBooksScreen = () : JSX.Element => {
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name='MyBooksList' component={MyBooksListScreen} />
            <Stack.Screen name='BookDetail' component={BookDetailScreen} />
            <Stack.Screen name='CouponDetail' component={CouponDetailScreen} />
          </Stack.Navigator>
    )
}

export default MyCouponBooksScreen;

