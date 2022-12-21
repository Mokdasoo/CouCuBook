import { Text, View, Image, StyleSheet } from "react-native";
import React from "react";

const IntroContent:React.FC<{text: string}> = ({ text }) => {
    return ( 
        <>
            <Image style={styles.image} source={require('../assets/Images/introexample.jpeg')}/>
            <Text>
                {text}
            </Text>
        </>
    )
}

const LoginContent:React.FC = () => {
    return ( 
        <View>
            <Text>로그인</Text>
        </View>
    )
}




export const Introduction_pages = [
    {
        order: 1,
        content: <IntroContent text={'첫번째 페이지'}/>,
    },
    {
        order: 2,
        content: <IntroContent text={'두번째 페이지'}/>,
    },
    {
        order: 3,
        content: <IntroContent text={'세번째 페이지'}/>,
    },
    {
        order: 4,
        content: <LoginContent />,
    },
];

const styles = StyleSheet.create({
    pageItem: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden'
        
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 30
    }
});