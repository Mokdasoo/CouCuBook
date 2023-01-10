import { StyleSheet, View} from "react-native";
import React from 'react';

import LoverCodeScreen from "./LoverCodeScreen";
import CoupleImage from "./CoupleImage";
import { couponState } from "../../store/redux/couponReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootReducer";




const MainCoupleScreen = () => {
    const coupon:couponState = useSelector((state: RootState) => state.coupon);
    
    return(
        <>
            { coupon.loverInfo.lover_code !== coupon.userInfo.user_code && 
                <View style={styles.screen}>
                    <LoverCodeScreen 
                        nickname={coupon.userInfo?.nickname} 
                        userCode={coupon.userInfo?.user_code}
                    />
                </View>
            }
            { coupon.loverInfo.lover_code === coupon.userInfo.user_code  && 
                <View style={styles.rootScreen}>
                    <CoupleImage 
                    userInfo={coupon.userInfo}
                    loverInfo={coupon.loverInfo}
                    />
                </View>
            }
        </>
    )
}

export default MainCoupleScreen;

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    screen: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#e3d5ca',
    },
    

});