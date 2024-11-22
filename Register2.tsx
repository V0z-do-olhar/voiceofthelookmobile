import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,  // Usando o Switch no lugar do CheckBox
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Register2 = () => {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const toggleSwitch = () => setIsTermsAccepted(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: '100%' }]} />
      </View>
      <Text style={styles.title}>CADASTRO</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome completo:</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} />
          <FontAwesome name="microphone" size={20} color="#fff" />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email:</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} />
          <FontAwesome name="microphone" size={20} color="#fff" />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Criar senha:</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} secureTextEntry />
          <FontAwesome name="microphone" size={20} color="#fff" />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Criar Username:</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} />
          <FontAwesome name="microphone" size={20} color="#fff" />
        </View>
      </View>

      <View style={styles.checkboxContainer}>
        <Switch
          value={isTermsAccepted}
          onValueChange={toggleSwitch}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isTermsAccepted ? '#f5dd4b' : '#f4f3f4'}
        />
        <Text style={styles.checkboxText}>
          Aceitar os Termos e Políticas do aplicativo
        </Text>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>CRIAR CONTA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>TERMOS</Text>
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
    paddingTop: 50,
  },
  progressBarContainer: {
    width: '80%',
    height: 4,
    backgroundColor: '#555',
    borderRadius: 2,
    marginBottom: 20,
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
    marginBottom: 30,
  },
  inputGroup: {
    width: '80%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    paddingVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  checkboxText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
});

export default Register2;
