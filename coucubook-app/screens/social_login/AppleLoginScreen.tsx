import {View, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import { APPLE_LOGIN_REDIRECT_URI, APPLE_CLIENT_ID } from '@env';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
const AppleLoginScreen = (): JSX.Element => {

    return (
        <View style={styles.screen}>
            <WebView
                style={styles.screen}
                source={{
                uri: `https://appleid.apple.com/auth/authorize?client_id=${APPLE_CLIENT_ID}&redirect_uri=${APPLE_LOGIN_REDIRECT_URI}&response_type=code id_token&response_mode=form_post`,
                }}
                injectedJavaScript={INJECTED_JAVASCRIPT}
                javaScriptEnabled={true}
                onMessage={(event) => {
                const data = event.nativeEvent.url;
                console.log(data);
                }}
            />
    </View>
    );
};

export default AppleLoginScreen;

const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
  });