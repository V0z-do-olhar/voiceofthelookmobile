import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Speech from 'expo-speech';

const HomeScreen: React.FC = () => {
  const [isListening, setIsListening] = useState<boolean>(false);

  // Função para navegação direta pelos ícones
  const navigateTo = (screen: 'home' | 'map' | 'settings') => {
    switch (screen) {
      case 'map':
        Speech.speak('Redirecionando para o Mapa');
        // Navegação para a tela de mapa
        break;
      case 'home':
        Speech.speak('Bem-vindo à tela Home');
        // Navegação para a tela home
        break;
      case 'settings':
        Speech.speak('Abrindo configurações');
        // Navegação para a tela de configurações
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Falar assim que a tela for carregada
    Speech.speak('Olá, eu sou o Noah, como posso ajudar?');
  }, []);

  return (
    <View style={[styles.container, isListening && styles.listening]}>
      <Text style={styles.greeting}>Olá, eu sou o Noah!</Text>
      <View style={styles.noahContainer}>
        <TouchableOpacity onPress={() => Speech.speak('Estou ouvindo. Por favor, diga um comando.')}>
          <View style={styles.noahCircle}>
            <Image
              source={require('./assets/robo.png')}
              style={styles.noahIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    color: '#FFF',
    fontSize: 24,
    marginBottom: 20,
  },
  noahContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  noahCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noahIcon: {
    width: 150,
    height: 150,
  },
  listening: {
    backgroundColor: '#1a1a1a',
  },
});

export default HomeScreen;
