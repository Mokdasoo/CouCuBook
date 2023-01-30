import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GreetingLoginScreen from "./screens/social_login/GreetingLoginScreen";
import InputInfoScreen from "./screens/social_login/InputInfoScreen";



export type AuthStackParamList = {
    Login: undefined;
    Register: {
      id: string,
      name: string,
      access_token: string,
      refresh_token: string,
      result: string
    };
  };
  
  const Stack = createNativeStackNavigator<AuthStackParamList>();
  //로그인안한상태 AuthStack 간편로그인+ if 회원가입
  const AuthStack = ():JSX.Element => {
  
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='Login' component={GreetingLoginScreen} />
        <Stack.Screen name='Register' component={InputInfoScreen} />
      </Stack.Navigator>
    );
  };

  export default AuthStack;