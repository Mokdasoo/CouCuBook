import { StyleSheet, View} from "react-native";
import React, {useEffect, useState} from 'react';

import { useDispatch,useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootReducer";
import { authState } from "../../store/redux/authReducer";

import { userInfo } from "../../src/types/vari";
import { getOneInfo, saveLoverCode } from "../../util/backendRESTAPI";
import LoverCodeScreen from "./LoverCodeScreen";
import CoupleImage from "./CoupleImage";





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
                    <CoupleImage 
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
        backgroundColor: '#e3d5ca',
    },
    

});