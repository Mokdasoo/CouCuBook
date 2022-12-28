import { Text, View } from "react-native";
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { BACKEND_ADDRESS } from "@env";

const MainCoupleScreen = () => {

    useEffect(()=>{
        const getUserInfo = async () => {
            const token = await AsyncStorage.getItem('token');
            const response = await axios(`${BACKEND_ADDRESS}/auth`)

        }
    }, []);

    return(
        <View>
            <Text>MainCoupleScreen</Text>
        </View>
    )
}

export default MainCoupleScreen;