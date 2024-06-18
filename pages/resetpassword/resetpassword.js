// ResetPassword.js
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './resetpassword.css';

const ResetPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (!isButtonDisabled) {
      navigation.navigate('passwordchanged');
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setIsButtonDisabled(text.length < 8 || !/[A-Z]/.test(text) || !/\d/.test(text) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(text) || text !== confirmPassword);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setIsButtonDisabled(password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password) || password !== text);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
          <Text style={styles.title}>Redefinir senha</Text>
          <Text style={styles.text}>Sua senha precisa ter no mínimo 8 caracteres e pelo menos uma letra maiúscula, um número e um símbolo.</Text>
          <Text style={styles.miniTitle}>Nova senha</Text>
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Digite sua nova senha"   
              placeholderTextColor="#BEBEBE"
              style={styles.input}
              onChangeText={handlePasswordChange}
              value={password} 
              secureTextEntry={!showPassword}
              borderRadius={10}         
            /> 
            <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
              {showPassword ? <Feather name="eye" size={20} color="#ABB0AF" /> : <Feather name="eye-off" size={20} color="#ABB0AF" />}
            </TouchableOpacity>
          </View>
          <Text style={styles.miniTitle}>Repetir senha</Text>
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Repita sua senha" 
              placeholderTextColor="#BEBEBE"
              style={styles.input}
              onChangeText={handleConfirmPasswordChange}
              value={confirmPassword} 
              secureTextEntry={!showConfirmPassword}
              borderRadius={10}     
            />
            <TouchableOpacity onPress={toggleShowConfirmPassword} style={styles.eyeIcon}>
              {showConfirmPassword ? <Feather name="eye" size={20} color="#ABB0AF" /> : <Feather name="eye-off" size={20} color="#ABB0AF" />} 
            </TouchableOpacity>      
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

export default ResetPassword;
