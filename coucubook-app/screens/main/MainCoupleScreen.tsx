import { Alert, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View, Platform, StatusBar, ImageBackground, Image} from "react-native";
import React, {useEffect, useState} from 'react';

import { useDispatch,useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootReducer";
import { authState } from "../../store/redux/authReducer";

import { userInfo } from "../../src/types/vari";
import { getOneInfo, saveLoverCode } from "../../util/backendRESTAPI";

import LoverCodeScreen from "./LoverCodeScreen";

interface CoupleMainProps {
    anniversary: string;
    couple_image_uri: string;
}

const CoupleMain = ({anniversary, couple_image_uri} : CoupleMainProps) : JSX.Element => {


    

    return (
        <View style={styles.rootScreen}>
            <View style={styles.coupleInfoContainer}>
                <Text style={styles.coupleInfoText}>만난지 {anniversary}일째</Text>
            </View>
            <Image source={{uri: couple_image_uri}} />

        </View>
    );
};



const MainCoupleScreen = () => {
    const auth:authState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const userInfoInitState = {
        "birth": '',
        "id": 0, 
        "nickname": '',  
        "social_id": '',  
        "social_platform": '',  
        "user_code": '',
        "lover_code" : null,
        "anniversary": '',
        "couple_image": '',
        "msg": '',
    };
    const [userInfo, setUserInfo] = useState<userInfo>(userInfoInitState);
    const [loverInfo, setLoverInfo] = useState<userInfo>(userInfoInitState);

    
    let responseUser: userInfo = userInfoInitState;
    let responseLover: userInfo = userInfoInitState;
    

    useEffect(()=>{
        const updateUserInfo = async () => {
            responseUser = await getOneInfo('social_id', auth.token.social_id);// 조인하는 함수로 변경
            setUserInfo((prevState) => ({
                ...prevState,
                ...responseUser 
            }));
        }
        updateUserInfo();
        
    }, []);
    useEffect(() => {
        console.log("get one info ::: ", userInfo.lover_code);
        
        const updateLoverInfo = async () => {
            responseLover = await getOneInfo('user_code', userInfo.lover_code);// 조인하는 함수로 변경
            setLoverInfo((prevState) => ({
                ...prevState,
                ...responseUser 
            }));
        }
        if(!!userInfo.lover_code){
            updateLoverInfo();
        }

    }, [userInfo]);

    

    return(
        <View style={styles.screen}>
            { !userInfo.lover_code && 
                <LoverCodeScreen 
                    nickname={userInfo?.nickname} 
                    userCode={userInfo?.user_code}
                    setUserInfo={setUserInfo} 
                />
            }
            { !!userInfo.lover_code  && 
                <CoupleMain 
                    anniversary={userInfo?.anniversary}
                    couple_image_uri={userInfo?.couple_image}
                />
            }
        </View>
    )
}

export default MainCoupleScreen;

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    screen: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#e3d5ca',
    },
    imgBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    coupleInfoContainer: {
        backgroundColor: '#e6e6e62f',
        width: '100%',
    },
    coupleInfoText: {
        textAlign: 'center',
        fontFamily: 'godoMaum',
        fontSize: 60
        
    }

});