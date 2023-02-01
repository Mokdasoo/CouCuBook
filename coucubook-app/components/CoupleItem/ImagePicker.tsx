import { Alert, Image, StyleSheet, Text, View, Pressable } from "react-native";
import * as expoImagePicker from 'expo-image-picker';
import { useState } from "react";

import {Ionicons} from '@expo/vector-icons';
// import OutlinedButton from "../UI/OutlinedButton";

interface ImagePickerProps {
  imagePickHandler: (imgUri: string) => void;
}

const ImagePicker = ({imagePickHandler} : ImagePickerProps) : JSX.Element => {
  
  const [MediaLibraryPermissionResponse, requestPermission] = expoImagePicker.useMediaLibraryPermissions();

  /** 권한 확인 함수 */
  const verifyPermissions = async () => {
    console.log(MediaLibraryPermissionResponse);
    if (MediaLibraryPermissionResponse!.status === expoImagePicker.PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (MediaLibraryPermissionResponse!.status === expoImagePicker.PermissionStatus.DENIED) {
      if(MediaLibraryPermissionResponse?.canAskAgain === true){
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
      }
      Alert.alert(
        "권한 거절 하셨습니다.",
        "앱설정 -> 커쿠북앱 권한 설정에서 사진, 미디어 파일에 대한 권한을 허용으로 바꾸고 재시도 해주세요.\ni) 권한을 허용했는데 안되신다면 앱을 껐다 다시 켜주세요."
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await expoImagePicker.launchImageLibraryAsync({
      mediaTypes: expoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16], //android만 적용 아이폰은 무조건 1:1
      quality: 0.3,
    });
    if(image.canceled){
      return;
    }
    console.log(image.assets);
    imagePickHandler(image.assets[0].uri);
  };

  return (
    <View style={styles.buttonContainer}>
        <Pressable onPress={takeImageHandler} style={({pressed}) =>  [styles.buttonWrap, pressed && styles.pressed]}>
            <View>
                <Ionicons name='images' color='#000000c7' size={24} />
            </View>
        </Pressable>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
    
    buttonContainer: {
      width: '100%',
      alignItems: 'flex-end'
    },
    buttonWrap: {
        width: 60,
        height: 60,
        backgroundColor: '#0000001e',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },
    pressed: {
        backgroundColor: '#00000096'
    }
});
