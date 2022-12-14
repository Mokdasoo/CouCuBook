import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback } from 'react';
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
import MyCouponBooksScreen from './screens/gifted_couponbook/MyCouponBooksScreen';
import InputInfoScreen from './screens/social_login/InputInfoScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { tokenRenewal, viewTokenInfo } from './util/kakaoRESTAPI';
import CreateBook from './screens/create_couponbook/CreateBook';

import { CouponBook } from './src/types/coupon';
import { createCouponBookTable, createCouponTable, createGiftTable } from './util/database';
import { userInfo } from './src/types/vari';
import { getOneInfo } from './util/backendRESTAPI';
import { couponState, saveLoverInfo, saveUserInfo } from './store/redux/couponReducer';

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


//????????????????????? AuthStack ???????????????+ if ????????????
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


//??????????????? AuthenticatedTab ???????????????
function AuthenticatedTab():JSX.Element {

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
            responseUser = await getOneInfo('social_id', auth.token.social_id);// ???????????? ????????? ??????
            dispatch(saveUserInfo(responseUser));
        }
        updateUserInfo();
    }, []);
    
    useEffect(() => {
        const updateLoverInfo = async () => {
            responseLover = await getOneInfo('user_code', coupon.userInfo.lover_code);// ???????????? ????????? ??????
            dispatch(saveLoverInfo(responseLover));
        }
        if(!!coupon.userInfo.lover_code){
            updateLoverInfo();
        }
    }, [coupon.userInfo]);

  
  return (
    <Tab.Navigator screenOptions={{
      headerStyle: {backgroundColor: 'transparent'},
      headerTitleStyle: {fontFamily: 'godoMaum', fontSize: 25},
      headerTitleAlign: 'center',
      title: 'CouCuBook'

    }}>
      <Tab.Screen
         name='Main' 
         component={MainCoupleScreen}
         options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name='easel-outline' color={color} size={size} />
          ),
          tabBarLabel:'??????',
          tabBarLabelStyle: {fontFamily: 'godoMaum'},
          tabBarActiveTintColor: '#718355',
        }}
      />
      <Tab.Screen name='Mybook' component={MyCouponBooksScreen} options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name='gift-outline' color={color} size={size} />
          ),
          tabBarLabel:'???????????? ????????????',
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
          tabBarLabel:'????????? ?????????/????????????',
          tabBarLabelStyle: {fontFamily: 'godoMaum'},
          tabBarActiveTintColor: '#718355',
        }}
      />
      <Tab.Screen name='Setting' component={MyAppSettingScreen} options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name='flower-outline' color={color} size={size} />
          ),
          tabBarLabel:'?????????',
          tabBarLabelStyle: {fontFamily: 'godoMaum'},
          tabBarActiveTintColor: '#718355',
        }}
      />
    </Tab.Navigator>
  );
};

// ?????????(????????????)????????? ?????? ???????????? Navigation
function Navigation():JSX.Element {

  const auth:authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  /**?????? ?????? ??????????????? ?????? ?????? ??? ???????????????????????? ?????? ????????? ??? ?????? */
  const getAccessTokenWithRefreshToken = useCallback( async (refreshToken:string) => {

    const newToken = await tokenRenewal(refreshToken);
    if(newToken === 'refresh token expired'){
      return;
    }
    let tokenInfo : tokenInfo = await viewTokenInfo(newToken);
    dispatch(authenticate(newToken, refreshToken, tokenInfo.id));
    
  },[]);


  /** ?????? ?????? ????????? ??????????????? ?????? */
  type tokenInfo = {
    id: number;
    expires_in: number;
  }
  const getTokenInfo = useCallback(async(token: string, refreshToken: string) => {
    //refreshToken ?????????
    // let tokenInfo : tokenInfo = await viewTokenInfo(token);
    let tokenInfo : tokenInfo = await viewTokenInfo(token);
    
    if(tokenInfo.expires_in > 3600 && tokenInfo.id !== 0){ // ????????? ?????? ??????
        dispatch(authenticate(token, refreshToken, tokenInfo.id));
        
    }else {// ????????? ?????? ??????
        await getAccessTokenWithRefreshToken(refreshToken);
    }
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      console.log("token: ",storedToken, "refresh: ", refreshToken);


      //?????? ?????? ???????????? ???????????????????????? ??????????????? ???????????????????????? ????????? ????????????????????? ??????????????? ????????????
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



//??????????????? ?????????  ?????? ???????????? Root
function Root():JSX.Element {
  
  return <Navigation />
};

SplashScreen.preventAutoHideAsync();

export default function App():JSX.Element | null{
  const [dbInitialized, setDbInitialized] = useState(false);
  const [fontsLoaded] = useFonts({
    'godoMaum': require('./assets/fonts/godoMaum.ttf'),
  });

  useEffect(() => {
    createCouponBookTable()
      .then(() => {
        createCouponTable()
          .then(() => {
            createGiftTable()
            .then(() => {
              setDbInitialized(true);
            })
            .catch((err) => {
              console.log(err);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      }
    );
  }, []);
  
  useEffect(() => {
    if(fontsLoaded && dbInitialized){
      const appIsReady = async () => {
        await SplashScreen.hideAsync();
      }
      appIsReady();
    }
  }, [fontsLoaded, dbInitialized]);

  if(!fontsLoaded || !dbInitialized){
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
