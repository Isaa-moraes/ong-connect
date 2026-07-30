import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';

// Importação das telas
import DashboardScreen from '../screens/DashboardScreen';
import ExplorarScreen from '../screens/ExplorarScreen';
import PerfilScreen from '../screens/PerfilScreen';

export type BottomTabParamList = {
  Dashboard: { userName: string };
  Explorar: undefined;
  Perfil: { userName: string; interesses: string[] };
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

type TabNavigatorRouteProp = RouteProp<{ 
  params: { userName: string; interesses: string[] } 
}, 'params'>;

export default function TabNavigator() {
  const route = useRoute<TabNavigatorRouteProp>();
  
  const { userName, interesses } = route.params || { 
    userName: 'Voluntário', 
    interesses: ['Geral'] 
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explorar') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size + 2} color={color} />;
        },
        tabBarActiveTintColor: '#1b5e20',   // Ajustado para o verde floresta escuro para melhor contraste
        tabBarInactiveTintColor: '#666666', // Cinza ligeiramente mais escuro para melhor acessibilidade
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: Platform.OS === 'ios' ? 0 : 6,
        },
        tabBarStyle: { 
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingTop: 8,
          backgroundColor: '#ffffff',
          borderTopWidth: 0, // Remove a linha dura tradicional do topo da barra
          elevation: 8, // Sombra suave para Android
          shadowColor: '#1b5e20', // Sombra com o tom do app para iOS
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 10,
        },
        headerTitleAlign: 'center',
        headerStyle: { 
          backgroundColor: '#ffffff', 
          elevation: 2, 
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
          borderBottomWidth: 0
        },
        headerTintColor: '#1b5e20',
        headerTitleStyle: { 
          fontWeight: 'bold',
          fontSize: 17
        }
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        initialParams={{ userName }} 
        options={{ title: 'Início' }}
      />
      
      <Tab.Screen 
        name="Explorar" 
        component={ExplorarScreen} 
        options={{ title: 'Descobrir' }}
      />
      
      <Tab.Screen 
        name="Perfil" 
        component={PerfilScreen} 
        initialParams={{ userName, interesses }} 
        options={{ title: 'Meu Perfil' }}
      />
    </Tab.Navigator>
  );
}