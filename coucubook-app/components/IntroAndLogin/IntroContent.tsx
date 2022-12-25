import { StyleSheet, Image, Text, ImageSourcePropType } from "react-native";


  interface IntroContentProps {
    text: string;
    src: ImageSourcePropType;
  }
  
  const IntroContent = ({ text, src} : IntroContentProps): JSX.Element =>  {
    return (
      <>
        <Image
          style={styles.image}
          source={src}
        />
        <Text>{text}</Text>
      </>
    );
  };

  export default IntroContent;
  
  const styles = StyleSheet.create({
    image: {
      width: 200,
      height: 200,
      marginBottom: 30,
    },
  });