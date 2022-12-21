import { Text, View, Image, StyleSheet } from "react-native";
import React from "react";
import ImageButton from "../components/UI/ImageButton";

const IntroContent: React.FC<{ text: string }> = ({ text }) => {
  return (
    <>
      <Image
        style={styles.image}
        source={require("../assets/Images/introexample.jpeg")}
      />
      <Text>{text}</Text>
    </>
  );
};

const LoginContent: React.FC = () => {
  const loginHandler = () => {};

  return (
    <View>
      <ImageButton
        imageSrc={require("../assets/Images/kakao_login_medium_narrow.png")}
        onPress={loginHandler}
      />
      <ImageButton
        imageSrc={require("../assets/Images/btn_google_signin_light_normal_web.png")}
        onPress={loginHandler}
      />
      <ImageButton
        imageSrc={require("../assets/Images/naver_loginButton.png")}
        onPress={loginHandler}
      />
    </View>
  );
};

export const Introduction_pages = [
  {
    order: 1,
    content: <IntroContent text={"첫번째 페이지"} />,
  },
  {
    order: 2,
    content: <IntroContent text={"두번째 페이지"} />,
  },
  {
    order: 3,
    content: <IntroContent text={"세번째 페이지"} />,
  },
  {
    order: 4,
    content: <LoginContent />,
  },
];

const styles = StyleSheet.create({
  pageItem: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
});
