import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/UI/Button";
import { breakCoupleState, couponState, updateAnniversary } from "../../store/redux/couponReducer";
import { RootState } from "../../store/redux/rootReducer";
import {useState} from 'react';
import { dateCheckHandler } from "../../util/usefulFunc";
import { breakCouple, updateAnniversaryBE } from "../../util/backendRESTAPI";


const CoupleSettingScreen = (): JSX.Element => {
    const coupon:couponState = useSelector((state: RootState) => state.coupon);
    const [input, setInput] = useState<string>(coupon.userInfo.anniversary);
    const [isValid, setIsValid] = useState<boolean>(true);
    const dispatch = useDispatch();
    const inputChangeHandler = (enteredValue: string) => {
        setInput(enteredValue);
        dateCheckHandler(enteredValue) ? setIsValid(true) : setIsValid(false);
    }
    const modifyHandler = async () => {
        if(isValid){
            const result = await updateAnniversaryBE(coupon.userInfo.user_code, input);
            if(result === 'success'){
                dispatch(updateAnniversary(input));
                Alert.alert('수정 완료!', '수정하였습니다.');
            }else{
                Alert.alert('수정 오류!', '수정하는데 실패했습니다. 잠시후에 다시 시도해주세요');
            }
        }else{
            Alert.alert('날짜 오류!', '날짜 형식이 YYYY-MM-DD가 아니거나 미래의 시간입니다');
        }
    }
    const breakCoupleHandler = () => {
        Alert.alert(
            '커플 끊기',
            '커플을 끊으시면 돌이킬 수 없게 됩니다. 정말로 끊으시겠습니까?',
            [
              {text: '취소', onPress: () => {}, style: 'cancel'},
              {
                text: '끊기',
                onPress: async() => {
                    const resultFlag = await breakCouple(coupon.userInfo.user_code, coupon.userInfo.lover_code!);
                    if(resultFlag){
                        Alert.alert('커플 끊기 완료', `${coupon.loverInfo.nickname}님과의 인연의 끈을 끊었습니다.`);
                        dispatch(breakCoupleState());
                    }else{
                        Alert.alert('커플 끊기 오류!', '잠시후 시도해 보시거나 관리자에게 문의해 주세요');
                    }
                },
                style: 'destructive',
              },
            ],
            {
              cancelable: true,
              onDismiss: () => {},
            },
        );

    }
    const customInputStyle = [styles.input, !isValid && styles.noValid]
    return (
        //커플정보관리(커플 정보(기념일 수정 + 상대방 정보), 커플 끊기)
        <KeyboardAwareScrollView
                keyboardShouldPersistTaps='always'
                showsHorizontalScrollIndicator={false}
            >
            <View style={styles.screen}>
                <Text style={styles.title}>연인 정보</Text>
                <View style={styles.loverInfoContainer}>
                    <View style={styles.circle}>
                        <Text style={styles.textTitle}>✨ 닉네임</Text>
                        <Text style={styles.text}>{coupon.loverInfo.nickname}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <View  style={styles.circle}>
                            <Text style={styles.textTitle}>🎂 생년월일</Text>
                            <Text style={styles.text}>{coupon.loverInfo.birth}</Text>
                        </View>
                        <View style={styles.modifyContainer}>
                            <View  style={styles.circle}>
                                <Text style={styles.textTitle}>🧡 연인이 된 날짜</Text>
                                <TextInput 
                                    style={customInputStyle}
                                    maxLength={10}
                                    value={input}
                                    onChangeText={inputChangeHandler}
                                />
                            </View>
                            <Button bgcolor="skyblue" fontcolor="white" onPress={modifyHandler}>수정</Button>
                        </View>
                    </View>
                </View>
                { coupon.loverInfo.user_code && 
                    <View style={styles.buttonContainer}>
                        <Button bgcolor="red" fontcolor="#252525" onPress={breakCoupleHandler}>커플 끊기</Button>
                    </View>
                }
            </View>
        </KeyboardAwareScrollView>
    );
};

export default CoupleSettingScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    loverInfoContainer: {
        marginVertical: 8,
        flex:2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    circle: {
        backgroundColor: 'white',
        width: 150,
        height: 150,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16
    },
    textTitle:{
        fontFamily: 'godoMaum',
        fontSize: 24,
        color: '#3f3f3f'
    },
    text: {
        fontFamily: 'godoMaum',
        fontSize: 34
    },
    input: {
        fontFamily: 'godoMaum',
        fontSize: 30,
        borderWidth: 1,
        borderColor: '#ffb8e4',
        padding: 3,
        borderRadius: 12
        
    },
    title: {
        fontFamily: 'godoMaum',
        fontSize: 30,
        backgroundColor: 'white',
        textAlign: 'center',
        paddingVertical: 4,
        borderBottomColor: 'pink',
        borderBottomWidth: 4,

    },
    modifyContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    noValid: {
        backgroundColor: '#ffcccc'
    }
})