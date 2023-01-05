import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import {useState} from 'react';
import CreateCoupon from "./CreateCoupon";
import { Ionicons } from '@expo/vector-icons'; 
import BookCoverRadioButton from "../../components/UI/BookCoverRadioButton";

interface inputProps {
    [anyKeyword: string]: string;
    title: string;
    publicationDate: string;
    expiredDate: string;
}
const initialData : inputProps = {
    title: '',
    publicationDate: '',
    expiredDate: ''
} 

const CreateBook = () : JSX.Element => {
    const [checked, setChecked] = useState('red');
    const [modalOpen, SetModalOpen] = useState(false);
    const [titleFocus, setTitleFocus] = useState(false);
    const [publicationDateFocus, setPublicationDateFocus] = useState(false);
    const [expiredDateFocus, setExpiredDateFocus] = useState(false);
    const [inputs, setInputs] = useState<inputProps>(initialData);
    const inputChangeHandler = (identifier: string, enteredValue: string) => {
        if(inputs[identifier].length <= enteredValue.length){
            switch (identifier) {
                case 'publicationDate':
                    if(enteredValue.length === 4 || enteredValue.length === 7) enteredValue = enteredValue + '-';
                    break;
                case 'expiredDate':
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
                    [identifier]: enteredValue.substring(0, enteredValue.length - 1)
                };
            });
            return;
        }
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [identifier]: enteredValue
            };
        });
    }
    const inputsCheckValidHandler = () => {
        
    }
    const openCouponScreenHandler = () => {
        SetModalOpen(!modalOpen);
    }
    const saveCouponHandler = () => {
        SetModalOpen(!modalOpen);
    }
    const customTitleInputStyle = [styles.input, titleFocus && styles.focusInput]
    const customPublicationDateInputStyle = [styles.input, publicationDateFocus && styles.focusInput]
    const customExpiredDateInputStyle = [styles.input, expiredDateFocus && styles.focusInput]

    return (
        <ScrollView contentContainerStyle={styles.screen}>
            <View style={styles.coverSelect}>
                <Text style={styles.inputText}>쿠폰북 표지 색상 선택</Text>
                <View style={styles.radioButtonContainer}>
                    <BookCoverRadioButton color="red" checked={checked} setChecked={setChecked} />
                    <BookCoverRadioButton color="blue" checked={checked} setChecked={setChecked} />
                    <BookCoverRadioButton color="green" checked={checked} setChecked={setChecked} />
                    <BookCoverRadioButton color="pink" checked={checked} setChecked={setChecked} />
                    <BookCoverRadioButton color="purple" checked={checked} setChecked={setChecked} />
                    <BookCoverRadioButton color="gold" checked={checked} setChecked={setChecked} />
                </View>
            </View>

            <Text style={styles.inputText}>쿠폰북 이름</Text>
            <TextInput  
                style={customTitleInputStyle} 
                onFocus={()=>{setTitleFocus(true);}} 
                onBlur={()=>{setTitleFocus(false);}}
                placeholder= '(ex. 무슨무슨기념일 기념 쿠폰북)'
                onChangeText= {inputChangeHandler.bind(this, 'title')}
                value= {inputs.title}
            />


            <Text style={styles.inputText}>발행일자</Text>
            <TextInput  
                style={customPublicationDateInputStyle} 
                onFocus={()=>{setPublicationDateFocus(true);}} 
                onBlur={()=>{setPublicationDateFocus(false);}}
                placeholder= 'YYYY-MM-DD형식'
                maxLength= {10}
                onChangeText= {inputChangeHandler.bind(this, 'publicationDate')}
                value= {inputs.publicationDate}
                keyboardType= 'numeric'
            />
            <Text style={styles.inputText}>만료일자</Text>
            <TextInput  
                style={customExpiredDateInputStyle} 
                onFocus={()=>{setExpiredDateFocus(true);}} 
                onBlur={()=>{setExpiredDateFocus(false);}}
                placeholder= 'YYYY-MM-DD형식'
                maxLength= {10}
                onChangeText= {inputChangeHandler.bind(this, 'expiredDate')}
                value= {inputs.expiredDate}
                keyboardType= 'numeric'
            />
            <Pressable onPress={openCouponScreenHandler} style={({pressed}) => [styles.addCouponButtonContainer, pressed && styles.pressed]} >
                <Text style={styles.addCouponText}>쿠폰 추가</Text>
                <Ionicons name="add-circle" size={80} color="#00000055" />
            </Pressable>
            <Modal
                presentationStyle="formSheet"
                animationType="slide"
                visible={modalOpen}
                >
                <CreateCoupon onSave={saveCouponHandler}/>
            </Modal>
            
            <Text>쿠폰목록</Text>
        </ScrollView>
    )
}

export default CreateBook;

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center'
    },
    coverSelect: {
        width: '100%',
        alignItems: 'center',
    },
    radioButtonContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent:'space-evenly',
        marginVertical: 12
    },
    addCouponButtonContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressed: {
        opacity: 0.75
    },
    addCouponText: {
        fontFamily: 'godoMaum',
        fontSize: 30
    },
    inputText: {
        fontFamily: 'godoMaum',
        fontSize: 24,
        textAlign: 'center'
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
    }
})