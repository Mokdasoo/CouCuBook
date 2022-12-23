import { useState } from "react";
import { ImageBackground, Text, StyleSheet, ScrollView, View } from "react-native";
import IconButton from "../../components/UI/IconButton";
import Input from "../../components/UI/Input";

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

const InputInfoScreen = ():JSX.Element => {
    const [inputs, setInputs] = useState<InputObj>({
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
    });

    const inputChangeHandler = (inputIdentifier :string, enteredValue: string) => {
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


    return (
        <ImageBackground style={styles.screen} source={require('../../assets/Images/sketch.png')}>
            <ScrollView>
                <View style={styles.inputContainer}>
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
                        color={inputs.nickname.isValid ? 'green' : 'black'}
                        size={40} 
                        onPress={inputCheckValid.bind(this, 'nickname')} 
                    />
                </View>
            </ScrollView>
            
        </ImageBackground>
    );
};

export default InputInfoScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center'
        
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowInput: {
        alignItems: 'center',
    },
});