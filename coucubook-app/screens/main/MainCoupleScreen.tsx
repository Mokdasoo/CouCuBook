import { Text, View } from "react-native";
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { BACKEND_ADDRESS } from "@env";

const MainCoupleScreen = () => {

    useEffect(()=>{
        const getUserInfo = async () => {
            const token = await AsyncStorage.getItem('token');
            let tokenInfo;
            try {
                const response = await axios.get(
                    `${BACKEND_ADDRESS}/auth/user`, 
                    {
                        params: {token: token}
                    },
                );
                tokenInfo = response.data; //{ id, connected_at}
            } catch (error) {
                console.log(error);
            }

            

            

        }
        getUserInfo();
    }, []);

    return(
        <View>
            <Text>MainCoupleScreen</Text>
        </View>
    )
}

export default MainCoupleScreen;