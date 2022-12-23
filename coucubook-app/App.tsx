import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import GreetingLoginScreen from './screens/GreetingLoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import rootReducer from './store/redux/rootReducer';
import {createStore} from 'redux';
import { authState, authenticate, logout } from './store/redux/authReducer';
import { RootState } from './store/redux/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import MainCoupleScreen from './screens/main/MainCoupleScreen';
import CreateCouponBookScreen from './screens/main/CreateCouponBookScreen';
import MyAppSettingScreen from './screens/main/MyAppSettingScreen';
import MyCouponBooksScreen from './screens/main/MyCouponBooksScreen';
import InputInfoScreen from './screens/social_login/InputInfoScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthStackParamList = {
  Login: undefined;
  Register: {
    data: {
      id: number,
      name: string
    },
    result: string
  };
};
const Stack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator();


//로그인안한상태 AuthStack 간편로그인+ if 회원가입
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={GreetingLoginScreen} />
      <Stack.Screen name='Register' component={InputInfoScreen} />
    </Stack.Navigator>
  );
};

//로그인상태 AuthenticatedTab 메인스크린
const AuthenticatedTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Main' component={MainCoupleScreen} />
      <Tab.Screen name='Mybook' component={MyCouponBooksScreen} />
      <Tab.Screen name='Create' component={CreateCouponBookScreen} />
      <Tab.Screen name='Setting' component={MyAppSettingScreen} />
    </Tab.Navigator>
  );
};

// 로그인(토큰인증)상태에 따라 보여주는 Navigation
const Navigation = () => {
  const auth:authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      console.log(storedToken, refreshToken);
      //토큰 정보 가져와서 만료시간체크하고 만료됐으면 리프레시토큰으로 재발급 리프레시토큰도 만료됐으면 토큰없음
      // console.log(storedToken);
      // if(storedToken){
      //   dispatch(authenticate(storedToken, refreshToken));
      // }
    }
    fetchToken();
  }, []);

  return (
    <NavigationContainer>
      {!auth.isAuthenticated && <AuthStack />}
      {auth.isAuthenticated && <AuthenticatedTab />}
    </NavigationContainer>
  )
}



//로딩중인지 아닌지  따라 보여주는 Root
const Root = () => {
  const auth:authState = useSelector((state: RootState) => state.auth);
  
  return <Navigation />
};



export default function App() {
  const store = createStore(rootReducer);
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}
