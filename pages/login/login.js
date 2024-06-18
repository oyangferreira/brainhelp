import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';   
import styles from './login.css';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const forgotPassword = () => {
    navigation.navigate('forgotpassword'); 
  };

  const cadastrate = () => {
    navigation.navigate('userfunction');
  };  
  
  const handleBack = () => { 
    navigation.goBack();
  };

  const handleNext = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const checkUserData = async () => {
      try { 
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString !== null) {
          navigation.navigate('home');
        }
      } catch (error) { 
        console.error('Erro ao verificar os dados do usuário:', error);
      }
    };
    checkUserData(); 

    const intervalId = setInterval(checkUserData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });  
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (  
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Image source={require('../../assets/img/back.png')} style={styles.backIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={forgotPassword} style={styles.problemLoginButton}>       
              <Text style={styles.problemLoginText}>Problemas para entrar?</Text>
            </TouchableOpacity>  
            <Text style={styles.title}>Entrar</Text>
            <View style={styles.formContainer}>   
              <Text style={styles.miniTitleEmail}>Email</Text>     
              <TextInput   
                placeholder="Digite seu email"
                placeholderTextColor="#BEBEBE"
                style={[styles.inputEmail, emailError && styles.errorInput]}
                onChangeText={setEmail}
                value={email} 
                borderRadius={10} 
              />
              <Text style={styles.miniTitleSenha}>Senha</Text>
              <TextInput  
                placeholder="Digite sua senha"
                placeholderTextColor="#BEBEBE"
                secureTextEntry={true}
                style={[styles.inputSenha, passwordError && styles.errorInput]}
                onChangeText={setPassword}
                value={password}
                borderRadius={10}        
              />    
              {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
              <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity onPress={forgotPassword} style={styles.forgotPasswordButton}>
                  <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>  
                </TouchableOpacity>  
              </View>   
            </View>  
          </View> 
        </ScrollView>
        {!keyboardVisible && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleNext} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Entrar</Text>   
            </TouchableOpacity>    
            <TouchableOpacity onPress={cadastrate} style={styles.signupButton}>
              <Text style={styles.signupButtonText}>Criar conta</Text>
            </TouchableOpacity>              
          </View>
        )}
      </KeyboardAvoidingView> 
    </SafeAreaView> 
  );    
};

export default Login;