import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type CriarContaNavProp = StackNavigationProp<RootStackParamList, 'CriarConta'>;

export default function CriarContaScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation<CriarContaNavProp>();

  const avançarInteresses = () => {
    // 1. Validação de campos vazios
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert('⚠️ Campos vazios', 'Preencha todos os campos para se cadastrar.');
      return;
    }

    // 2. Nova Validação: Formato de e-mail
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('⚠️ E-mail inválido', 'Por favor, insira um endereço de e-mail válido.');
      return;
    }

    // 3. Nova Validação: Tamanho da senha
    if (senha.length < 6) {
      Alert.alert('⚠️ Senha curta', 'A sua senha deve conter pelo menos 6 caracteres.');
      return;
    }

    // Passa os parâmetros tipados incluindo a origem para a tela de causas saber de onde veio
    navigation.navigate('Interesses', { 
      userName: nome.trim(), 
      email: email.trim(),
      origem: 'cadastro'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Image 
          source={require('../../assets/logo-branca.png')} 
          style={styles.logoApp}
          resizeMode="contain"
        />

        <Text style={styles.subtitulo}>Junte-se à nossa rede de solidariedade</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Nome Completo" 
          placeholderTextColor="#81c784"
          value={nome} 
          onChangeText={setNome} 
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="E-mail" 
          placeholderTextColor="#81c784"
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address" 
          autoCapitalize="none" 
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Senha de Acesso" 
          placeholderTextColor="#81c784"
          value={senha} 
          onChangeText={setSenha} 
          secureTextEntry 
        />

        <TouchableOpacity style={styles.btnAvançar} onPress={avançarInteresses} activeOpacity={0.8}>
          <Text style={styles.btnTexto}>Avançar</Text>
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
  card: { 
    width: '100%', 
    maxWidth: 360, 
    backgroundColor: '#ffffff', 
    padding: 25, 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: '#a5d6a7', 
    elevation: 4, 
    alignItems: 'center' 
  },
  logoApp: { 
    width: 100, 
    height: 100, 
    marginBottom: 5 
  },
  subtitulo: { 
    fontSize: 14, 
    color: '#558b2f', // Alterado para um tom verde para combinar com o app
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
  btnAvançar: { 
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
  }
});