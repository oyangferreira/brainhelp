// ForgotPassword.js
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import styles from './forgotpassword.css';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
  if (!isButtonDisabled) {
    navigation.navigate('codeverification', { email: email }); 
  }
};
  const handleEmailChange = (text) => {
    setEmail(text);
    setIsButtonDisabled(text === '');
  }; 
    
  return (  
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView 
        contentContainerStyle={styles.background} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false} 
      > 
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styles.container}
        >
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Image source={require('../../assets/img/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Recuperar senha</Text>
          <Text style={styles.text}>Para sua segurança, enviaremos um código para validar sua redefinição de senha.</Text>  
          <Text style={styles.miniTitle}>Email</Text>
          <View style={styles.formContainer}>        
            <TextInput
              placeholder="Digite seu email" 
              placeholderTextColor="#BEBEBE"
              style={styles.input}
              onChangeText={handleEmailChange}
              value={email} 
              borderRadius={10}     
            />
          </View> 
          <KeyboardAvoidingView
            behavior="position" 
            enabled
          >
            <TouchableOpacity onPress={handleNext} style={[styles.nextButton, { opacity: isButtonDisabled ? 0.5 : 1 }]} disabled={isButtonDisabled}>
              <Text style={styles.nextButtonText}>Continuar</Text>   
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );    
};

export default ForgotPassword;
