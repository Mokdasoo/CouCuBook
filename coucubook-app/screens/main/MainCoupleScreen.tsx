import { Alert, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View, Platform, StatusBar} from "react-native";
import React, {useEffect, useState} from 'react';

import { useDispatch,useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootReducer";
import { authState } from "../../store/redux/authReducer";
import axios from "axios";
import { BACKEND_ADDRESS } from "@env";
import { userInfo } from "../../src/types/vari";
import Input from "../../components/UI/Input";
import * as Clipboard from 'expo-clipboard';
import Button from "../../components/UI/Button";
import { getUserInfo, saveLoverCode } from "../../util/backendRESTAPI";

interface LoverCodeScreenProps {
    nickname?: string;
    userCode?: string;
    onChangeLoverCode ?: React.Dispatch<React.SetStateAction<userInfo>>
}

const LoverCodeScreen = ({nickname, userCode, onChangeLoverCode} : LoverCodeScreenProps) : JSX.Element => {
    const [inputCode, setInputCode] = useState<string>('');
    const inputChangeHandler = (enteredValue: string) => {
        setInputCode(enteredValue);
    }
    const copyCodeHandler = async () => {

        userCode && await Clipboard.setStringAsync(userCode);
        Alert.alert('코드 복사', '완료!');
    }
    const submitHandler = async () => {
        if(inputCode.length !== 10 ||  inputCode === userCode){
            Alert.alert('코드 오류', '맞는 코드가 아닙니다!');
            return;
        }
        //실제 있는 코드인지 검사
        const loverInfo = await getUserInfo('user_code', inputCode);
        console.log("loverInfo---------",loverInfo);
        //코드 주인의 lover code가 비어있을경우
        if(!loverInfo.lover_code){
            const msg = await saveLoverCode(userCode!, inputCode);
            console.log(msg);
            //백서버에 요청, 본인 아이디 + lovercode  보내서 저장하기
            //상대방 계정도 lovercode에 작성자코드 저장하기
        }else{
            //코드 주인의 lover code가 채워져 있는데 나의 코드일 경우
            if(loverInfo.lover_code === userCode){
                Alert.alert('이미 등록되셨습니다.', `${loverInfo.nickname}님과 이미 커플입니다.`);
                onChangeLoverCode!((prevState : userInfo) => {
                    return { ...prevState, lover_code: inputCode}
                });
                return;
            }else{  //코드 주인의 lover code가 채워져 있는데 내가 아닐 경우
                Alert.alert('등록 오류!', `${loverInfo.nickname}님은 이미 다른 분과 커플입니다.`);
                return;
            }
            
        }
        
        
    }

    return (
        <KeyboardAvoidingView 
                style={styles.rootScreen} 
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={90}
            >
            <ScrollView 
                style={styles.rootScreen}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.screen}>
                    <View style={styles.content}>
                        <Text style={styles.title}>커플 코드 등록</Text>
                    </View>
                    <View style={styles.content}>
                        <View>
                            <Text style={styles.text}>{nickname}님의 코드</Text>
                        </View>
                        <View>
                            <Pressable onPress={copyCodeHandler} style={({pressed}) => [pressed && styles.pressed]}>
                                <Text style={styles.codeText}>{userCode}</Text>
                            </Pressable>
                        </View>
                        <View>
                            <Text style={styles.text}>{"연인분에게 공유해 주세요!\n두 분 중 한 분만 하시면 됩니다\n(터치로 복사)"}</Text>
                        </View>
                    </View>
                    <View style={styles.content2}>
                        <Input 
                            style={styles.rowInput}
                            label='상대방 코드 입력하기'
                            textInputConfig={{
                                placeholder: '입력',
                                maxLength: 10,
                                onChangeText: inputChangeHandler,
                                value: inputCode,
                                textAlign: 'center',
                            }}
                            invalid={true}
                            />
                        <Button bgcolor="#77bfa3" fontcolor="white" onPress={submitHandler} >등록하기</Button>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const CoupleMain = () : JSX.Element => {

    return (
        <Text>CoupleMain</Text>
    );
};


const MainCoupleScreen = () => {
    const auth:authState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const userInfoInitState = {
        "anniversary": '',
        "birth": '',
        "id": 0, 
        "lover_code": null, 
        "nickname": '',  
        "social_id": '',  
        "social_platform": '',  
        "user_code": '',
    };
    const [userInfo, setUserInfo] = useState<userInfo>(userInfoInitState);

    
    let response: userInfo = userInfoInitState;
    
    

    useEffect(()=>{
        const updateUserInfo = async () => {
            response = await getUserInfo('social_id', auth.token.social_id);
            setUserInfo(response);
        }
        updateUserInfo();
    }, []);

    

    return(
        <View style={styles.screen}>
            {!userInfo?.lover_code && 
                <LoverCodeScreen 
                    nickname={userInfo?.nickname} 
                    userCode={userInfo?.user_code} 
                    onChangeLoverCode={setUserInfo}
                />
            }
            {userInfo?.lover_code && <CoupleMain />}
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    content2:{
        flex:2,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    rowInput:{
        alignItems: 'center',
        marginVertical: 18
    },
    
    title: {
        fontFamily: 'godoMaum',
        fontSize: 60
    },
    codeText:{
        fontFamily: 'godoMaum',
        fontSize: 50
    },
    text: {
        fontFamily: 'godoMaum',
        fontSize: 25,
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.7
    }
});