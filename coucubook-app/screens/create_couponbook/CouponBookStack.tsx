import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CouponBook } from "../../src/types/coupon";
import CreateBook from "./CreateBook";
import CreateCouponBookScreen, { CreateCouponBookButton } from "./CreateCouponBookScreen";


export type CreateCouponBookStackParamList = {
    BooksList: undefined;
    CreateBook: {
      couponBook: CouponBook;
    } | undefined;
  };
  const CreateCouponBookStack = createNativeStackNavigator<CreateCouponBookStackParamList>();
  
  const CouponBookStack = (): JSX.Element => {
    
    return (
      <CreateCouponBookStack.Navigator screenOptions={{
        headerTitleStyle: {fontFamily: 'godoMaum', fontSize: 25},
        headerTitleAlign: 'center',
        headerTitle: 'CouCuBook',
      }}>
        <CreateCouponBookStack.Screen 
          name='BooksList'
          component={CreateCouponBookScreen}
          options={{
            headerRight: () => (
              <CreateCouponBookButton />
            ),
          }}
        />
        <CreateCouponBookStack.Screen 
          name='CreateBook'
          component={CreateBook}
          
        />
      </CreateCouponBookStack.Navigator>
    );
  };

  export default CouponBookStack;