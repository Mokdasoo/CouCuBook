import { StyleSheet, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { couponState } from "../../store/redux/couponReducer";
import { RootState } from "../../store/redux/rootReducer";

const UserSettingScreen = (): JSX.Element => {
    const coupon:couponState = useSelector((state: RootState) => state.coupon);
    return (
        //회원정보관리(회원정보 수정, 회원탈퇴)
        <View style={styles.screen}>
            <View style={styles.userInfoContainer}>
                <View style={styles.container}>
                    <View style={styles.labelContainer}>
                        <Text>닉네임 : </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput value={coupon.userInfo.nickname}/>
                    </View>
                </View>
            </View>
            <View style={styles.WithdrawalButtonContainer}>

            </View>
        </View>
    );
};

export default UserSettingScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    userInfoContainer: {
        flex: 8
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        
    },
    labelContainer: {
        flex: 1
    },
    inputContainer: {
        flex: 2
    },
    WithdrawalButtonContainer: {
        flex: 2
    }
})