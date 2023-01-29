import {useEffect} from 'react';
import { authenticate, authState, logout } from './store/redux/authReducer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/redux/rootReducer';
import { tokenRenewal, viewTokenInfo } from './util/kakaoRESTAPI';
import { getAppleAuthToRefreshToken } from './util/appleRESTAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './AuthStack';
import AuthenticatedTab from './AuthenticatedTab';


interface RootProps {
    appReady: boolean;
    onAuthLoad: ()=>void;
  }
  const Root = ({appReady, onAuthLoad}: RootProps):JSX.Element => {
    const auth:authState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    
  
    /**토큰 만료 다가오거나 만료 됐을 때 리프레시토큰으로 토큰 재발급 후 저장 */
    const getAccessTokenWithRefreshToken = async (refreshToken:string, platform: string) => {
      let newToken: string | {access_token: string, social_id: string};
      if(platform === 'kakao'){
        newToken = await tokenRenewal(refreshToken);
      }else{ // apple
        newToken = await getAppleAuthToRefreshToken(refreshToken);
      }
      if(newToken === 'refresh token expired'){
        dispatch(logout());
        return;
      }
      if( typeof newToken === 'string'){
        let tokenInfo : tokenInfo = await viewTokenInfo(newToken);
        dispatch(authenticate(newToken, refreshToken, tokenInfo.id, platform));
      }else{
        dispatch(authenticate(newToken.access_token, refreshToken, newToken.social_id, platform));
      }
    };
  
  
    /** 토큰 만료 판단후 이상없으면 저장 */
    type tokenInfo = {
      id: string;
      expires_in: number;
    }
    const getTokenInfo = async(token: string, refreshToken: string, platform: string) => {
      try {
        //refreshToken 만료전
        let tokenInfo : tokenInfo = await viewTokenInfo(token);
        if(tokenInfo.expires_in > 3600 && tokenInfo.id !== ''){ // 엑세스 토큰 정상
          dispatch(authenticate(token, refreshToken, tokenInfo.id, platform));
        }else {// 엑세스 토큰 만료
            await getAccessTokenWithRefreshToken(refreshToken, platform);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    
    useEffect(() => {
      const fetchToken = async () => {
        try {
          const storedToken = await AsyncStorage.getItem('token');
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          const platform = await AsyncStorage.getItem('platform');
          console.log("token: ",storedToken, "refresh: ", refreshToken, "platform: ", platform );
      
      
          //토큰 정보 가져와서 만료시간체크하고 만료됐으면 리프레시토큰으로 재발급 리프레시토큰도 만료됐으면 토큰없음
      
          if(platform==='kakao' && storedToken && refreshToken){
            await getTokenInfo(storedToken, refreshToken, platform);
          }else if(platform==='apple' && storedToken && refreshToken){
            await getAccessTokenWithRefreshToken(refreshToken, platform);
          }
        } catch (error) {
          console.log('token fetch error');
        }finally{
          await new Promise(resolve => setTimeout(resolve, 1000));
          onAuthLoad();
        }
        
      };
      console.log('root 렌더');
      if(!appReady){
          fetchToken();
      }
      
    }, [appReady]);
  
    
    
    
    return (
      <>
      { auth.isAuthenticated ? <AuthenticatedTab /> : <AuthStack /> }
      </>
    );
    
  };

  export default Root;