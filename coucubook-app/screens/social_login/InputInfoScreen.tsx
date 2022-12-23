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

const InputInfoScreen = () => {
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
                [inputIdentifier]: { value: enteredValue, isValid: false }
            };
        });
    }
    const inputCheckValid = (inputIdentifier :string) => {
        if(+inputs[inputIdentifier].value.trim() !== 0){
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
                        label='닉네임을 입력해주세요'
                        textInputConfig={{
                            placeholder: '닉네임입력',
                            maxLength: 10,
                            onChangeText: inputChangeHandler.bind(this, 'nickname'),
                            value: inputs.nickname.value
                        }}
                        invalid={true}
                    />
                    <IconButton 
                        icon='checkmark-circle-outline' 
                        color={inputs.nickname.isValid ? 'green' : 'black'}
                        size={30} 
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowInput: {
        alignItems: 'center',
        marginRight: 30
    }
});