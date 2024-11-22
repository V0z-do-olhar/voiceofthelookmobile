import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Para os ícones
import * as Speech from 'expo-speech'; // Importando a biblioteca de fala

// Importação das telas
import HomeScreen from './HomeScreen';
import MapScreen from './screens/MapScreen';
import ConfiguracoesScreen from './screens/ConfiguracoesScreen';

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  // Função para falar o nome da tela
  const speakPageName = (pageName: string) => {
    Speech.speak(`Você está indo para a página de ${pageName}`, {
      language: 'pt-BR', // Define a linguagem da fala
    });
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = 'mic'; // Ícone para a página inicial
          } else if (route.name === 'MapScreen') {
            iconName = 'map'; // Ícone para a página de mapa
          } else if (route.name === 'ConfiguracoesScreen') {
            iconName = 'settings'; // Ícone para a página de configurações
          }

          // Retorna o ícone com a cor dependendo do estado (ativo ou inativo)
          return <Ionicons name={iconName} size={size} color={focused ? 'black' : 'white'} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#A9A9A9', // Cor cinza
          borderRadius: 20,           // Bordas arredondadas
          height: 60,                 // Altura menor
          paddingHorizontal: 0,      // Espaço nas laterais
          position: 'absolute',       // Para manter a posição fixa
          bottom: 20,                 // Distância do fundo
          left: 20,                   // Distância da esquerda
          right: 20,                  // Distância da direita
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        listeners={{
          tabPress: (e) => {
            speakPageName('Home');  // Fala o nome da tela ao pressionar
          },
        }}
      />
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        listeners={{
          tabPress: (e) => {
            speakPageName('Mapa');  // Fala o nome da tela ao pressionar
          },
        }}
      />
      <Tab.Screen
        name="ConfiguracoesScreen"
        component={ConfiguracoesScreen}
        listeners={{
          tabPress: (e) => {
            speakPageName('Configurações');  // Fala o nome da tela ao pressionar
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationBar;
