import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';
import qs from 'qs';

const REST_API_KEY = '02fc9aea28fb9a2f91b334dc97701c46';
const REDIRECT_URI = 'http://3.36.113.33:8000/kakao/login';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const requestToken = async (request_code: string,) => {
    const requestTokenUrl = 'https://kauth.kakao.com/oauth/token';
  
    const options = qs.stringify({
      grant_type: 'authorization_code',
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: request_code,
    });
  
    try {
        const tokenResponse = await axios({
            method: "POST",
            url: 'https://kauth.kakao.com/oauth/token',
            headers: {
              "content-type": "application/x-www-form-urlencoded"
            },
            data: options
        });
        const ACCESS_TOKEN = tokenResponse.data.access_token;
        console.log(ACCESS_TOKEN);
      const body = {
        ACCESS_TOKEN,
      };
      const response = await axios.post(REDIRECT_URI, body); // 우리 백 서버에 요청
      const value = response.data;
      console.log(value);
    //   const result = await storeUser(value);
    //   if (result === 'stored') {
    //     const user = await getData('user');
    //     dispatch(read_S(user));
    //     await navigation.navigate('Main');
    //   }
    } catch (e) {
      console.log(e);
    }
  };

/**카카오쪽에서 준 url에서 인가코드만 가져와 다시 토큰요청하는 함수 */
const getCode = (target: string) => { 
    const exp = 'code=';
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      requestToken(requestCode);
    }
};

const KakaoLoginScreen:React.FC = () => {
    return (
        <View style={styles.screen}>
            <WebView 
                style={{ marginTop: 30 }}
                source={{
                    uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
                }}
                injectedJavaScript={INJECTED_JAVASCRIPT}
                javaScriptEnabled={true}
                onMessage={event => {
                    const data = event.nativeEvent['url'];
                    console.log(data);
                    getCode(data);
                }}
                allowFileAccess={true}
                scalesPageToFit={true}
                originWhitelist={['*']}
            />
        </View>
    );
};
export default KakaoLoginScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },

});
