import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, } from 'react-native';
import GreetingLoginScreen from './screens/GreetingLoginScreen';
import KakaoLoginScreen from './screens/social_login/KakaoLoginScreen';

import axios from 'axios';





export default function App() {
  const logoutHandler = async () => {
    const res = await axios.get('https://kauth.kakao.com/oauth/logout?client_id=02fc9aea28fb9a2f91b334dc97701c46&logout_redirect_uri=http://3.36.113.33:8000/kakao/logout');
    console.log(res);
  }
  return (
    <>
      <KakaoLoginScreen />
      <Button title='logout' onPress={logoutHandler}/>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  
});
