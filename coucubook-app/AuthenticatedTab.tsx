import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from 'react';
import { userInfo } from "./src/types/vari";
import { authState } from "./store/redux/authReducer";
import { couponState, saveLoverInfo, saveUserInfo } from "./store/redux/couponReducer";
import { RootState } from "./store/redux/rootReducer";
import { getOneInfo } from "./util/backendRESTAPI";
import MainCoupleScreen from "./screens/main/MainCoupleScreen";
import {Ionicons} from '@expo/vector-icons';
import MyCouponBooksScreen from "./screens/gifted_couponbook/MyCouponBooksScreen";
import MyAppSettingScreen from "./screens/setting/MyAppSettingScreen";
import CouponBookStack from "./screens/create_couponbook/CouponBookStack";



const Tab = createBottomTabNavigator();
//로그인상태 AuthenticatedTab 메인스크린
const AuthenticatedTab = ():JSX.Element => {

  const auth:authState = useSelector((state: RootState) => state.auth);
  const coupon:couponState = useSelector((state: RootState) => state.coupon);
  const dispatch = useDispatch();
  const userInfoInitState = {
      "birth": '',
      "id": 0, 
      "nickname": '',  
      "social_id": '',  
      "social_platform": '',  
      "user_code": '',
      "lover_code" : null,
      "anniversary": '',
      "couple_image": null,
      "msg": '',
  };

    
    let responseUser: userInfo = userInfoInitState;
    let responseLover: userInfo = userInfoInitState;
    

    useEffect(()=>{
        const updateUserInfo = async () => {
            responseUser = await getOneInfo('social_id', auth.token.social_id);// 조인하는 함수로 변경
            dispatch(saveUserInfo(responseUser));
        }
        updateUserInfo();
    }, []);
    
    useEffect(() => {
        const updateLoverInfo = async () => {
            responseLover = await getOneInfo('user_code', coupon.userInfo.lover_code);// 조인하는 함수로 변경
            dispatch(saveLoverInfo(responseLover));
        }
        if(!!coupon.userInfo.lover_code){
            updateLoverInfo();
        }
    }, [coupon.userInfo]);
    
  
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen
         name='Main' 
         component={MainCoupleScreen}
         options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name='easel-outline' color={color} size={size} />
          ),
          tabBarLabel:'메인',
          tabBarLabelStyle: {fontFamily: 'godoMaum'},
          tabBarActiveTintColor: '#718355',
          headerShown: true,
          headerTitleStyle: {fontFamily: 'godoMaum', fontSize: 25},
          headerTitleAlign: 'center',
          title: 'CouCuBook'
        }}
      />
      <Tab.Screen name='Mybook' component={MyCouponBooksScreen} options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name='gift-outline' color={color} size={size} />
          ),
          tabBarLabel:'선물받은 쿠폰북함',
          tabBarLabelStyle: {fontFamily: 'godoMaum'},
          tabBarActiveTintColor: '#718355',
        }}
      />
      <Tab.Screen name='Create' 
        component={CouponBookStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name='duplicate-outline' color={color} size={size} />
          ),
          headerShown: false,
          tabBarLabel:'쿠폰북 만들기/선물하기',
          tabBarLabelStyle: {fontFamily: 'godoMaum'},
          tabBarActiveTintColor: '#718355',
        }}
      />
      <Tab.Screen name='Setting' component={MyAppSettingScreen} options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name='flower-outline' color={color} size={size} />
          ),
          tabBarLabel:'옵션들',
          tabBarLabelStyle: {fontFamily: 'godoMaum'},
          tabBarActiveTintColor: '#718355',
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthenticatedTab;