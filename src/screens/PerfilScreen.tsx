import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

// Importa a biblioteca de acesso ao hardware de mídia
import * as ImagePicker from 'expo-image-picker';

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

  // ESTADO DO HARDWARE: Armazena o endereço local da imagem escolhida pelo usuário
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);

  const obterIniciais = (nome: string) => {
    return nome.split(' ').map((n) => n).slice(0, 2).join('').toUpperCase();
  };

  // CONCEITO 1 E 2: Uso de Promises, Async/Await e Requisição de Permissões Nativa
  const abrirOpcoesFoto = () => {
    Alert.alert(
      "📸 Foto de Perfil",
      "Escolha de onde deseja puxar a sua imagem de voluntário:",
      [
        { text: "Tirar Foto (Câmera)", onPress: usarCamera },
        { text: "Escolher da Galeria", onPress: usarGaleria },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  // Fluxo 1: Acessar a Câmera Física
  const usarCamera = async () => {
    // Pede "por favor" ao sistema para abrir a câmera física (Permission)
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Precisamos de acesso à câmera para tirar sua foto.');
      return;
    }

    // Abre a câmera do aparelho de forma assíncrona (Promise)
    let resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true, // Abre o editor nativo para recortar a imagem em quadrado
      aspect: [1, 1],
      quality: 0.7, // Reduz levemente para não pesar na memória
    });

    // Se o usuário não cancelou a foto, salva o endereço local dela no estado
    if (!resultado.canceled && resultado.assets) {
      setFotoPerfil(resultado.assets[0].uri);
    }
  };

  // Fluxo 2: Acessar a Galeria de Fotos
  const usarGaleria = async () => {
    // Pede "por favor" ao sistema para abrir os arquivos de mídia (Permission)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Precisamos de acesso à galeria para buscar sua foto.');
      return;
    }

    // Abre os álbuns do aparelho de forma assíncrona (Promise)
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!resultado.canceled && resultado.assets) {
      setFotoPerfil(resultado.assets[0].uri);
    }
  };

  const abrirDialogoInteresses = () => {
    Alert.alert(
      "🎯 Editar Interesses",
      "Qual causa você prefere priorizar hoje no ecossistema?",
      [
        { text: "📚 Educação", onPress: () => setMeusInteresses(["Educação"]) },
        { text: "🌱 Meio Ambiente", onPress: () => setMeusInteresses(["Meio Ambiente"]) },
        { text: "🐾 Causa Animal", onPress: () => setMeusInteresses(["Causa Animal"]) },
        { text: "Cancelar", style: "cancel" }
      ],
      { cancelable: true }
    );
  };

  const deslogarConta = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Cabeçalho com Avatar Clicável para o Hardware */}
      <View style={styles.avatarSeccao}>
        <TouchableOpacity style={styles.avatarCirculo} onPress={abrirOpcoesFoto} activeOpacity={0.8}>
          {fotoPerfil ? (
            // Exibe a foto selecionada do hardware
            <Image source={{ uri: fotoPerfil }} style={styles.fotoReal} />
          ) : (
            // Fallback: Se não tiver foto, mostra as iniciais textuais padrão
            <Text style={styles.avatarTexto}>{obterIniciais(userName)}</Text>
          )}

          {/* Ícone de câmera flutuante que estava faltando no seu JSX */}
          <View style={styles.iconeCameraFlutuante}>
            <Ionicons name="camera" size={14} color="#ffffff" />
          </View>
        </TouchableOpacity>

        {/* Agora exibindo o userName dinâmico transmitido corretamente */}
        <Text style={styles.userNameTexto}>{userName}</Text>
        <Text style={styles.userSubTexto}>Membro ativo do ecossistema</Text>
      </View>


      <Text style={styles.topTitulo}>Minha conta</Text>

      <View style={styles.cardListaContainer}>
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
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9'
  },
  content: {
    padding: 20
  },
  avatarSeccao: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25
  },
  avatarCirculo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1b5e20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#1b5e20',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    position: 'relative' // Necessário para fixar o ícone da câmera por cima
  },
  fotoReal: {
    width: '100%',
    height: '100%',
    borderRadius: 40, // Mantém a foto redonda dentro do círculo
  },
  avatarTexto: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1
  },
  iconeCameraFlutuante: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2e7d32',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ffffff'
  },
  userNameTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1b5e20'
  },
  userSubTexto: {
    fontSize: 12,
    color: '#558b2f',
    marginTop: 2,
    fontWeight: '500'
  },
  topTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1b5e20',
    marginBottom: 12
  },
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
  itemMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14
  },
  itemEsquerdaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  iconeFundo: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },
  textoContainer: {
    flex: 1
  },
  tituloItem: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  subtituloItem: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 2
  },
  txtEditar: {
    fontSize: 13,
    color: '#1b5e20',
    fontWeight: 'bold',
    marginRight: 5
  },
  divisor: {
    height: 1,
    backgroundColor: '#f1f2f6',
    marginLeft: 57
  },
  btnSairOutline: {
    marginTop: 25,
    width: '100%',
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#d32f2f',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnSairTexto: {
    color: '#d32f2f',
    fontWeight: 'bold',
    fontSize: 15
  }
});