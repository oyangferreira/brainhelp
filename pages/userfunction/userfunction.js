import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, Linking } from 'react-native';
import { CheckBox } from 'react-native-elements';
import styles from './userfunction.css';

const UserFunction = ({ navigation }) => {
  const [isPatientSelected, setIsPatientSelected] = useState(false);
  const [isProfessionalSelected, setIsProfessionalSelected] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePatientCheckboxPress = () => {
    setIsPatientSelected(!isPatientSelected);
    setIsProfessionalSelected(false);
  };

  const handleProfessionalCheckboxPress = () => {
    setIsProfessionalSelected(!isProfessionalSelected);
    setIsPatientSelected(false);
  }; 

  const handleNext = () => {
    if (!isProfessionalSelected && isPatientSelected) {
      navigation.navigate('personaldata'); // Navega para a tela cadastrar.js
    }
  };

  const openAppStore = () => {
    // Altere o 'com.example.app' para o pacote do aplicativo na Play Store que você deseja abrir
    const appPackage = 'com.example.app';
    Linking.openURL(`market://details?id=${appPackage}`);
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image source={require('../../assets/img/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Em qual opção você se encaixa?</Text>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity style={styles.checkboxRow} onPress={handlePatientCheckboxPress}>
            <CheckBox
              title="Paciente"
              checked={isPatientSelected}
              onPress={handlePatientCheckboxPress}
              containerStyle={styles.checkbox}
              textStyle={styles.checkboxText}
              checkedIcon={<Image source={require('../../assets/img/checked.png')} style={styles.checkedIcon} />}
              uncheckedIcon={<Image source={require('../../assets/img/nochecked.png')} style={styles.checkedIcon} />}
              checkedColor="transparent" 
            />
            <Text style={styles.checkboxLabel}>Paciente</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.checkboxRow} onPress={handleProfessionalCheckboxPress}>
            <CheckBox
              title="Profissional"
              checked={isProfessionalSelected}
              onPress={handleProfessionalCheckboxPress}
              containerStyle={styles.checkbox}
              textStyle={styles.checkboxText}
              checkedIcon={<Image source={require('../../assets/img/checked.png')} style={styles.checkedIcon} />}
              uncheckedIcon={<Image source={require('../../assets/img/nochecked.png')} style={styles.checkedIcon} />}
              checkedColor="transparent"
            />
            <Text style={styles.checkboxLabel}>Profissional</Text>
          </TouchableOpacity>       
          <View style={styles.divider} />
          {isProfessionalSelected && (
            <View style={styles.professionalContainer}>
              <Text style={styles.professionalText}>
                O Brain Help é um aplicativo exclusivo para profissionais. Baixe o aplicativo para pacientes logo abaixo.
              </Text>                            
              <TouchableOpacity onPress={openAppStore}>
                <Image source={require('../../assets/img/brainhelppro.png')} style={styles.professionalImage} />  
              </TouchableOpacity>
            </View>  
          )}
        </View> 
      </View> 
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[ 
            styles.nextButton,
            (isProfessionalSelected || !isPatientSelected) ? styles.disabledButton : null,
            (isProfessionalSelected || !isPatientSelected) ? { opacity: 0.5 } : null
          ]}              
          disabled={isProfessionalSelected || !isPatientSelected}
          onPress={handleNext}
        >   
          <Text style={styles.nextButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View> 
    </View>
  ); 
};

export default UserFunction;
