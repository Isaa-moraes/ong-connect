import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';

type TabParamList = {
  Dashboard: { userName: string };
};

type DashboardRouteProp = RouteProp<TabParamList, 'Dashboard'>;

// Dados mockados para a nova seção de próximos eventos
const PROXIMOS_EVENTOS = [
  { id: '1', titulo: 'Mutirão Horta Comunitária', data: 'Sáb, 08 Ago • 09:00', ong: 'ONG VerdeCidade', icone: 'leaf' },
  { id: '2', titulo: 'Visita Hospitalar Artística', data: 'Ter, 11 Ago • 14:00', ong: 'Doutores do Riso', icone: 'happy' },
];

export default function DashboardScreen() {
  const route = useRoute<DashboardRouteProp>();
  const { userName } = route.params || { userName: 'Voluntário' };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Bloco de Cabeçalho */}
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

      {/* Resumo de Atividades */}
      <Text style={styles.secaoTitulo}>Resumo de Atividades</Text>
      <View style={styles.grid}>
        <View style={styles.cardMetrica}>
          <Ionicons name="heart" size={30} color="#2e7d32" />
          <Text style={styles.numeroMetrica}>12</Text>
          <Text style={styles.labelMetrica}>Causas Apoiadas</Text>
        </View>
        <View style={styles.cardMetrica}>
          <Ionicons name="time" size={30} color="#2e7d32" />
          <Text style={styles.numeroMetrica}>48h</Text>
          <Text style={styles.labelMetrica}>Horas Dedicadas</Text>
        </View>
      </View>

      {/* Seção Nova: Próximas Atividades/Eventos */}
      <Text style={styles.secaoTitulo}>Próximas Atividades</Text>
      {PROXIMOS_EVENTOS.map((evento) => (
        <TouchableOpacity key={evento.id} style={styles.cardEvento} activeOpacity={0.7}>
          <View style={styles.iconeEventoContainer}>
            <Ionicons name={evento.icone as any} size={22} color="#2e7d32" />
          </View>
          <View style={styles.infoEvento}>
            <Text style={styles.tituloEvento} numberOfLines={1}>{evento.titulo}</Text>
            <Text style={styles.ongEvento}>{evento.ong}</Text>
            <Text style={styles.dataEvento}>{evento.data}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#a5d6a7" />
        </TouchableOpacity>
      ))}

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
    color: '#c8e6c9', 
    marginTop: 5 
  },
  logoMini: {
    width: 60, 
    height: 60, 
    backgroundColor: '#ffffff', 
    borderRadius: 12, 
  }, 
  secaoTitulo: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#1b5e20', 
    marginBottom: 12,
    marginTop: 5
  },
  grid: { 
    flexDirection: 'row', 
    gap: 15, 
    marginBottom: 25 
  },
  cardMetrica: { 
    flex: 1, 
    backgroundColor: '#ffffff', 
    paddingHorizontal: 15,
    paddingVertical: 18, 
    borderRadius: 14, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#c8e6c9',
    elevation: 2,
    shadowColor: '#1b5e20',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  numeroMetrica: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1b5e20', 
    marginVertical: 4 
  },
  labelMetrica: { 
    fontSize: 12, 
    color: '#558b2f', 
    textAlign: 'center',
    fontWeight: '500'
  },
  cardEvento: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#c8e6c9',
    elevation: 2,
    shadowColor: '#1b5e20',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  iconeEventoContainer: {
    backgroundColor: '#e8f5e9',
    padding: 10,
    borderRadius: 10,
    marginRight: 12,
  },
  infoEvento: {
    flex: 1,
  },
  tituloEvento: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1b5e20',
  },
  ongEvento: {
    fontSize: 12,
    color: '#558b2f',
    marginTop: 1,
  },
  dataEvento: {
    fontSize: 11,
    color: '#757575',
    marginTop: 3,
    fontWeight: '500',
  },
});