import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './apresentation.css'; 

const Apresentation = ({ navigation }) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [title, setTitle] = useState('Sinta-se bem em qualquer momento do dia');
 
  const handleNext = () => {                   
    const nextIndex = activeIndex + 1; 
    if (nextIndex < data.length) {
      setActiveIndex(nextIndex);
      carouselRef.current.snapToNext(); 
      updateTitle(nextIndex); 
    } else {                       
      navigation.navigate('login'); 
    }  
  };              
useEffect(() => {
    const checkUserData = async () => {
        try { 
            await AsyncStorage.setItem('newUser', '1'); 
            const userDataString = await AsyncStorage.getItem('userData');
            if (userDataString !== null) {
                navigation.navigate('home');
            }
        } catch (error) {
            console.error('Erro ao verificar os dados do usuário:', error);
        }
    };

    checkUserData(); 

    const intervalId = setInterval(() => { 
        checkUserData();
    }, 1000);

    return () => clearInterval(intervalId);
}, []);



  const handleSkip = () => {
    navigation.navigate('login'); 
  };    
 
  const updateTitle = (index) => {    
    switch (index) {  
      case 0:       
        setTitle('Sinta-se bem em qualquer momento do dia');
        break;
      case 1: 
        setTitle('Suporte disponível para\n tirar suas dúvidas');
        break;
      case 2:
        setTitle('Chamadas de vídeo com ótima qualidade'); 
        break; 
      default:
        setTitle('');  
        break; 
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>          
      <Image    
        source={item.image}
        style={styles.carouselImage}
      />
    </View>
  );
// Descubra uma nova abordagem para cuidar de sua saúde mental em qualquer momento do dia.
  const data = [
    {   
      text:'Descubra uma nova abordagem para\n cuidar de sua saúde mental em qualquer momento do dia.',                  
      //    Descubra uma nova abordagem para cuidar de sua saúde mental em qualquer momento do dia.  
      image: require('../../assets/img/img1.jpg'),
    },
    {  
      text: 'Utilize o menu ajuda para tirar qualquer possível dúvidaque você tenha sobre o aplicativo.',
      image: require('../../assets/img/img2.jpg'),
    },
    {
      text: 'Aproveite as chamadas de vídeo nítidas e confidenciais com os profissionais, sem precisar sair de casa.',
      image: require('../../assets/img/img3.jpg'),    
    }, 
  ]; 

  return (   
    <View style={styles.background}>   
      <View style={styles.container}>     
        <Carousel
          ref={carouselRef}  
          data={data}
          renderItem={renderItem}     
          sliderWidth={420}   
          itemWidth={420}    
          loop={false}  
          onSnapToItem={(index) => { 
            setActiveIndex(index);    
            updateTitle(index);             
          }}      
        />  
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.carouselText}>{data[activeIndex].text}</Text>  
        </View>
      </View>
      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Pular</Text>
        </TouchableOpacity>
        <View style={styles.carouselIndicatorContainer}> 
          {data.map((_, index) => (       
            <View 
              key={index}    
              style={[   
                styles.carouselIndicator,
                activeIndex === index && { backgroundColor: '#2196F3' },
              ]}
            />  
          ))}   
        </View>
        <TouchableOpacity onPress={handleNext} style={styles.nextButtonContainer}>
          <Image source={require('../../assets/img/next.png')} style={styles.nextButton}/>        
        </TouchableOpacity>
      </View>                          
    </View> 
  );
};

export default Apresentation;
