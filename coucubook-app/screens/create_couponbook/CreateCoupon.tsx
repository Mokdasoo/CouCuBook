import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import CouponComponent from "../../components/CoupleItem/CouponComponent";
import Button from "../../components/UI/Button";
import {useState} from 'react';
import ColorPickRadioButton from "../../components/UI/ColorPickRadioButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface CreateCouponProps {
    onSave: ()=>void;
    onCancel: () => void;
}
interface inputProps {
    [anyKeyword: string]: string;
    title: string;
    content: string;
}
const initialData : inputProps = {
    title: '',
    content: '',
} 
const CreateCoupon = ({onSave, onCancel}: CreateCouponProps) : JSX.Element => {
    const [inputs, setInputs] = useState(initialData);

    const [titleFocus, setTitleFocus] = useState(false);
    const [contentFocus, setContentFocus] = useState(false);
    const [checked, setChecked] = useState('#ffb6b6');
    const customTitleInputStyle = [styles.input, titleFocus && styles.focusInput];
    const customContentInputStyle = [styles.input, contentFocus && styles.focusInput];
    const inputChangeHandler = (identifier: string, enteredValue: string) => {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [identifier]: enteredValue
            };
        });
    }

    return (
        <KeyboardAwareScrollView
                keyboardShouldPersistTaps='always'
                showsHorizontalScrollIndicator={false}
        >
        <ScrollView contentContainerStyle={styles.screen}>
            <CouponComponent bgcolor={checked} title={inputs.title} content={inputs.content}/>
            <View style={styles.inputForm}>
                <View style={styles.colorSelect}>
                    <Text style={styles.inputText}>쿠폰 색상 선택</Text>
                    <View style={styles.radioButtonContainer}>
                        <ColorPickRadioButton color="#ffb6b6" checked={checked} setChecked={setChecked} />
                        <ColorPickRadioButton color="#ceceff" checked={checked} setChecked={setChecked} />
                        <ColorPickRadioButton color="#c6ffc6" checked={checked} setChecked={setChecked} />
                        <ColorPickRadioButton color="#ffd7de" checked={checked} setChecked={setChecked} />
                        <ColorPickRadioButton color="#ffd0ff" checked={checked} setChecked={setChecked} />
                        <ColorPickRadioButton color="#fff7c8" checked={checked} setChecked={setChecked} />
                        <ColorPickRadioButton color="#dddddd" checked={checked} setChecked={setChecked} />
                    </View>
                </View>
                <View>
                    <Text>쿠폰 이미지</Text>
                </View>
                <Text style={styles.inputText}>쿠폰 이름</Text>
                <TextInput  
                    style={customTitleInputStyle} 
                    onFocus={()=>{setTitleFocus(true);}} 
                    onBlur={()=>{setTitleFocus(false);}}
                    placeholder= '(ex. 땡땡 해주기 쿠폰 등)'
                    onChangeText= {inputChangeHandler.bind(this, 'title')}
                    value= {inputs.title}
                    maxLength={25}
                />
                <Text style={styles.inputText}>쿠폰 설명</Text>
                <TextInput  
                    style={customContentInputStyle} 
                    onFocus={()=>{setContentFocus(true);}} 
                    onBlur={()=>{setContentFocus(false);}}
                    onChangeText= {inputChangeHandler.bind(this, 'content')}
                    value= {inputs.content}
                    maxLength={40}
                />
                <View style={styles.buttonContainer}>
                    <Button bgcolor='#ff5b5b' fontcolor='white' onPress={onCancel}>취소</Button>
                    <Button bgcolor='#60c960' fontcolor='white' onPress={onSave}>저장</Button>
                </View>
            </View>
        </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default CreateCoupon;

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center'
    },
    inputForm: {
        alignItems: 'center',
        width: '100%'
    },
    inputText: {
        fontFamily: 'godoMaum',
        fontSize: 24,
        textAlign: 'center'
    },
    colorSelect: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 4
    },
    radioButtonContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent:'space-evenly',
        marginVertical: 12
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    input: {
        padding: 8,
        borderRadius: 8,
        fontSize: 26,
        backgroundColor: 'white',
        width: '90%',
        textAlign: 'center',
        fontFamily: 'godoMaum',
        marginVertical: 6,
        borderColor: 'black',
        borderWidth: 2,
    },
    focusInput: {
        backgroundColor: '#ffffeb'
    },
});