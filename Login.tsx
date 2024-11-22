import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    // Verifica se o usuário está logado ao abrir o app
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (loggedIn === 'true') {
        navigation.navigate('Home'); // Navega diretamente para a Home
      }
    };
    checkLoginStatus();
  }, [navigation]);

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Por favor, preencha ambos os campos!');
      Speech.speak('Por favor, preencha ambos os campos!');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    
    setTimeout(async () => {
      if (username === 'admin' && password === '1234') {
        Speech.speak('Login bem-sucedido, bem-vindo!');
        await AsyncStorage.setItem('isLoggedIn', 'true'); // Salva o estado de login
        navigation.navigate('Home'); // Navega para a Home após login bem-sucedido
      } else {
        Speech.speak('Usuário ou senha inválidos. Tente novamente.');
        setErrorMessage('Usuário ou senha inválidos!');
      }
      setIsLoading(false);
    }, 1000); // Simulação de tempo de processamento
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#ccc"
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]} // Desabilita o botão quando está carregando
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Não tem login? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register1')}>
          <Text style={styles.signupLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 16,
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    paddingLeft: 15,
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc', // Botão desabilitado fica cinza
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    color: '#fff',
    fontSize: 25,
  },
  signupLink: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Login;
