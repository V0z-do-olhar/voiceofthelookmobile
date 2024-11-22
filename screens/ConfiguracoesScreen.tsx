import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ConfiguracoesScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <TextInput style={styles.input} value="@admin" editable={false} />
      <TextInput style={styles.input} value="******" editable={false} secureTextEntry />
      <TextInput style={styles.input} value="admin**@gmail.com" editable={false} />
      <TouchableOpacity style={styles.input}>
        <Text style={styles.textButton}>Microfone e áudio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input}>
        <Text style={styles.textButton}>Localização</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ExcluirScreen')}>
        <Text style={styles.buttonText}>EXCLUIR CONTA</Text>
      </TouchableOpacity>

      {/* Botão de Sair da Conta */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutButtonText}>SAIR DA CONTA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  textButton: {
    color: '#000',
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
