import React, { useState, useEffect } from 'react';
import { Image, View, Text, TouchableOpacity, Dimensions, Alert, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './uploadphoto.css';

const UploadPhoto = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada para acessar a galeria de fotos.');
      }
    })();
  }, []);

  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      navigation.navigate('specialneeds');
    }
  };

  const handleSelectFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      navigation.navigate('specialneeds');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.background}>
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Image source={require('../../assets/img/back.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Para sua segurança</Text>
      <Text style={styles.text}>
        Envie uma foto de perfil para concluir seu cadastro. A foto deve ser nítida do seu rosto para concluir o cadastro.
      </Text>    
      <View style={styles.imageContainer}> 
        <Image source={require('../../assets/img/garoto.png')} style={styles.garotoImage} />
      </View>    
    </View>    
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={handleTakePhoto} style={styles.photoButton}>
            <Text style={styles.photoButtonText}>Tirar uma foto</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSelectFromGallery} style={styles.galleryButton}>
            <Text style={styles.galleryButtonText}>Abrir galeria</Text>
          </TouchableOpacity> 
        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.selectedImage} />}
    </View>
    </SafeAreaView>
  );
};

export default UploadPhoto;
