import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import styles from './welcome.css';

const Welcome = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate('home');
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        
        <View style={styles.imgContainer}>
          <Image source={require('../../assets/img/correct.png')} style={styles.correctImage} />
        </View> 
        <Text style={styles.title}>Sua conta foi criada com sucesso!</Text>
        <Text style={styles.text}>Estamos esperando por você.</Text>
        <Text style={styles.textTwo}>Agora você pode realizar consultas a qualquer hora e em qualquer lugar.</Text>
      </View> 
      <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Continuar</Text> 
            </TouchableOpacity>
          </View>
    </View>  
  );     
};   

export default Welcome;           
   