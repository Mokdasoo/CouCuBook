import React from "react";
import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { authState, logout} from '../../store/redux/authReducer';
import { RootState } from '../../store/redux/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { BACKEND_ADDRESS, KAKAO_REST_API_KEY } from "@env";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const KakaoLogoutScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const auth:authState = useSelector((state: RootState) => state.auth);

  
  const logoutHandler = (target: string) => {
    if(target === `${BACKEND_ADDRESS}/auth/kakao/logout`){
      dispatch(logout());
    }
  }

  return (
    <View style={styles.screen}>
      <WebView
        style={styles.screen}
        source={{
          uri: `https://kauth.kakao.com/oauth/logout?client_id=${KAKAO_REST_API_KEY}&logout_redirect_uri=${BACKEND_ADDRESS}/auth/kakao/logout`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled={true}
        onMessage={(event) => {
          const data = event.nativeEvent;
          console.log(data);
          logoutHandler(data.url);
        }}
      />
    </View>
  );
};

export default KakaoLogoutScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
