import { Alert, StyleSheet, View} from "react-native";
import Input from "../UI/Input";
import IconButton from "../UI/IconButton";

interface DatePickInputProps {
    identifier: { id: string; label: string; placeholder: string; }
    date : {
        value: string;
        isValid: boolean;
    };
    inputChangeHandler: (inputIdentifier: string, enteredValue: string) => void;
    inputCheckValid: (inputIdentifier: string) => void;
}


const DatePickInput = ({identifier, date, inputChangeHandler, inputCheckValid} : DatePickInputProps) : JSX.Element => {
    const dateCheckHandler = () => {
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
        inputCheckValid.bind(this, identifier.id)();
    }
    return (
            <View style={styles.inputContainer}>
                <Input 
                    style={styles.rowInput}
                    label={identifier.label}
                    textInputConfig={{
                        placeholder: identifier.placeholder,
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, identifier.id),
                        value: date.value,
                        textAlign: 'center',
                        editable: date.isValid ? false : true,
                        keyboardType: 'numeric'
                    }}
                    invalid={true}
                />
                <IconButton 
                    icon={date.isValid ? 'checkmark-circle' : 'chevron-forward-circle-outline'} 
                    color={date.isValid ? '#7ae582' : 'black'}
                    size={40} 
                    onPress={dateCheckHandler} 
                />
            </View>
    );
};

export default DatePickInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowInput: {
        alignItems: 'center',
    },
});