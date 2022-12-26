import { Text, TextInput, View, StyleSheet } from "react-native"
// import { GlobalStyles } from "../../constants/styles";

type Props = {
    label: string;
    textInputConfig: any;
    style: object;
    invalid: boolean;
}

const Input = ({label, textInputConfig, style, invalid} : Props) => {

    const inputStyles = [styles.input, invalid && styles.invalidInput];

    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput {...textInputConfig} style={inputStyles}/>
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginTop: 30 
    },
    label: {
        fontSize: 18,
        color: '#8b8b8b',
        fontWeight: 'bold',
        marginVertical: 4,
        borderColor: '#cacaca',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    input: {
        // backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 22,
        
        // color: GlobalStyles.colors.primary700
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        // color: GlobalStyles.colors.error500
    },
    invalidInput: {
        // backgroundColor: GlobalStyles.colors.error50
    }
});