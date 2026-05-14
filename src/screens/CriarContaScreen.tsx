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
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert('⚠️ Campos vazios', 'Preencha todos os campos para se cadastrar.');
      return;
    }
    navigation.navigate('Interesses', { userName: nome.trim(), email: email.trim() });
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

        <TextInput style={styles.input} placeholder="Nome Completo" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Senha de Acesso" value={senha} onChangeText={setSenha} secureTextEntry />

        <TouchableOpacity style={styles.btnAvançar} onPress={avançarInteresses}>
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
    width: 120, 
    height: 120, 
    marginBottom: 5 
  },
  subtitulo: { 
    fontSize: 13, 
    color: '#666666', 
    textAlign: 'center', 
    marginTop: 5, 
    marginBottom: 25 
  },
  input: { 
    width: '100%', 
    height: 50, 
    borderWidth: 1.5, 
    borderColor: '#4caf50', 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    fontSize: 16, 
    marginBottom: 15 
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
