import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreenComponent from './SplashScreen';  // Importando o componente da SplashScreen


import LoginScreen from './Login';
import Register1 from './Register1';
import Register2 from './Register2';
import NavigationBar from './NavigationBar';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  useEffect(() => {
    // Função para verificar o status de login
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(loggedIn === 'true');
      setIsCheckingLogin(false);
    };

    checkLoginStatus();
  }, []);

  if (isCheckingLogin) {
    return <SplashScreenComponent/>;  // Chama o SplashScreen enquanto verifica o login
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Register1" component={Register1} />
        <Stack.Screen name="Register2" component={Register2} />
        
        {/* Se estiver logado, exibe a NavigationBar ou outras telas protegidas */}
        {isLoggedIn && (
          <>
            <Stack.Screen name="Home" component={NavigationBar} />
            {/* Outras telas que você deseja exibir após login */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
