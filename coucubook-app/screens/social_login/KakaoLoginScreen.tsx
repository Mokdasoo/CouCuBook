import React from "react";
import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import axios from "axios";
import qs from "qs";

const REST_API_KEY = "02fc9aea28fb9a2f91b334dc97701c46";
const REDIRECT_URI = "http://3.36.113.33:8000/kakao/login";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const KakaoLoginScreen: React.FC = () => {
  const requestToken = async (request_code: string) => {
    const requestTokenUrl = "https://kauth.kakao.com/oauth/token";

    const options = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: request_code,
    });

    try {
      const tokenResponse = await axios({
        method: "POST",
        url: requestTokenUrl,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: options,
      });
      console.log(tokenResponse.data);
      // access_token, expires_in, refresh_token, refresh_token_expires_in 있음 추후 처리
      const ACCESS_TOKEN = tokenResponse.data.access_token;
      console.log(ACCESS_TOKEN);
        
      /** 우리 BE 서버에 요청 */ 
      const response = await axios({
        method: 'POST',
        url: REDIRECT_URI,
        data: {
            token: ACCESS_TOKEN
        }
      }); 
        // const value = response.data;
        console.log(response.data);

        // const result = await storeUser(value);
        // if (result === 'stored') {
        //   const user = await getData('user');
        //   dispatch(read_S(user));
        //   await navigation.navigate('Main');
        // }
    } catch (e) {
      console.log(e);
    }
  };

  /**카카오쪽에서 준 url에서 인가코드만 가져와 다시 토큰요청하는 함수 */
  const getCode = (target: string) => {
    const exp = "code=";
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      console.log("requestCode ::::::   ", requestCode);
      requestToken(requestCode);
    }
  };

  return (
    <View style={styles.screen}>
      <WebView
        style={styles.screen}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled={true}
        onMessage={(event) => {
          const data = event.nativeEvent.url;
          console.log("data : ", data);
          getCode(data);
        }}
      />
    </View>
  );
};
export default KakaoLoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
