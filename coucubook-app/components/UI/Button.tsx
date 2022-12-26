import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text } from "react-native"

interface ButtonProps {
    bgcolor: string;
    fontcolor: string;
    onPress: ()=>void;
    children?: React.ReactNode
}

const Button = ({bgcolor, fontcolor, onPress, children}: ButtonProps) : JSX.Element => {
    return (
        <Pressable 
            style={({pressed}) => 
                [styles.button,{backgroundColor: bgcolor}, pressed && styles.pressed]} 
            onPress={onPress}
        >
            <Text style={[styles.text, {color: fontcolor}]}>{children}</Text>
        </Pressable>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        width: 200,
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 2,
        borderRadius: 4,
    },
    pressed: {
        opacity: 0.7
    },
    text: {
        textAlign: 'center',
        fontSize: 16
    }
});