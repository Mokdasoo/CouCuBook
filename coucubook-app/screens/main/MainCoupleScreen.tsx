import { StyleSheet, Text, View, ImageBackground, Pressable } from "react-native";
import React, {useEffect, useState} from 'react';

import { useDispatch,useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootReducer";
import { authState } from "../../store/redux/authReducer";

import { userInfo } from "../../src/types/vari";
import { getOneInfo, saveLoverCode } from "../../util/backendRESTAPI";
import {Ionicons} from '@expo/vector-icons';
import LoverCodeScreen from "./LoverCodeScreen";

interface CoupleMainProps {
    userInfo: userInfo;
    loverInfo: userInfo;
}

const CoupleMain = ({userInfo, loverInfo} : CoupleMainProps) : JSX.Element => {
    const dDayCalc = (date: string) => {
        const nowDate = new Date();
        const year = nowDate.getFullYear();
        const month = ("0" + (1 + nowDate.getMonth())).slice(-2);
        const day = ("0" + nowDate.getDate()).slice(-2);
        const nowTime = new Date(year + "-" + month + "-" + day);
        const Ddate = new Date(date);
        
        return (nowTime.getTime() - Ddate.getTime())/1000/60/60/24 + 1;
    }
    const pickImageHandler = () => {

    }

    useEffect(() => {

    }, []);
    

    return (
        <View style={styles.rootScreen}>
            <ImageBackground 
                style={styles.coupleImg} 
                source={
                    !!userInfo.couple_image ? 
                    {uri: userInfo.couple_image} : 
                    require('../../assets/Images/couple_default_img.jpg')
                } 
                resizeMode='cover'
            >
                <View style={styles.coupleInfoContainer}>
                    <View>
                        <Text style={styles.textTitle}>디데이</Text>
                        <Text style={styles.textTitle}>{dDayCalc(userInfo.anniversary)}일</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={[styles.textContent, styles.leftNick]}>{userInfo.nickname}</Text>
                        <Text style={[styles.textContent, styles.centerHeart]}>❤️</Text>
                        <Text style={[styles.textContent, styles.rightNick]}>{loverInfo.nickname}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable onPress={pickImageHandler} style={({pressed}) =>  [styles.buttonWrap, pressed && styles.pressed]}>
                        <View>
                            <Ionicons name='images' color='#000000c7' size={24} />
                        </View>
                    </Pressable>
                </View>
            </ImageBackground>

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
        "couple_image": null,
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
        
        
        const updateLoverInfo = async () => {
            responseLover = await getOneInfo('user_code', userInfo.lover_code);// 조인하는 함수로 변경
            setLoverInfo((prevState) => ({
                ...prevState,
                ...responseLover 
            }));
        }
        if(!!userInfo.lover_code){
            updateLoverInfo();
        }

    }, [userInfo]);

    

    return(
        <>
            { loverInfo.lover_code !== userInfo.user_code && 
                <View style={styles.screen}>
                    <LoverCodeScreen 
                        nickname={userInfo?.nickname} 
                        userCode={userInfo?.user_code}
                        setUserInfo={setUserInfo} 
                    />
                </View>
            }
            { loverInfo.lover_code === userInfo.user_code  && 
                <View style={styles.rootScreen}>
                    <CoupleMain 
                    userInfo={userInfo}
                    loverInfo={loverInfo}
                    />
                </View>
            }
        </>
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
        backgroundColor: '#e6ceae',
    },
    coupleImg: {
        justifyContent: 'space-between',
        flex: 1,
        width: '100%',
        height: '100%',
    },
    coupleInfoContainer: {
        
        alignItems: 'center',
        // backgroundColor: '#00000059',
        // borderRadius: 20,
        // marginHorizontal: 20
    },
    textTitle: {
        textAlign: 'center',
        fontFamily: 'godoMaum',
        fontSize: 30,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 2
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    textContent : {
        fontFamily: 'godoMaum',
        fontSize: 25,
        color: 'white',
        paddingVertical: 8,
        paddingHorizontal: 3,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 2
    },
    leftNick: {
        flex: 4,
        textAlign: 'right',
    },
    rightNick: {
        flex: 4,
        textAlign: 'left',
    },
    centerHeart:{
        flex: 1,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'flex-end'
    },
    buttonWrap: {
        width: 60,
        height: 60,
        backgroundColor: '#0000001e',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },
    pressed: {
        backgroundColor: '#00000096'
    }

});