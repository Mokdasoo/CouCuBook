import { userInfo } from "../../src/types/vari";
import { StyleSheet, Text, View, ImageBackground, Pressable } from "react-native";
import React, {useEffect, useState} from 'react';
import ImagePicker from "../../components/CoupleItem/ImagePicker";
import { imageUpload } from "../../util/backendRESTAPI";

interface CoupleImageProps {
    userInfo: userInfo;
    loverInfo: userInfo;
}

const CoupleImage = ({userInfo, loverInfo} : CoupleImageProps) : JSX.Element => {
    const [pickedImage, setPickedImage] = useState<string | null>(userInfo.couple_image);
    const imagePickHandler = async (imgUri : string) => {
        setPickedImage(imgUri);// 로컬 이미지 저장 -> 앱 리로드 하면 디비저장된걸로 업데이트 되니 여기서 굳이 다시 userInfo 최신화 불필요
        await imageUpload(imgUri, userInfo.user_code, loverInfo.user_code); // 디비 저장
    }

    const dDayCalc = (date: string) => {
        const nowDate = new Date();
        const year = nowDate.getFullYear();
        const month = ("0" + (1 + nowDate.getMonth())).slice(-2);
        const day = ("0" + nowDate.getDate()).slice(-2);
        const nowTime = new Date(year + "-" + month + "-" + day);
        const Ddate = new Date(date);
        
        return (nowTime.getTime() - Ddate.getTime())/1000/60/60/24 + 1;
    }

    return (
        <View style={styles.rootScreen}>
            <ImageBackground 
                style={styles.coupleImg} 
                source={
                    !!pickedImage ? 
                    {uri: pickedImage} : 
                    require('../../assets/Images/couple_default_img.jpg')
                } 
                resizeMode='cover'
            >
                <View style={styles.coupleInfoContainer}>
                    <View>
                        <Text style={styles.textTitle}>디데이</Text>
                        <Text style={styles.textTitle}>{dDayCalc(userInfo.anniversary)}일</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={[styles.textContent, styles.leftNick]}>{userInfo.nickname}</Text>
                        <Text style={[styles.textContent, styles.centerHeart]}>❤️</Text>
                        <Text style={[styles.textContent, styles.rightNick]}>{loverInfo.nickname}</Text>
                    </View>
                </View>
                <ImagePicker imagePickHandler={imagePickHandler} />
            </ImageBackground>
        </View>
    );
};

export default CoupleImage;

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    coupleImg: {
        justifyContent: 'space-between',
        flex: 1,
        width: '100%',
        height: '100%',
    },
    coupleInfoContainer: {
        
        alignItems: 'center',
        // backgroundColor: '#00000059',
        // borderRadius: 20,
        // marginHorizontal: 20
    },
    textTitle: {
        textAlign: 'center',
        fontFamily: 'godoMaum',
        fontSize: 30,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 4
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    textContent : {
        fontFamily: 'godoMaum',
        fontSize: 25,
        color: 'white',
        paddingVertical: 8,
        paddingHorizontal: 3,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 4
    },
    leftNick: {
        flex: 4,
        textAlign: 'right',
    },
    rightNick: {
        flex: 4,
        textAlign: 'left',
    },
    centerHeart:{
        flex: 1,
        textAlign: 'center',
    },
    

});