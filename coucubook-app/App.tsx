import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import GreetingLoginScreen from './screens/GreetingLoginScreen';
import KakaoLoginScreen from './screens/social_login/KakaoLoginScreen';






export default function App() {
  return (
    <>
      <KakaoLoginScreen />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  
});
