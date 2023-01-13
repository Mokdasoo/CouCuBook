import { View } from "react-native";
import ImageButton from "../UI/ImageButton";
import { authState, modalControl } from "../../store/redux/authReducer";
import { RootState } from '../../store/redux/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

const LoginContent = () => {
    const auth:authState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
  
    const loginHandler = () => {
      dispatch(modalControl());
    };
  
    return (
      <View>
        <ImageButton
          imageSrc={require("../../assets/Images/kakao_login_medium_narrow.png")}
          onPress={loginHandler}
        />
        {/* <ImageButton
          imageSrc={require("../../assets/Images/google_loginButton.png")}
          onPress={loginHandler}
        />
        <ImageButton
          imageSrc={require("../../assets/Images/naver_loginButton.png")}
          onPress={loginHandler}
        /> */}
      </View>
    );
  };

export default LoginContent;