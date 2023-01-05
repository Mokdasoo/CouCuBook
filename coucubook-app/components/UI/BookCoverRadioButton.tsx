import { RadioButton } from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

interface Props {
    color: string;
    checked: string;
    setChecked: React.Dispatch<React.SetStateAction<string>>
}
const BookCoverRadioButton = ({color, checked, setChecked}: Props) : JSX.Element => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name='book' color={color} size={30} />
            <RadioButton
                value={color}
                status={ checked === color ? 'checked' : 'unchecked' }
                onPress={() => setChecked(color)}
            />
        </View>
    );
};

export default BookCoverRadioButton;

const styles = StyleSheet.create({
    
    container:{
        alignItems: 'center'
    },
    
})