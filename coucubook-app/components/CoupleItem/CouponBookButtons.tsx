import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';

interface CouponBookButtonProps {
    icon: any;
    size: number;
    color: string;
    text: string;
    backColor:string;
    onPress: () => void;
};
const CouponBookButton = ({icon, size, color, text,backColor, onPress}: CouponBookButtonProps) : JSX.Element => {
    
    return (
        <Pressable onPress={onPress} style={({pressed}) => [styles.buttonContainerWrap, pressed && styles.pressed, {backgroundColor: backColor}]}>
                <MaterialCommunityIcons name={icon} color={color} size={size} />
                <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    )
}

interface CouponBookButtonsProps {
    isGifted: boolean;
    onGift: () => void;
    onModify: () => void;
};

const CouponBookButtons = ({isGifted, onGift, onModify}: CouponBookButtonsProps) : JSX.Element => {
    return (
        <View style={styles.buttons}>
            {
                isGifted && 
                <CouponBookButton 
                    icon='gift-open' 
                    size={15} 
                    color='#000000' 
                    text='선물완료' 
                    backColor='#06a700' 
                    onPress={()=>{Alert.alert('전달실패','이미 선물된 쿠폰북입니다.')}} 
                />
            }
            {
                !isGifted && 
                <CouponBookButton icon='gift' size={15} color='gold' text='선물하기' backColor='#ff000078' onPress={onGift} />
            }
            <CouponBookButton icon='lead-pencil' size={15} color='white' text='수정하기' backColor='#0000ff88' onPress={onModify} />
        </View>
    );
};

export default CouponBookButtons;

const styles = StyleSheet.create({
    buttons:{
        flexDirection: 'row'
    },
    buttonContainerWrap:{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
        borderRadius: 8,
        padding: 4
    },
    pressed: {
        opacity: 0.5,
    },
    buttonText: {
        fontFamily: 'godoMaum',
        fontSize: 20,
        color: 'white'
    },
})