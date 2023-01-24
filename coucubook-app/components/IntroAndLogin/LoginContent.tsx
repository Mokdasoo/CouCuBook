import { View } from "react-native";
import ImageButton from "../UI/ImageButton";
import { authState, modalControl } from "../../store/redux/authReducer";
import { RootState } from '../../store/redux/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

const LoginContent = () => {
    const auth:authState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
  
    const loginHandler = (platform: string) => {
      dispatch(modalControl(platform));
    };
    
    return (
      <View>
        <ImageButton
          imageSrc={require("../../assets/Images/kakao_login_medium_narrow.png")}
          onPress={loginHandler.bind(this, 'kakao')}
        />
        {/* <ImageButton
          imageSrc={require("../../assets/Images/google_loginButton.png")}
          onPress={loginHandler.bind(this, 'google')}
        />  */}
        <ImageButton
          imageSrc={require("../../assets/Images/appleid_button.png")}
          onPress={loginHandler.bind(this, 'apple')}
        />
      </View>
    );
  };

export default LoginContent;