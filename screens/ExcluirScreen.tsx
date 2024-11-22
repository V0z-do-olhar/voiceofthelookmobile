import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationBar from '../NavigationBar'; // Importando o componente da barra de navegação

export default function ExcluirContaScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>{'<'} Excluir Conta</Text>
      </TouchableOpacity>
      <Text style={styles.description}>
        Ao excluir sua conta você concorda em apagar todos os dados utilizados em uso do aplicativo.
      </Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#aaa" />
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        placeholderTextColor="#aaa" 
        secureTextEntry 
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>EXCLUIR CONTA</Text>
      </TouchableOpacity>

      {/* Barra de navegação com a tela ativa sendo "settings" */}
      <NavigationBar activeScreen="settings" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  backButton: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#000',
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
