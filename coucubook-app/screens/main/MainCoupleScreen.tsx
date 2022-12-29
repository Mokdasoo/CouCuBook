import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import {useEffect, useState} from 'react';

import { useDispatch,useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootReducer";
import { authState } from "../../store/redux/authReducer";
import axios from "axios";
import { BACKEND_ADDRESS } from "@env";
import { userInfo } from "../../src/types/vari";
import Input from "../../components/UI/Input";
import * as Clipboard from 'expo-clipboard';
import Button from "../../components/UI/Button";

interface LoverCodeScreenProps {
    nickname?: string;
    userCode?: string;
}
const LoverCodeScreen = ({nickname, userCode} : LoverCodeScreenProps) : JSX.Element => {
    const [inputCode, setInputCode] = useState<string>('');
    const inputChangeHandler = (enteredValue: string) => {
        setInputCode(enteredValue);
    }
    const copyCodeHandler = async () => {

        userCode && await Clipboard.setStringAsync(userCode);
        Alert.alert('코드 복사', '완료!');
    }
    const submitHandler = () => {
        if(inputCode.length !== 10 ||  inputCode === userCode){
            Alert.alert('코드 오류', '맞는 코드가 아닙니다!');
            return;
        }
        //키보드 켜지면 화면 가려지는거 고치기
        //실제 있는 코드인지 검사
        //코드의 주인의 lover code가 비어있을경우
        //코드의 주인의 lover code가 채워져 있는데 나의 코드일 경우
        //코드의 주인의 lover code가 채워져 있는데 내가 아닐 경우
    }

    return (
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
    const [userInfo, setUserInfo] = useState<userInfo>();

    const getUserInfoToDB = async (socialId: number) => {
        let response;
        try {
            await axios.get(
                `${BACKEND_ADDRESS}/auth/user`,
                {
                    params: {social_id: socialId}
                },
            ).then((res) => {
                response = res.data;
            });
        } catch (error) {
            console.log(error);
        }
        console.log(response);
        setUserInfo(response);
    }

    useEffect(()=>{
        
        getUserInfoToDB(auth.token.social_id);
        
    }, []);

    

    return(
        <View style={styles.screen}>
            {!userInfo?.lover_code && <LoverCodeScreen nickname={userInfo?.nickname} userCode={userInfo?.user_code} />}
            {userInfo?.lover_code && <CoupleMain />}
        </View>
    )
}

export default MainCoupleScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#e3d5ca',
        paddingHorizontal: 32
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