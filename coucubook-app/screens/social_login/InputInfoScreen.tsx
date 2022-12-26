import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import DatePickInput from "../../components/IntroAndLogin/DatePickInput";
import IconButton from "../../components/UI/IconButton";
import Input from "../../components/UI/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../../components/UI/Button";
import axios from "axios";
import { BACKEND_ADDRESS } from "@env";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../App";

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
    anniversary: {
        value: string;
        isValid: boolean;
    }
}
const initialInputState = {
    nickname: {
        value: '',
        isValid: false
    },
    birth: {
        value: '',
        isValid: false
    },
    anniversary: {
        value: '',
        isValid: false
    }
}
export type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const InputInfoScreen = ({navigation, route}: RegisterScreenProps):JSX.Element => {
    const [inputs, setInputs] = useState<InputObj>(initialInputState);

    const inputChangeHandler = (inputIdentifier :string, enteredValue: string) => {
        
        if(inputs[inputIdentifier].value.length <= enteredValue.length){
            switch (inputIdentifier) {
                case 'birth':
                    if(enteredValue.length === 4 || enteredValue.length === 7) enteredValue = enteredValue + '-';
                    break;
                case 'anniversary':
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

    const submitHandler = async () => {
        const response = await axios({
            method: 'POST',
            url: BACKEND_ADDRESS,
            data: {

            }
        })
    }

    const returnHandler = () => {
        setInputs(initialInputState);
    }


    return (
        <ImageBackground style={styles.screen} source={require('../../assets/Images/sketch.png')}>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps='always'
                showsHorizontalScrollIndicator={false}

            >
                <View style={styles.inputsContainer}>
                    <ImageBackground 
                        resizeMode="stretch"
                        style={styles.inputContainer} 
                        source={require('../../assets/Images/scketchbg.png')} 
                    >
                        <Input 
                            style={styles.rowInput}
                            label='닉네임'
                            textInputConfig={{
                                placeholder: '애칭을 입력해주세요',
                                maxLength: 10,
                                onChangeText: inputChangeHandler.bind(this, 'nickname'),
                                value: inputs.nickname.value,
                                textAlign: 'center',
                                editable: inputs.nickname.isValid ? false : true,
                            }}
                            invalid={true}
                        />
                        <IconButton 
                            icon={inputs.nickname.isValid ? 'checkmark-circle' : 'chevron-forward-circle-outline'} 
                            color={inputs.nickname.isValid ? '#7ae582' : 'black'}
                            size={40} 
                            onPress={inputCheckValid.bind(this, 'nickname')} 
                        />
                    </ImageBackground>

                    {
                        inputs.nickname.isValid &&
                            <ImageBackground 
                                resizeMode="stretch"
                                style={styles.inputContainer} 
                                source={require('../../assets/Images/scketchbg.png')} 
                            >   
                                <DatePickInput 
                                    identifier={{
                                        id: 'birth',
                                        label: '생년월일',
                                        placeholder: 'YYYY-MM-DD 형식'
                                    }} 
                                    date={inputs.birth} 
                                    inputChangeHandler={inputChangeHandler}  
                                    inputCheckValid={inputCheckValid}
                                />
                            </ImageBackground>
                    }

                    {
                        ( inputs.nickname.isValid && inputs.birth.isValid )&&
                            <ImageBackground 
                                resizeMode="stretch"
                                style={styles.inputContainer} 
                                source={require('../../assets/Images/scketchbg.png')} 
                            >   
                                <DatePickInput 
                                    identifier={{
                                        id: 'anniversary',
                                        label: '연인과 사귄 날짜',
                                        placeholder: 'YYYY-MM-DD 형식'
                                    }} 
                                    date={inputs.anniversary} 
                                    inputChangeHandler={inputChangeHandler}  
                                    inputCheckValid={inputCheckValid}
                                />
                            </ImageBackground>
                    }
                    {
                        inputs.anniversary.isValid &&
                            <Button bgcolor="#77bfa3" fontcolor="white" onPress={submitHandler} >확인</Button>
                    }
                    <Button bgcolor="#e63946" fontcolor="white" onPress={returnHandler} >재입력</Button>
                </View>
                
            </KeyboardAwareScrollView>
            
        </ImageBackground>
    );
};

export default InputInfoScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
        
    },
    container: {
        justifyContent: 'center'
    },
    inputsContainer: {
        flex: 1,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 24
    },
    inputContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fdfde6ae',
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginVertical: 8,
    },
    rowInput: {
        alignItems: 'center',
        
    },
});