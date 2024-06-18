import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import styles from './passwordchanged.css';

const PasswordChanged = ({ navigation }) => {
  const handleBegin = () => {
    navigation.navigate('login');
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        
        <View style={styles.imgContainer}>
          <Image source={require('../../assets/img/correct.png')} style={styles.correctImage} />
        </View>
        <Text style={styles.title}>Sua senha foi alterada com sucesso!</Text>
        <Text style={styles.text}>Deu tudo certo!</Text>
        <Text style={styles.text}>Agora você pode acessar novamente o aplicativo e consultar-se com os profissionais.</Text>
        <TouchableOpacity onPress={handleBegin} style={styles.beginButton}>
          <Text style={styles.beginButtonText}>Continuar</Text>
        </TouchableOpacity> 
      </View>  
    </View>  
  );  
};

export default PasswordChanged; 
 