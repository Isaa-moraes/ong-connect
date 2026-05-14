import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import CriarContaScreen from './src/screens/CriarContaScreen';
import InteressesScreen from './src/screens/InteressesScreen';
import TabNavigator from './src/navigation/TabNavigator';

export type RootStackParamList = {
  Login: undefined;
  CriarConta: undefined;
  Interesses: { userName: string; email: string };
  HomeTabs: { userName: string; email: string; interesses: string[] };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CriarConta" component={CriarContaScreen} />
          <Stack.Screen name="Interesses" component={InteressesScreen} />
          <Stack.Screen name="HomeTabs" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}