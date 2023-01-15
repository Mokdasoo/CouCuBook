import { Button, View, Modal } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../store/redux/authReducer";
import { authState, modalControl } from "../../store/redux/authReducer";
import { RootState } from '../../store/redux/rootReducer';
import { useSelector} from 'react-redux';
import KakaoLogoutScreen from "../social_login/KakaoLogoutScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainSettingsScreen from "./MainSettingsScreen";
import UserSettingScreen from "./UserSettingScreen";
import CoupleSettingScreen from "./CoupleSettingScreen";

export type MyAppSettingStackParamList = {
    MySettings: undefined;
    UserSetting: undefined;
    CoupleSetting: undefined;
  };

const Stack = createNativeStackNavigator<MyAppSettingStackParamList>();
const MyAppSettingScreen = () : JSX.Element => {
    return(
        <Stack.Navigator screenOptions={{
          headerTitleStyle: {fontFamily: 'godoMaum', fontSize: 25},
          headerTitleAlign: 'center',
          title: 'CouCuBook'
          }}>
            <Stack.Screen name='MySettings' component={MainSettingsScreen} />
            <Stack.Screen name='UserSetting' component={UserSettingScreen} />
            <Stack.Screen name='CoupleSetting' component={CoupleSettingScreen} />
        </Stack.Navigator>
    )
}

export default MyAppSettingScreen;