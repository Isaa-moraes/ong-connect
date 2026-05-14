import React from 'react';
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

// Tipo auxiliar para ler as informações vindas da Stack de Login/Cadastro
type TabNavigatorRouteProp = RouteProp<{ 
  params: { userName: string; interesses: string[] } 
}, 'params'>;

export default function TabNavigator() {
  const route = useRoute<TabNavigatorRouteProp>();
  
  // Resgata o Nome e os Interesses salvos com valores de segurança contra falhas
  const { userName, interesses } = route.params || { 
    userName: 'Voluntário', 
    interesses: ['Geral'] 
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // CONFIGURAÇÃO DOS ÍCONES VETORIAIS REATIVOS
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explorar') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2e7d32',   // Verde oficial ONG Connect
        tabBarInactiveTintColor: '#777777', // Cinza para abas em segundo plano
        tabBarStyle: { 
          paddingBottom: 5, 
          height: 60,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0'
        },
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#ffffff', elevation: 1, shadowOpacity: 0.1 },
        headerTintColor: '#2e7d32',
        headerTitleStyle: { fontWeight: 'bold' }
      })}
    >
      {/* ABA 1: Dashboard Inicial com Saudação Nominal */}
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        initialParams={{ userName }} 
        options={{ title: 'Início' }}
      />
      
      {/* ABA 2: Lista de Exploração de ONGs e Causas */}
      <Tab.Screen 
        name="Explorar" 
        component={ExplorarScreen} 
        options={{ title: 'Descobrir' }}
      />
      
      {/* ABA 3: Perfil Estilizado em Lista (Inspirado na foto enviada) */}
      <Tab.Screen 
        name="Perfil" 
        component={PerfilScreen} 
        initialParams={{ userName, interesses }} 
        options={{ title: 'Meu Perfil' }}
      />
    </Tab.Navigator>
  );
}