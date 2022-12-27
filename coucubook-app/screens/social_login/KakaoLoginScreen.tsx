import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import axios from "axios";
import qs from "qs";
import { authState, authenticate, modalControl } from '../../store/redux/authReducer';
import { RootState } from '../../store/redux/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { LoginScreenProps } from "../GreetingLoginScreen";
import { KAKAO_REDIRECT_URI, KAKAO_REST_API_KEY, BACKEND_LOCALHOST, KAKAO_REDIRECT_URI_LOCAL } from "@env";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const KakaoLoginScreen = (): JSX.Element => {``
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginScreenProps["navigation"]>();
  const auth:authState = useSelector((state: RootState) => state.auth);

  const requestToken = async (request_code: string) => {
    const requestTokenUrl = "https://kauth.kakao.com/oauth/token";

    const options = qs.stringify({
      grant_type: "authorization_code",
      client_id: KAKAO_REST_API_KEY,
      redirect_uri: KAKAO_REDIRECT_URI_LOCAL,
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
      // tokenResponse.data => access_token, expires_in, refresh_token, refresh_token_expires_in 있음 추후 처리
      const ACCESS_TOKEN = tokenResponse.data.access_token;
      const REFRESH_TOKEN = tokenResponse.data.refresh_token;
      console.log(ACCESS_TOKEN);
        
      /** 우리 BE 서버에 요청 */ 
      const response = await axios({
        method: 'POST',
        url: KAKAO_REDIRECT_URI_LOCAL,
        data: {
            token: ACCESS_TOKEN
        }
      }); 
      
      const value = response.data;
      switch (value.result) {
        case "success":
          dispatch(modalControl());
          dispatch(authenticate(ACCESS_TOKEN, REFRESH_TOKEN));
          break;
        case "needInfo":
          dispatch(modalControl());
          value.data.token = ACCESS_TOKEN;
          value.data.refreshToken = REFRESH_TOKEN;
          console.log(value);
          await navigation.replace('Register', value);
          break;
      
        default:
          dispatch(modalControl());
          Alert.alert('login error', '로그인에 실패하셨습니다. 잠시 뒤에 다시 시도해 주세요')
          break;
      }
        
        

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
      console.log("requestCode :   ", requestCode);
      requestToken(requestCode);
    }
  };

  return (
    <View style={styles.screen}>
      <WebView
        style={styles.screen}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI_LOCAL}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled={true}
        onMessage={(event) => {
          const data = event.nativeEvent.url;
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
