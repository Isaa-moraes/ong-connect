import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type LoginScreenNavProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const [emailDigitado, setEmailDigitado] = useState('');
  const [senha, setSenha] = useState('');

  const navigation = useNavigation<LoginScreenNavProp>();
  const route = useRoute<LoginScreenRouteProp>();

  // Captura os dados vindos do cadastro real (se existirem)
  const { dadosCadastrados } = route.params || {};

  const lidarComLogin = () => {
    if (!emailDigitado.trim() || !senha.trim()) {
      Alert.alert('⚠️ Erro', 'Preencha os campos de e-mail e senha.');
      return;
    }

    if (!dadosCadastrados) {
      Alert.alert('⚠️ Erro', 'Nenhuma conta encontrada com este e-mail. Por favor, cadastre-se primeiro.');
      return;
    }

    if (emailDigitado.trim().toLowerCase() !== dadosCadastrados.email.toLowerCase()) {
      Alert.alert('⚠️ Erro', 'E-mail ou senha incorretos.');
      return;
    }

    // CORREÇÃO AQUI: Passa o userName REAL que veio da memória do cadastro feito antes!
    navigation.replace('HomeTabs', {
      userName: dadosCadastrados.userName,
      email: dadosCadastrados.email,
      interesses: dadosCadastrados.interesses
    });
  };


  return (
    <View style={styles.container}>
      <View style={styles.cardLogin}>

        <Image
          source={require('../../assets/logo-branca.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.subtitulo}>Faça login para continuar suas ações</Text>

        <TextInput
          style={styles.input}
          placeholder="Seu E-mail" // Mudado para E-mail para simular um site real
          placeholderTextColor="#81c784"
          value={emailDigitado}
          onChangeText={setEmailDigitado}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Sua Senha"
          placeholderTextColor="#81c784"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.btnEntrar} onPress={lidarComLogin} activeOpacity={0.8}>
          <Text style={styles.btnTexto}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('CriarConta')} style={styles.linkContainer} activeOpacity={0.6}>
          <Text style={styles.linkTexto}>
            Primeira vez? <Text style={styles.linkDestaque}>Criar uma conta</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  cardLogin: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#a5d6a7',
    elevation: 4
  },
  logo: {
    width: 120, // Ajustado levemente para equilibrar com CriarContaScreen
    height: 120,
    marginBottom: 5,
    alignSelf: 'center'
  },
  subtitulo: {
    fontSize: 14,
    color: '#558b2f',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 25,
    fontWeight: '500'
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1.5,
    borderColor: '#4caf50',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    color: '#1b5e20'
  },
  btnEntrar: {
    backgroundColor: '#2e7d32',
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  btnTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  linkContainer: {
    marginTop: 22,
    alignItems: 'center'
  },
  linkTexto: {
    fontSize: 14,
    color: '#558b2f',
    fontWeight: '500'
  },
  linkDestaque: {
    color: '#1b5e20',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
});