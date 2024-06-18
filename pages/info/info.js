import React, { useState, useEffect } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements';
import styles from './info.css'; 

const Info = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };
 
const handleNext = async() => {   
    if (!isButtonDisabled) {
        try { 
            const randomId = Math.floor(Math.random() * 10000) + 1;
            setId(randomId); 

            let obj = await AsyncStorage.getItem('user'); 
            obj = JSON.parse(obj);

            obj['email'] = email;
            obj['id'] = randomId;
            obj['password'] = password;

            addUser(obj, randomId); 
            await AsyncStorage.setItem('userData', JSON.stringify(obj)); 

            navigation.navigate('uploadphoto');
        } catch (error) {
            navigation.navigate('uploadphoto');
        }
    }
};

 
  useEffect(() => {
    // Validate form fields and update button state
    if (email.trim() !== '' && password.trim().length >= 8 && confirmPassword.trim() === password.trim() && agreeTerms) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password, confirmPassword, agreeTerms]);

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
          <Text style={styles.title}>Informações</Text>
          <Text style={styles.miniTitleEmail}>Email *</Text>
          <TextInput
            placeholder="Digite seu email"
            placeholderTextColor="#BEBEBE"
            style={styles.inputEmail}
            onChangeText={setEmail}
            value={email}
            borderRadius={10}
          />
          <Text style={styles.miniTitleSenha}>Senha *</Text>
          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="#BEBEBE"
            style={styles.inputSenha}
            onChangeText={setPassword} 
            value={password}
            secureTextEntry={true}   
            borderRadius={10}
          />
          <Text style={styles.miniTitleSenhaRepeat}>Repetir Senha *</Text>
          <TextInput
            placeholder="Repita sua senha"
            placeholderTextColor="#BEBEBE"
            style={styles.inputSenhaRepeat} 
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry={true}
            borderRadius={10}
          />
          <View style={styles.checkboxContainer}>
            <CheckBox 
              title=" "    
              checked={agreeTerms}
              onPress={() => setAgreeTerms(!agreeTerms)}
              containerStyle={styles.checkbox}
              textStyle={styles.checkboxText} 
              checkedIcon={<Image source={require('../../assets/img/checked.png')} style={styles.checkedIcon} />}
              uncheckedIcon={<Image source={require('../../assets/img/nochecked.png')} style={styles.checkedIcon} />}
              checkedColor="transparent" 
            />       
            <Text style={styles.checkboxText}>
              Ao se cadastrar, você concorda com nossos {" "}
              <Text style={styles.blueText}>Termos de Uso</Text> e {" "}
              <Text style={styles.blueText}>Política de Privacidade</Text>.
            </Text>     
            </View>       
          </View>   
          </ScrollView>           
          {!keyboardVisible && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleNext} style={[styles.nextButton, isButtonDisabled && styles.disabledButton]} disabled={isButtonDisabled}>
              <Text style={[styles.nextButtonText, isButtonDisabled && styles.disabledButtonText]} disabled={isButtonDisabled}>Continuar</Text> 
            </TouchableOpacity>   
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}; 

export default Info;
