import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type TabParamList = {
  Perfil: { userName: string; interesses: string[] };
};

type PerfilScreenRouteProp = RouteProp<TabParamList, 'Perfil'>;
type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function PerfilScreen() {
  const route = useRoute<PerfilScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  
  const { userName, interesses: interessesIniciais } = route.params || { 
    userName: 'Voluntário Cadastrado', 
    interesses: ['Geral'] 
  };

  // Estado local para permitir que o diálogo mude os interesses dinamicamente na tela
  const [meusInteresses, setMeusInteresses] = useState<string[]>(interessesIniciais);

  const stringInteresses = meusInteresses.join(', ');

  // 2. Feedback de Ação: Componente de Diálogo Interativo para alteração de interesses
  const abrirDialogoInteresses = () => {
    Alert.alert(
      "🎯 Editar Interesses",
      "Qual causa você prefere priorizar hoje no ecossistema?",
      [
        {
          text: "📚 Educação",
          onPress: () => setMeusInteresses(["Educação"])
        },
        {
          text: "🌱 Meio Ambiente",
          onPress: () => setMeusInteresses(["Meio Ambiente"])
        },
        {
          text: "🏥 Saúde",
          onPress: () => setMeusInteresses(["Saúde"])
        },
        {
          text: "Cancelar",
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  };

  const deslogarConta = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.topTitulo}>Minha conta</Text>

      <View style={styles.cardListaContainer}>
        
        {/* Item 1: Interesses Dinâmicos + Gatilho de Diálogo */}
        <TouchableOpacity style={styles.itemMenu} onPress={abrirDialogoInteresses}>
          <View style={styles.itemEsquerdaContainer}>
            <View style={[styles.iconeFundo, { backgroundColor: '#ffebee' }]}>
              <Ionicons name="heart" size={22} color="#ff4444" />
            </View>
            <View style={styles.textoContainer}>
              <Text style={styles.tituloItem}>Meus Interesses</Text>
              <Text style={styles.subtituloItem} numberOfLines={1}>{stringInteresses}</Text>
            </View>
          </View>
          {/* Botão de Ação menor embutido para dar a dica de clique */}
          <Text style={styles.txtEditar}>Editar</Text>
          <Ionicons name="chevron-forward" size={18} color="#cccccc" />
        </TouchableOpacity>

        <View style={styles.divisor} />

        {/* Item 2: Minhas Inscrições / Histórico */}
        <TouchableOpacity style={styles.itemMenu}>
          <View style={styles.itemEsquerdaContainer}>
            <View style={[styles.iconeFundo, { backgroundColor: '#e8f5e9' }]}>
              <Ionicons name="clipboard" size={22} color="#4caf50" />
            </View>
            <View style={styles.textoContainer}>
              <Text style={styles.tituloItem}>Minhas Ações</Text>
              <Text style={styles.subtituloItem}>3 participações ativas</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#cccccc" />
        </TouchableOpacity>

        <View style={styles.divisor} />

        {/* Item 3: Notificações do Sistema */}
        <TouchableOpacity style={styles.itemMenu}>
          <View style={styles.itemEsquerdaContainer}>
            <View style={[styles.iconeFundo, { backgroundColor: '#fff8e1' }]}>
              <Ionicons name="notifications" size={22} color="#ffb300" />
            </View>
            <View style={styles.textoContainer}>
              <Text style={styles.tituloItem}>Notificações</Text>
              <Text style={styles.subtituloItem}>Ativadas</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#cccccc" />
        </TouchableOpacity>

        <View style={styles.divisor} />

        {/* Item 4: Configurações */}
        <TouchableOpacity style={styles.itemMenu}>
          <View style={styles.itemEsquerdaContainer}>
            <View style={[styles.iconeFundo, { backgroundColor: '#f3e5f5' }]}>
              <Ionicons name="settings" size={20} color="#9c27b0" />
            </View>
            <View style={styles.textoContainer}>
              <Text style={styles.tituloItem}>Configurações</Text>
              <Text style={styles.subtituloItem}>Conta e privacidade</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#cccccc" />
        </TouchableOpacity>

      </View>

      <TouchableOpacity style={styles.btnSairOutline} onPress={deslogarConta}>
        <Text style={styles.btnSairTexto}>Sair da conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e8f5e9' },
  content: { padding: 20 },
  topTitulo: { fontSize: 22, fontWeight: 'bold', color: '#3a221d', marginBottom: 20, marginTop: 10 },
  cardListaContainer: { 
    backgroundColor: '#ffffff', 
    borderRadius: 20, 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    shadowColor: '#1b5e20',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 3 
  },
  itemMenu: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  itemEsquerdaContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconeFundo: { width: 42, height: 42, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  textoContainer: { flex: 1 },
  tituloItem: { fontSize: 16, fontWeight: 'bold', color: '#3a221d' },
  subtituloItem: { fontSize: 13, color: '#9e9592', marginTop: 2 },
  txtEditar: { fontSize: 13, color: '#2e7d32', fontWeight: 'bold', marginRight: 5 },
  divisor: { height: 1, backgroundColor: '#f5eee9', marginLeft: 57 },
  btnSairOutline: { 
    marginTop: 25, 
    width: '100%', 
    height: 54, 
    borderRadius: 16, 
    borderWidth: 1.5, 
    borderColor: '#d32f2f', 
    backgroundColor: '#ffffff', 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#d32f2f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1
  },
  btnSairTexto: { color: '#d32f2f', fontWeight: 'bold', fontSize: 16 }
});