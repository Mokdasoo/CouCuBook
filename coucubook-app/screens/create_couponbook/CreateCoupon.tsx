import { Button, StyleSheet, Text, View } from "react-native";

interface CreateCouponProps {
    onSave: ()=>void;
}
const CreateCoupon = ({onSave}: CreateCouponProps) : JSX.Element => {
    return (
        <View style={styles.screen}>
            <Button title="저장" onPress={onSave}/>
        </View>
    );
};

export default CreateCoupon;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});