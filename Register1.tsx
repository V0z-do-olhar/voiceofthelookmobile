import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Register1 = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      {/* Barra de progresso */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: '50%' }]} />
      </View>

      {/* Títulos */}
      <Text style={styles.title}>CONHEÇA O</Text>
      <Text style={styles.subtitle}>NOAH</Text>

      {/* Botões */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Mapa adaptado</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Notícias do mundo</Text>
      </TouchableOpacity>

      {/* Rodapé */}
      <Text style={styles.footer}>NOSSA IA</Text>
      <Text style={styles.footerDescription}>INTELIGÊNCIA ARTIFICIAL</Text>

      {/* Botão de próximo */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('Register2')}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </TouchableOpacity>

      {/* Imagem do robô */}
      <Image
        source={require('./assets/robo.png')} // Substitua pelo caminho correto da imagem
        style={styles.image}
        resizeMode="contain"
      />
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
  progressBarContainer: {
    position: 'absolute',
    top: 50,
    width: '80%',
    height: 4,
    backgroundColor: '#555',
    borderRadius: 2,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#222',
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  footer: {
    fontSize: 20,
    color: '#fff',
    marginTop: 30,
  },
  footerDescription: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 40,
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    width: '80%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  nextButtonText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  image: {
    position: 'absolute',
    bottom: 100,
    right: -30, // Ajuste para posicionar parcialmente fora da tela
    width: 150,
    height: 150,
  },
});

export default Register1;
