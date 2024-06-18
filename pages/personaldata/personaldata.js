import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './personaldata.css';

const PersonalData = ({ navigation }) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = async() => {
    const proData = {
      name,
      cpf,  
      phone,
      gender,    
    };
    await AsyncStorage.setItem('pro', JSON.stringify(proData));
    navigation.navigate('info');
  };

  useEffect(() => {
    if (name.trim() !== '' && isValidCPF(cpf) && isValidPhone(phone) && gender.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, cpf, phone, gender]);
  

  const isValidCPF = (cpf) => {
    return /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf);
  };

  const isValidPhone = (phoneNumber) => {
    return /^\([0-9]{2}\)\s[0-9]{5}-[0-9]{4}$/.test(phoneNumber);
  };

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
            <Text style={styles.title}>Dados Pessoais</Text>
            <Text style={styles.miniTitleNome}>Nome *</Text>
            <TextInput
              placeholder="Digite seu nome"
              placeholderTextColor="#BEBEBE"
              style={styles.inputNome}
              onChangeText={setName}
              value={name}
              borderRadius={10}
            />
            <Text style={styles.miniTitleCpf}>CPF *</Text>
            <TextInputMask
              placeholder="Digite seu CPF"
              placeholderTextColor="#BEBEBE"
              style={styles.inputCpf}
              onChangeText={setCpf}
              value={cpf}
              keyboardType="phone-pad"
              type={'cpf'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '', 
              }}
              maxLength={14}
              borderRadius={10} 
            />
            <Text style={styles.miniTitleTelefone}>Telefone (Whatsapp) *</Text>
            <TextInputMask
              placeholder="Digite seu telefone"
              placeholderTextColor="#BEBEBE"
              style={styles.inputTelefone}
              onChangeText={(formatted, extracted) => {
                setPhone(formatted);
              }}
              value={phone}
              keyboardType="phone-pad"
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ', 
              }}
              maxLength={15}
              borderRadius={10} 
            />
            <Text style={styles.miniTitleGender}>Gênero *</Text>
            <View style={styles.inlineFields}>
              <TouchableOpacity style={[styles.genderOption, gender === 'Masculino' && styles.selectedOption, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]} onPress={() => setGender('Masculino')}>
                <Text style={[styles.genderOptionText, gender === 'Masculino' && styles.selectedOptionText]}>Masculino</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.genderOption, gender === 'Feminino' && styles.selectedOption, { borderRadius: 0, borderLeftWidth: 0, borderRightWidth: 0 }]} onPress={() => setGender('Feminino')}>
                <Text style={[styles.genderOptionText, gender === 'Feminino' && styles.selectedOptionText]}>Feminino</Text>
              </TouchableOpacity> 
              <TouchableOpacity style={[styles.genderOption, gender === 'Outro' && styles.selectedOption, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]} onPress={() => setGender('Outro')}>
                <Text style={[styles.genderOptionText, gender === 'Outro' && styles.selectedOptionText]}>Outro</Text>
              </TouchableOpacity>
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

export default PersonalData;
