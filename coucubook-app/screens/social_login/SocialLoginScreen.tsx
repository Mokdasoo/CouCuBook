import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import axios from "axios";
import { authState, authenticate, modalControl} from '../../store/redux/authReducer';
import { RootState } from '../../store/redux/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { LoginScreenProps } from "../GreetingLoginScreen";
import { KAKAO_REDIRECT_URI, KAKAO_REST_API_KEY, APPLE_LOGIN_REDIRECT_URI, APPLE_CLIENT_ID } from "@env";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
interface SocialLoginScreenProps {
  platform: string;
}

const SocialLoginScreen = ({platform}: SocialLoginScreenProps): JSX.Element => {
  let webviewURI : string;
  
  let backendPostURI: string;
  if(platform === 'kakao'){
    backendPostURI = KAKAO_REDIRECT_URI;
    webviewURI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;
    
  }else{ //apple일 때
    backendPostURI = APPLE_LOGIN_REDIRECT_URI;
    webviewURI = `https://appleid.apple.com/auth/authorize?client_id=${APPLE_CLIENT_ID}&redirect_uri=${APPLE_LOGIN_REDIRECT_URI}&response_type=code&response_mode=query`;
    
  }
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginScreenProps["navigation"]>();
  const auth:authState = useSelector((state: RootState) => state.auth);

  const requestToken = async (request_code: string) => {
    try {
    /** 인가 코드로 백엔드에 액세스 토큰발급 & 유저 정보 요청 */
    const result = await axios({
      method: 'POST',
      url: backendPostURI,
      data: {
          code : request_code
      }
    });
    const value = result.data;
    console.log(value);
    switch (value.result) {
      case "success":
        dispatch(modalControl(value.name));
        dispatch(authenticate(value.access_token, value.refresh_token, value.userData.social_id, value.name));
        break;
      case "needInfo":
        dispatch(modalControl(value.name));
        console.log(value);
        await navigation.replace('Register', value);
        break;
    
      default:
        dispatch(modalControl(value.name));
        Alert.alert('login error', '로그인에 실패하셨습니다. 잠시 뒤에 다시 시도해 주세요')
        break;
    }
        
    } catch (e) {
      console.log(e);
    }
  };

  /**kakao, apple쪽에서 응답한 url query중에서 요청코드만 가져와 다시 토큰요청하는 함수 */
  const getCode = (target: string) => {
    const exp = "code=";
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      requestToken(requestCode);
    }
  };

  return (
    <View style={styles.screen}>
      {
        webviewURI &&
        <WebView
          style={styles.screen}
          source={{
            uri: webviewURI,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled={true}
          onMessage={(event) => {
            const data = event.nativeEvent.url;
            getCode(data);
          }}
        />
      }
      
    </View>
  );
};
export default SocialLoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
