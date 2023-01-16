import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DatePickInput from "../../components/IntroAndLogin/DatePickInput";
import Input from "../../components/UI/Input";
import { couponState, updateUserInfo } from "../../store/redux/couponReducer";
import { RootState } from "../../store/redux/rootReducer";
import { useState } from "react";
import Button from "../../components/UI/Button";
import { userInfoUpdate, userWithdrawal } from "../../util/backendRESTAPI";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { logout } from "../../store/redux/authReducer";
type InputObj = {
    [anyKeyword: string]: {
        value:string;
        isValid: boolean;
    };
    nickname: {
        value: string;
        isValid: boolean;
    },
    birth: {
        value: string;
        isValid: boolean;
    },
}

const UserSettingScreen = (): JSX.Element => {
    const coupon:couponState = useSelector((state: RootState) => state.coupon);
    const dispatch = useDispatch();
    const initialInputState = {
        nickname: {
            value: coupon.userInfo.nickname,
            isValid: true
        },
        birth: {
            value: coupon.userInfo.birth,
            isValid: true
        },
    }
    const [inputs, setInputs] = useState<InputObj>(initialInputState);
    const saveHandler = async() => {
        inputCheckValid('nickname');
        dateCheckHandler(inputs.birth);
        if(inputs.nickname.isValid && inputs.birth.isValid){
            const result = await userInfoUpdate(coupon.userInfo.id, inputs.nickname.value, inputs.birth.value);
            if(result === 'success'){
                dispatch(updateUserInfo(inputs.nickname.value, inputs.birth.value));
                Alert.alert('수정 완료', '회원정보를 수정을 했습니다 :)')
            }else{
                Alert.alert('수정 실패', '회원정보 수정을 실패했습니다. 잠시후 다시 시도해주세요 :(')
            }
        }else{
            Alert.alert('수정 오류', '값을 알맞게 입력해 주세요')
        }
    }
    const withdrawHandler = () => {
        Alert.alert(
            '회원 탈퇴',
            '탈퇴하시겠습니까? 모든 내용이 삭제됩니다.',
            [
              {text: '취소', onPress: () => {}, style: 'cancel'},
              {
                text: '탈퇴하기',
                onPress: async() => {
                    const resultFlag = await userWithdrawal(coupon.userInfo.id, coupon.userInfo.user_code);
                    if(resultFlag){
                        Alert.alert('탈퇴 완료!', '서비스를 이용해 주셔서 감사합니다');
                        dispatch(logout());
                    }else{
                        Alert.alert('탈퇴 오류!', '잠시후 시도해 보시거나 관리자에게 문의해 주세요');
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

    const inputChangeHandler = (inputIdentifier :string, enteredValue: string) => {
        
        if(inputs[inputIdentifier].value.length <= enteredValue.length){
            switch (inputIdentifier) {
                case 'birth':
                    if(enteredValue.length === 4 || enteredValue.length === 7) enteredValue = enteredValue + '-';
                    break;
                default:
                    break;
            }
        }
        if(enteredValue.slice(-2) === '--') { // "-" 중복입력 제어
            setInputs((curInputs) => {
                return {
                    ...curInputs,
                    [inputIdentifier]: { value: enteredValue.substring(0, enteredValue.length - 1), isValid: enteredValue ? curInputs[inputIdentifier].isValid : false }
                };
            });
            return;
        }
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: { value: enteredValue, isValid: enteredValue ? curInputs[inputIdentifier].isValid : false }
            };
        });
    }
    const inputCheckValid = (inputIdentifier :string) => {
        if(inputs[inputIdentifier].value.trim().length !== 0){
            setInputs((curInputs) => {
                return {
                    ...curInputs,
                    [inputIdentifier]: { value: curInputs[inputIdentifier].value, isValid: true }
                };
            });
        }
    }
    const dateCheckHandler = (date: {
        value: string;
        isValid: boolean;
    }) => {
        const target = date.value;
        const regexp = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
        if(!regexp.test(target)){
            Alert.alert('날짜 오류!', '날짜 형식 or 실제 날짜에 맞게 다시 입력해주세요');
            return;
        }
        const targetDate = new Date(target);
        const now = new Date(Date.now());
        if(targetDate > now){
            Alert.alert('날짜 오류!', '미래의 시간으로는 설정할 수 없습니다!');
            return;
        }
        inputCheckValid('birth');
    }
    return (
        //회원정보관리(회원정보 수정, 회원탈퇴)
        <View style={styles.screen}>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps='always'
                showsHorizontalScrollIndicator={false}

            >
            <Text style={styles.title}>📝 회원 정보 관리</Text>
            <View style={styles.userInfoContainer}>
                <Input 
                    style={styles.container}
                    label='닉네임'
                    textInputConfig={{
                        placeholder: '새로운 닉네임을 입력해주세요',
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'nickname'),
                        value: inputs.nickname.value,
                        textAlign: 'center',
                        editable: true,
                    }}
                    invalid={true}
                />
                <Input 
                    style={styles.container}
                    label='생년월일'
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD 형식으로 입력해주세요',
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'birth'),
                        value: inputs.birth.value,
                        textAlign: 'center',
                        editable: true,
                        keyboardType: 'numeric'
                    }}
                    invalid={true}
                />
            </View>
            <View style={styles.WithdrawalButtonContainer}>
                <Button bgcolor="#b5b5ff" fontcolor="#222222" onPress={saveHandler}>변경 내용 저장</Button>
                <Button bgcolor="red" fontcolor="#252525" onPress={withdrawHandler}>회원 탈퇴</Button>
            </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default UserSettingScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    userInfoContainer: {
        flex: 2
    },
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 12,
        marginHorizontal: 24,
        borderRadius: 12
    },
    WithdrawalButtonContainer: {
        flex: 1
    },
    title: {
        fontFamily: 'godoMaum',
        fontSize: 30,
        backgroundColor: 'white',
        textAlign: 'center',
        paddingVertical: 4,
        borderBottomColor: 'skyblue',
        borderBottomWidth: 4,

    }
})