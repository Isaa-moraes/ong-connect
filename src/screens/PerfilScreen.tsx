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

  const [meusInteresses, setMeusInteresses] = useState<string[]>(interessesIniciais);
  const stringInteresses = meusInteresses.join(', ');

  // Gera as iniciais do nome do usuário para o Avatar
  const obterIniciais = (nome: string) => {
    return nome
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const abrirDialogoInteresses = () => {
    // Apaga o Alert e chama a tela visual de interesses que você já criou
    navigation.navigate('Interesses', { origem: 'perfil' });
  };


  const deslogarConta = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Novo Cabeçalho com Avatar de Voluntário */}
      <View style={styles.avatarSeccao}>
        <View style={styles.avatarCirculo}>
          <Text style={styles.avatarTexto}>{obterIniciais(userName)}</Text>
        </View>
        <Text style={styles.userNameTexto}>{userName}</Text>
        <Text style={styles.userSubTexto}>Membro ativo do ecossistema</Text>
      </View>

      <Text style={styles.topTitulo}>Minha conta</Text>

      <View style={styles.cardListaContainer}>

        {/* Item 1: Interesses Dinâmicos */}
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
          <Text style={styles.txtEditar}>Editar</Text>
          <Ionicons name="chevron-forward" size={18} color="#cccccc" />
        </TouchableOpacity>

        <View style={styles.divisor} />

        {/* Item 2: Minhas Inscrições / Histórico */}
        <TouchableOpacity style={styles.itemMenu}>
          <View style={styles.itemEsquerdaContainer}>
            <View style={[styles.iconeFundo, { backgroundColor: '#e8f5e9' }]}>
              <Ionicons name="clipboard" size={22} color="#1b5e20" />
            </View>
            <View style={styles.textoContainer}>
              <Text style={styles.tituloItem}>Minhas Ações</Text>
              <Text style={styles.subtituloItem}>3 participações ativas</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#cccccc" />
        </TouchableOpacity>

        <View style={styles.divisor} />

        {/* Item 3: Notificações */}
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

  // Novos estilos criados para o Cabeçalho com Avatar:
  avatarSeccao: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  avatarCirculo: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: '#1b5e20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#1b5e20',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  avatarTexto: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  userNameTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1b5e20',
  },
  userSubTexto: {
    fontSize: 12,
    color: '#558b2f',
    marginTop: 2,
    fontWeight: '500',
  },

  topTitulo: { fontSize: 16, fontWeight: '700', color: '#1b5e20', marginBottom: 12 },
  cardListaContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
    shadowColor: '#1b5e20',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3
  },
  itemMenu: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  itemEsquerdaContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconeFundo: { width: 42, height: 42, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  textoContainer: { flex: 1 },
  tituloItem: { fontSize: 15, fontWeight: 'bold', color: '#2c3e50' },
  subtituloItem: { fontSize: 13, color: '#7f8c8d', marginTop: 2 },
  txtEditar: { fontSize: 13, color: '#1b5e20', fontWeight: 'bold', marginRight: 5 },
  divisor: { height: 1, backgroundColor: '#f1f2f6', marginLeft: 57 },
  btnSairOutline: {
    marginTop: 25,
    width: '100%',
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#d32f2f',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSairTexto: { color: '#d32f2f', fontWeight: 'bold', fontSize: 15 }
});