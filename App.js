import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold, 
  Poppins_800ExtraBold_Italic, 
  Poppins_900Black, 
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';  
import { NavigationContainer } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import Apresentation from './pages/apresentation/apresentation.js';
import Login from './pages/login/login.js';
import PersonalData from './pages/personaldata/personaldata.js';
import ForgotPassword from './pages/forgotpassword/forgotpassword.js';
import CodeVerification from './pages/codeverification/codeverification.js';
import ResetPassword from './pages/resetpassword/resetpassword.js';
import PasswordChanged from './pages/passwordchanged/passwordchanged.js';
import UserFunction from './pages/userfunction/userfunction.js';  
import Welcome from './pages/welcome/welcome.js';
import HomeScreen from './pages/home/home.js';
import Info from './pages/info/info.js';
import SpecialNeeds from './pages/specialneeds/specialneeds.js';
import UploadPhoto from './pages/uploadphoto/uploadphoto.js';

const Stack = createStackNavigator();   

const Loading = ({ navigation }) => {
useEffect(() => { 
  const check = async() => { 
    try {
      const newUser = await AsyncStorage.getItem('newUser');
      if(newUser !== null) {
        navigation.replace('apresentation'); 
      }else{ 
	navigation.replace('apresentation');    
}
    } catch(e) { 
    }
  };

  check();

  const timer = setTimeout(() => { 
       check()
  }, 4000);  

  return () => clearTimeout(timer); 
}, [navigation]);

  return (
    <View style={styles.loadingContainer}>
      <Image source={require('./assets/img/logo.png')} style={styles.logo} />
    </View>
  );
};  

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
  },
  logo: {
    width: 180,
    height: 180, 
    resizeMode: 'contain',
  },
});

const App = () => {

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic, 
    Poppins_900Black, 
    Poppins_900Black_Italic, 
  });


  if (!fontsLoaded) {
    return null;
  } 

  return (
    <NavigationContainer>  
      <Stack.Navigator initialRouteName="Loading" headerMode="none">
        <Stack.Screen name="home" component={HomeScreen} />  
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="apresentation" component={Apresentation} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen  name="personaldata" component={PersonalData} />
        <Stack.Screen name="info" component={Info} />
        <Stack.Screen name="specialneeds" component={SpecialNeeds} />
        <Stack.Screen name="uploadphoto" component={UploadPhoto} />
        <Stack.Screen name="forgotpassword" component={ForgotPassword} />
        <Stack.Screen name="codeverification" component={CodeVerification} />
        <Stack.Screen name="resetpassword" component={ResetPassword} />
        <Stack.Screen name="passwordchanged" component={PasswordChanged} />
        <Stack.Screen name="userfunction" component={UserFunction} />
        <Stack.Screen name="welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}; 

export default App;