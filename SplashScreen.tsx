import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

const SplashScreenComponent: React.FC = () => {
  // Manter a SplashScreen visível até que a tela esteja pronta
  useEffect(() => {
    // Evitar que o splash screen seja fechado automaticamente
    SplashScreen.preventAutoHideAsync();

    // Função para simular carregamento e esconder o splash
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 3000); // Ajuste o tempo conforme necessário (3000ms = 3 segundos)
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require('./assets/logo.png')} // Caminho da imagem
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: 200,  // Ajuste o tamanho da imagem conforme necessário
    height: 200, // Ajuste o tamanho da imagem conforme necessário
  },
});

export default SplashScreenComponent;
