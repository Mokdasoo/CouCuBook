import { Alert, FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import {useEffect, useState} from 'react';
import CreateCoupon from "./CreateCoupon";
import { Ionicons } from '@expo/vector-icons'; 
import BookCoverRadioButton from "../../components/UI/BookCoverRadioButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from '../../components/UI/Button';
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CreateCouponBookStackParamList } from "../../App";
import { couponState, deleteCoupon, resetCoupon, saveCoupon, saveCouponBook } from "../../store/redux/couponReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootReducer";
import { CouponBook } from "../../src/types/coupon";
import { generateRandomString } from "../../util/usefulFunc";
import CouponComponent from "../../components/CoupleItem/CouponComponent";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { deleteCouponBookDB, deleteCouponDB, fetchCoupons, insertCouponBooks, insertCoupons, insertGift } from "../../util/database";

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
export type CreateBookScreenProps = NativeStackScreenProps<CreateCouponBookStackParamList, 'CreateBook'>;
const CreateBook = ({route}: CreateBookScreenProps) : JSX.Element => {
    const couponbook = route.params?.couponBook;
    const coupon:couponState = useSelector((state: RootState) => state.coupon);
    const dispatch = useDispatch();
    const navigation = useNavigation<CreateBookScreenProps["navigation"]>();
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
    const dateCheckValid = (publicDate: string, expiredDate: string) => {
        const regexp = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
        if(!regexp.test(publicDate) || !regexp.test(expiredDate)){
            Alert.alert('날짜 오류!', '날짜 형식 or 실제 날짜에 맞게 다시 입력해주세요');
            return false;
        }
        const publicNewDate = new Date(publicDate);
        const expiredNewDate = new Date(expiredDate);
        if(publicNewDate > expiredNewDate){
            Alert.alert('날짜 오류!', '만료일자를 발행일자보다 크게 설정해 주세요');
            return false;
        }
        return true;
    }
    const openCouponScreenHandler = () => {
        SetModalOpen(!modalOpen);
    }
    const cancelCouponScreenHandler= () => {
        SetModalOpen(!modalOpen);
    }
    const saveCouponHandler = () => {
        SetModalOpen(!modalOpen);
    }
    const customTitleInputStyle = [styles.input, titleFocus && styles.focusInput]
    const customPublicationDateInputStyle = [styles.input, publicationDateFocus && styles.focusInput]
    const customExpiredDateInputStyle = [styles.input, expiredDateFocus && styles.focusInput]
    
    const goBackHandler = () => {
        dispatch(resetCoupon());
        navigation.replace('BooksList');
    }
    const saveCouponBookHandler = async () => {

        //입력값 체크
        if(inputs.title.trim().length === 0 || inputs.publicationDate.trim().length === 0 || inputs.expiredDate.trim().length === 0) {
            Alert.alert('입력값 오류', '입력값을 확인해주세요');
            return;
        }
        if(!dateCheckValid(inputs.publicationDate, inputs.expiredDate)){
            return;
        }
        
       
        //sql 쿠폰북 업데이트
        const newBook:CouponBook = {
            id: couponbook ? couponbook.id : undefined,
            title: inputs.title,
            publicationDate: inputs.publicationDate,
            expiredDate: inputs.expiredDate,
            cover_color: checked,
            coupons: coupon.createdCoupons
        };
        
        const response = await insertCouponBooks(newBook);
        
        const couponsArray = [...coupon.createdCoupons];
        dispatch(resetCoupon());
        const bookId = response.insertId; //bookId 있으면 쿠폰북새로저장, 없으면 업데이트
        if(bookId){
            await insertGift(bookId);
        }
        couponsArray.map(async (coupon) => {
            if(bookId){
                const res = await insertCoupons({...coupon, book_id: bookId});
            }else{
                if(typeof coupon.id === 'string'){//수정으로 새로만든 쿠폰
                    const res = await insertCoupons({...coupon, book_id: couponbook!.id});
                }
            }
            
        });
        
        navigation.replace('BooksList');
    }
    const deleteCouponBookHandler = async (couponBookId: number) => {
        await deleteCouponBookDB(couponBookId);
        dispatch(resetCoupon());
        navigation.replace('BooksList');
    }

    useEffect(() => {
        dispatch(resetCoupon());
        if(couponbook){
            setInputs({
                title: couponbook.title,
                publicationDate: couponbook.publicationDate,
                expiredDate: couponbook.expiredDate,
            });
            setChecked(couponbook.cover_color);
            couponbook.coupons.forEach(coupon => {
                dispatch(saveCoupon(coupon));
            });
        }
    }, [couponbook]);
    const deleteCouponHandler = async (id:number | string) => {
        if(typeof id === 'number'){
            //sql 삭제 
            await deleteCouponDB(id);
        }
        dispatch(deleteCoupon(id));
        
    }
    return (
        <KeyboardAwareScrollView
                keyboardShouldPersistTaps='always'
                showsHorizontalScrollIndicator={false}
        >
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
                    <CreateCoupon onSave={saveCouponHandler} onCancel={cancelCouponScreenHandler}/>
                </Modal>
                
                <Text>쿠폰목록</Text>
                <FlatList 
                    data={coupon.createdCoupons}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <View style={{alignItems: 'center'}}>
                            <Pressable 
                                onPress={deleteCouponHandler.bind(this,item.id)} 
                                style={({pressed}) => [{position: 'absolute', top: 10, right: 10, zIndex: 2}, pressed && styles.pressed]}
                            >
                                <MaterialCommunityIcons name="close-circle" size={30} color="#000000" />
                            </Pressable>
                            <CouponComponent
                                bgcolor={item.paper_color} 
                                title={item.title} 
                                content={item.content} 
                                selectedImage={item.image}
                            />
                        </View>
                    )}
                    horizontal={true}
                    style={{
                        height: '100%'
                    }}
                    
                />
                <View style={styles.buttonContainer}>
                    <Button bgcolor='#ff5b5b' fontcolor='white' onPress={goBackHandler}>취소</Button>
                    <Button bgcolor='#60c960' fontcolor='white' onPress={saveCouponBookHandler}>저장</Button>
                </View>
                {couponbook && 
                    <View style={styles.buttonContainer}>
                        <Button bgcolor='red' fontcolor='black' onPress={deleteCouponBookHandler.bind(this, couponbook.id!)}>⚠쿠폰북 삭제</Button>
                    </View>
                }
            </ScrollView>
        </KeyboardAwareScrollView>
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
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})