import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import styles from './specialneeds.css';

const SpecialNeeds = ({ navigation }) => {
  const [isNoSelected, setIsNoSelected] = useState(false);
  const [isYesSelected, setIsYesSelected] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNoCheckboxPress = () => {
    setIsNoSelected(!isNoSelected);
    setIsYesSelected(false);
  };

  const handleYesCheckboxPress = () => {
    setIsYesSelected(!isYesSelected);
    setIsNoSelected(false);
  };  

  const handleContinue = () => {
    navigation.navigate('welcome');
  };
    
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image source={require('../../assets/img/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Possui alguma necessidade especial?</Text>

        <View style={styles.checkboxContainer}>  
          <TouchableOpacity style={styles.checkboxRow} onPress={handleNoCheckboxPress}>
            <CheckBox
              title="Não"
              checked={isNoSelected}
              onPress={handleNoCheckboxPress}
              containerStyle={styles.checkbox}
              textStyle={styles.checkboxText}
              checkedIcon={<Image source={require('../../assets/img/checked.png')} style={styles.checkedIcon} />}
              uncheckedIcon={<Image source={require('../../assets/img/nochecked.png')} style={styles.checkedIcon} />}
              checkedColor="transparent"
            />
            <Text style={styles.checkboxLabel}>Não</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.checkboxRow} onPress={handleYesCheckboxPress}>
            <CheckBox
              title="Sim"
              checked={isYesSelected}
              onPress={handleYesCheckboxPress}
              containerStyle={styles.checkbox}
              textStyle={styles.checkboxText}
              checkedIcon={<Image source={require('../../assets/img/checked.png')} style={styles.checkedIcon} />}
              uncheckedIcon={<Image source={require('../../assets/img/nochecked.png')} style={styles.checkedIcon} />}
              checkedColor="transparent"
            />
            <Text style={styles.checkboxLabel}>Sim</Text>
          </TouchableOpacity>
        </View> 
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity   
          style={[
            styles.nextButton,
            (!isNoSelected && !isYesSelected) ? styles.disabledButton : null,
            (!isNoSelected && !isYesSelected) ? { opacity: 0.5 } : null 
          ]} 
          disabled={!isNoSelected && !isYesSelected}
          onPress={handleContinue}
          >
          <Text style={styles.nextButtonText}>Continuar</Text>
        </TouchableOpacity> 
      </View>
    </View>
  );
};

export default SpecialNeeds;
