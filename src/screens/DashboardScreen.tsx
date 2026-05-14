import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';

type TabParamList = {
  Dashboard: { userName: string };
};

type DashboardRouteProp = RouteProp<TabParamList, 'Dashboard'>;

export default function DashboardScreen() {
  const route = useRoute<DashboardRouteProp>();
  const { userName } = route.params || { userName: 'Voluntário' };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <View style={styles.headerBloco}>
        <View style={styles.textoHeaderContainer}>
          <Text style={styles.saudacao}>Olá, {userName}! 👋</Text>
          <Text style={styles.subsaudacao}>Bem-vindo ao ecossistema ONG Connect.</Text>
        </View>

        <Image 
          source={require('../../assets/logo-branca.png')} 
          style={styles.logoMini}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.secaoTitulo}>Resumo de Atividades</Text>
      <View style={styles.grid}>
        <View style={styles.cardMetrica}>
          <Ionicons name="heart" size={32} color="#4caf50" />
          <Text style={styles.numeroMetrica}>12</Text>
          <Text style={styles.labelMetrica}>Causas Apoiadas</Text>
        </View>
        <View style={styles.cardMetrica}>
          <Ionicons name="time" size={32} color="#2e7d32" />
          <Text style={styles.numeroMetrica}>48h</Text>
          <Text style={styles.labelMetrica}>Horas Dedicadas</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#e8f5e9' 
  },
  content: { 
    padding: 20 
  },
  headerBloco: { 
    backgroundColor: '#1b5e20', 
    padding: 20, 
    borderRadius: 16, 
    marginBottom: 25, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  textoHeaderContainer: { 
    flex: 1, 
    marginRight: 10 
  },
  saudacao: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#ffffff' 
  },
  subsaudacao: { 
    fontSize: 13, 
    color: '#e8f5e9', 
    marginTop: 5 
  },
  logoMini: {
    width: 65, 
    height: 65, 
    backgroundColor: '#ffffff', 
    borderRadius: 12, 
    padding: 5 
  }, 
  secaoTitulo: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333333', 
    marginBottom: 15 
  },
  grid: { 
    flexDirection: 'row', 
    gap: 15, 
    marginBottom: 25 
  },
  cardMetrica: { 
    flex: 1, 
    backgroundColor: '#ffffff', 
    padding: 20, 
    borderRadius: 12, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#e0e0e0' 
  },
  numeroMetrica: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#111111', 
    marginVertical: 5 
  },
  labelMetrica: { 
    fontSize: 12, 
    color: '#666666', 
    textAlign: 'center' 
  }
});
