import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Calendar from '../calendar/calendar';
import Settings from '../settings/settings';

const { height, width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Início') {
            iconName = focused ? require('../../assets/img/home.png') : require('../../assets/img/home.png');
          } else if (route.name === 'Agenda') {
            iconName = focused ? require('../../assets/img/calendar.png') : require('../../assets/img/calendar.png');
          } else if (route.name === 'Opções') {
            iconName = focused ? require('../../assets/img/settings.png') : require('../../assets/img/settings.png');
          }
 
          return <Image source={iconName} style={{ width: size, height: size }} />;
        },
      })} 
      tabBarOptions={{
        activeTintColor: '#4ED5F9',
        inactiveTintColor: 'gray',
        borderTopColor: 'rgba(128, 128, 128, 0.1)',
        borderTopWidth: 1,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Início" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Agenda" component={Calendar} options={{ headerShown: false }} />
      <Tab.Screen name="Opções" component={Settings} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const HomeScreen = () => {
  const [user, setUser] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [textColor, setTextColor] = useState(isAvailable ? '#2196F3' : 'gray'); // Cor do texto

  useEffect(() => {
    const fetchData = async () => {
      try {
        const u = await getInfos();
        setUser(u);
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
      }
    };

    fetchData();
  }, []);

  const toggleSwitch = () => setIsAvailable((previousState) => !previousState);

  // Função para atualizar a cor do texto com base no estado do switch
  useEffect(() => {
    setTextColor(isAvailable ? '#FF7800' : 'gray');
  }, [isAvailable]);

  const navigation = useNavigation();

  return (
    <View style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require('../../assets/img/perfil.png')} style={styles.profileIcon} />
            <View style={styles.greetingContainer}>
              {user ? (
                <Text style={styles.greetingText}>
                  Olá, <Text style={styles.boldText}>{user.name}</Text>
                </Text>
              ) : (
                <Text style={styles.greetingText}>
                  Olá, <Text style={styles.boldText}>Yang</Text>
                </Text>
              )}
            </View>
          </View>
          <View style={styles.availableConsultations}>
            <Text style={styles.subtitle}>Nova Consulta</Text>
          </View>
          <View style={styles.consultationBox}>
            <Image source={require('../../assets/img/perfil.png')} style={styles.consultationProfileIcon} />
            <View style={styles.consultationInfo}>
              <Text style={styles.consultationName}>Consulta Imediata</Text>
            </View>
            <TouchableOpacity 
              style={styles.acceptButton}
              onPress={() => navigation.navigate('consultationdetails')}
            >
              <Text style={styles.acceptButtonText}>Procurar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.consultationBox}>
            <Image source={require('../../assets/img/perfil.png')} style={styles.consultationProfileIcon} />
            <View style={styles.consultationInfo}>
              <Text style={styles.consultationName}>Consulta Agendada</Text>
            </View>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.acceptButtonText}>Procurar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.backgroundTabBar}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.tabBarButton}
            >
              <Image
                source={icons[route.name]}
                style={[styles.icon, { tintColor: isFocused ? '#2196F3' : '#BBBBBB' }]}
              />
              <Text style={[styles.label, { color: isFocused ? '#2196F3' : '#BBBBBB' }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
 
const icons = {
  Início: require('../../assets/img/home.png'),
  Agenda: require('../../assets/img/calendar.png'),
  Opções: require('../../assets/img/settings.png'),
};

const styles = StyleSheet.create({
  background: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '80%', // Ajuste para centralizar melhor o conteúdo
    alignSelf: 'center',
    paddingBottom: 20, // Adicionar espaçamento na parte inferior
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20, // Espaçamento superior
  },
  profileIcon: {
    width: 80,
    height: 80,
  },
  greetingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 28,
    color: '#1D1E1D',
    fontFamily: 'Poppins_400Regular',
    marginHorizontal: 20, 
  },
  boldText: {
    fontFamily: 'Poppins_600SemiBold',
  },
  backgroundTabBar: {
    backgroundColor: '#FFF',
    borderTopColor: 'rgba(128, 128, 128, 0.1)',
    borderTopWidth: 4,
  },
  tabBar: {
    width: '90%',
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  tabBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  availableConsultations: {
    marginTop: 20, // Espaçamento superior
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 10, // Espaçamento inferior
  },
  consultationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: 'rgba(128, 128, 128, 0.2)', // Borda cinza quase transparente
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10, // Ajuste de margem vertical
  },
  consultationProfileIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  consultationInfo: {
    flex: 1,
  },
  consultationName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: "#13191B",
  }, 
  acceptButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 25, 
  },
  acceptButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins_600SemiBold',  
  },
});

export default Home;
