import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'; // Adicionado Dimensions para obter a altura da tela
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window'); // Obtendo a altura e largura da tela

const Settings = ({ navigation }) => {
  const quit = () => {
    // Aqui você pode adicionar qualquer lógica para ação de sair, como limpar os dados de autenticação.
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        {/* Botão "Sair" no canto direito */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => {
          quit();
          navigation.navigate('login');
        }}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
          <Text style={styles.title}>Opções</Text>

          {/* Retângulo com a foto e o nome do usuário */}
          <View style={styles.profileContainer}>
            <Image source={require('../../assets/img/perfil.png')} style={styles.profileImage} />
            <View>
              <Text style={styles.profileName}>Nome do Usuário</Text>
            </View>
          </View>

          {/* Abas de menu com ícones */}
          <TouchableOpacity style={styles.settingOption}> 
            <Image source={require('../../assets/img/img1.png')} style={styles.icon} />
            <Text style={styles.optionText}>Dados Pessoais</Text>
          </TouchableOpacity>
          <View style={styles.divider} /> 

          <TouchableOpacity style={styles.settingOption}>
            <Image source={require('../../assets/img/img2.png')} style={styles.icon} />
            <Text style={styles.optionText}>Notificações</Text>
          </TouchableOpacity>
          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingOption}>
            <Image source={require('../../assets/img/img3.png')} style={styles.icon} />
            <Text style={styles.optionText}>Alterar Senha</Text>
          </TouchableOpacity>
          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingOption}>
            <Image source={require('../../assets/img/img4.png')} style={styles.icon} />
            <Text style={styles.optionText}>Ajuda</Text>
          </TouchableOpacity>
          <View style={styles.divider} /> 

          <TouchableOpacity style={styles.settingOption}>
            <Image source={require('../../assets/img/img5.png')} style={styles.icon} />
            <Text style={styles.optionText}>Sobre o Aplicativo</Text>
          </TouchableOpacity> 
          <View style={styles.divider} />
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logoutButton: {
    position: 'absolute',
    top: height * 0.06, // Iniciando o botão "Sair" a 5% da altura da tela
    alignSelf: 'flex-end',
  },
  logoutText: {
    fontSize: 16,
    color: '#2196F3',
  },
  title: {
    fontSize: 28,
    fontWeight: '500', 
    color: '#1D1E1D',
    fontFamily: 'Poppins_600SemiBold',
    top: height * 0.05,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: 'rgba(128, 128, 128, 0.2)', // Borda cinza quase transparente
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    height: 80,
    alignSelf: 'center', // Para centralizar o retângulo
    top: height * 0.08, // Ajustando a posição vertical
},
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
  },
  divider: {
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    marginBottom: 20,
    width: '100%', // Dividers ocupam 100% da largura da tela
    top: height * 0.10,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, 
    top: height * 0.10, 
  },
    icon: {
    resizeMode: 'contain', 
    width: 15,
    height: 15, 
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
});

export default Settings;
