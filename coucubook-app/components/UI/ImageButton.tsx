import { GestureResponderEvent, Image, ImageSourcePropType, Pressable, StyleSheet, View } from "react-native"
import React from "react";

type Props = {
    onPress: (event: GestureResponderEvent)=>void,
    imageSrc: ImageSourcePropType
}
const ImageButton:React.FC<Props> = ({onPress, imageSrc}) => {
    return (
        <Pressable style={({pressed})=>[styles.container, pressed && styles.pressed]} onPress={onPress}>
            <Image style={styles.image} source={imageSrc}/>
        </Pressable>
    );
};

export default ImageButton;

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 50,
        borderRadius: 4,
        overflow: 'hidden',
        elevation:2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowRadius: 2,
        shadowOffset: {width: 1, height: 1},
        marginVertical: 8
    },
    pressed: {
        opacity: 0.7
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
});