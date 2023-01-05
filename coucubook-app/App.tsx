import { StatusBar } from 'expo-status-bar';
import { useEffect, useCallback } from 'react';
import GreetingLoginScreen from './screens/GreetingLoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import rootReducer from './store/redux/rootReducer';
import {createStore} from 'redux';
import { authState, authenticate } from './store/redux/authReducer';
import { RootState } from './store/redux/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import MainCoupleScreen from './screens/main/MainCoupleScreen';
import CreateCouponBookScreen,{CreateBookListScreenProps, CreateCouponBookButton} from './screens/create_couponbook/CreateCouponBookScreen';
import MyAppSettingScreen from './screens/main/MyAppSettingScreen';
import MyCouponBooksScreen from './screens/main/MyCouponBooksScreen';
import InputInfoScreen from './screens/social_login/InputInfoScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { tokenRenewal, viewTokenInfo } from './util/kakaoRESTAPI';
import CreateBook from './screens/create_couponbook/CreateBook';

import { useNavigation } from '@react-navigation/native';
import { CouponBook } from './src/types/coupon';

// console.log("helllllllo", process.env.NODE_ENV);


export type AuthStackParamList = {
  Login: undefined;
  Register: {
    data: {
      id: number,
      name: string,
      token: string,
      refreshToken: string
    },
    result: string
  };
};
const Stack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator();


//로그인안한상태 AuthStack 간편로그인+ if 회원가입
function AuthStack():JSX.Element {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='Login' component={GreetingLoginScreen} />
      <Stack.Screen name='Register' component={InputInfoScreen} />
    </Stack.Navigator>
  );
};

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
      headerStyle: {backgroundColor: 'transparent'},
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


//로그인상태 AuthenticatedTab 메인스크린
function AuthenticatedTab():JSX.Element {
  
  return (
    <Tab.Navigator screenOptions={{
      headerStyle: {backgroundColor: 'transparent'},
      headerTitleStyle: {fontFamily: 'godoMaum', fontSize: 25},
      headerTitleAlign: 'center',
      title: 'CouCuBook'

    }}>
      <Tab.Screen name='Main' component={MainCoupleScreen} options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name='easel-outline' color={color} size={size} />
          ),
          tabBarLabel:'메인',
          tabBarLabelStyle: {fontFamily: 'godoMaum'},
          tabBarActiveTintColor: '#718355',
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
      <Tab.Screen name='Create' component={CouponBookStack} options={{
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

// 로그인(토큰인증)상태에 따라 보여주는 Navigation
function Navigation():JSX.Element {

  const auth:authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  /**토큰 만료 다가오거나 만료 됐을 때 리프레시토큰으로 토큰 재발급 후 저장 */
  const getAccessTokenWithRefreshToken = useCallback( async (refreshToken:string) => {

    const newToken = await tokenRenewal(refreshToken);
    if(newToken === 'refresh token expired'){
      return;
    }
    let tokenInfo : tokenInfo = await viewTokenInfo(newToken);
    dispatch(authenticate(newToken, refreshToken, tokenInfo.id));
    
  },[]);


  /** 토큰 만료 판단후 이상없으면 저장 */
  type tokenInfo = {
    id: number;
    expires_in: number;
  }
  const getTokenInfo = useCallback(async(token: string, refreshToken: string) => {
    //refreshToken 만료전
    // let tokenInfo : tokenInfo = await viewTokenInfo(token);
    let tokenInfo : tokenInfo = await viewTokenInfo(token);
    
    if(tokenInfo.expires_in > 3600 && tokenInfo.id !== 0){ // 엑세스 토큰 정상
        dispatch(authenticate(token, refreshToken, tokenInfo.id));
        
    }else {// 엑세스 토큰 만료
        await getAccessTokenWithRefreshToken(refreshToken);
    }
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      console.log("token: ",storedToken, "refresh: ", refreshToken);


      //토큰 정보 가져와서 만료시간체크하고 만료됐으면 리프레시토큰으로 재발급 리프레시토큰도 만료됐으면 토큰없음
      if(storedToken && refreshToken){
        await getTokenInfo(storedToken, refreshToken);
      }
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
function Root():JSX.Element {
  
  return <Navigation />
};

SplashScreen.preventAutoHideAsync();

export default function App():JSX.Element | null{
  const [fontsLoaded] = useFonts({
    'godoMaum': require('./assets/fonts/godoMaum.ttf'),
  });

  useEffect(() => {
    if(fontsLoaded){
      const appIsReady = async () => {
        await SplashScreen.hideAsync();
      }
      appIsReady();
    }
  }, [fontsLoaded]);

  if(!fontsLoaded){
    return null;
  }

  const store = createStore(rootReducer);

  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <SafeAreaView style={styles.rootScreen}>
          <Root />
        </SafeAreaView>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  }
})
