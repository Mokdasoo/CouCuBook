import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './store/redux/rootReducer';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { createCouponBookTable, createCouponTable, createGiftTable } from './util/database';
import 'expo-dev-client';
import Root from './Root';

// console.log("helllllllo", process.env.NODE_ENV);
SplashScreen.preventAutoHideAsync();

export default function App():JSX.Element{
  const [fontsLoaded] = useFonts({
    'godoMaum': require('./assets/fonts/godoMaum.ttf'),
  });
  const [dbInitialized, setDbInitialized] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const authLoadHandler = () => {
    setAuthLoaded(true);
  }
  

  //sqlite 세팅
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

  const appIsReady = useCallback( async () => {
    await SplashScreen.hideAsync();
  },[]);
  
  useEffect(() => {
    if(fontsLoaded && dbInitialized && authLoaded ){
      console.log('app ready 됐어요~');
      appIsReady().then(res => {
        setAppReady(true);
      });
    }
  }, [fontsLoaded, dbInitialized, authLoaded]);

  

  return (
    <>
      <StatusBar style="auto" />
        <Provider store={store}>
          <SafeAreaView style={styles.rootScreen}>
            <NavigationContainer>
              <Root appReady={appReady} onAuthLoad={authLoadHandler}/>
            </NavigationContainer>
          </SafeAreaView>
        </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
})
