import { loadUsers } from "../fetcher/userapi";
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function loginUser(userInfo) {
    try {
        const users = await loadUsers();
        for(const user of users){
          if (user.email === userInfo.email && user.password === userInfo.password){
            await AsyncStorage.setItem('userData', JSON.stringify(user)); 
            ToastAndroid.show("Seja Bem vindo ao app", ToastAndroid.SHORT)    
          }else{
            ToastAndroid.show("Email ou Senha incorretas", ToastAndroid.SHORT)
          }
        }
    } catch (error) {
      ToastAndroid.show("Estamos tendo problemas de rede, tente mais tarde", ToastAndroid.SHORT)
    }
}
const quit= async ()=>{
    await AsyncStorage.removeItem('userData');
}
const getInfos= async ()=>{
  const user = await await AsyncStorage.getItem('userData')
  return JSON.parse(user)
}
export { loginUser, quit, getInfos };
