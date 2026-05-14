import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type LoginScreenNavProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation<LoginScreenNavProp>();

  const lidarComLogin = () => {
    if (!nome.trim() || !senha.trim()) {
      Alert.alert('⚠️ Erro', 'Preencha os campos de nome e senha.');
      return;
    }
    // No login direto, passa o nome coletado e interesses genéricos padrão
    navigation.navigate('HomeTabs', { userName: nome.trim(), email: '', interesses: ['Geral'] });
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

        <TextInput style={styles.input} placeholder="Seu Nome" value={nome} onChangeText={setNome} autoCapitalize="words" />
        <TextInput style={styles.input} placeholder="Sua Senha" value={senha} onChangeText={setSenha} secureTextEntry />

        <TouchableOpacity style={styles.btnEntrar} onPress={lidarComLogin}>
          <Text style={styles.btnTexto}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('CriarConta')} style={styles.linkContainer}>
          <Text style={styles.linkTexto}>Primeira vez? <Text style={styles.linkDestaque}>Criar uma conta</Text></Text>
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
    width: 140, 
    height: 140, 
    marginBottom: 5, 
    alignSelf: 'center' 
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
    marginBottom: 15, 
    color: '#111' 
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
    marginTop: 20, 
    alignItems: 'center' 
  },
  linkTexto: { 
    fontSize: 14, 
    color: '#666666' 
  },
  linkDestaque: { 
    color: '#2e7d32', 
    fontWeight: 'bold', 
    textDecorationLine: 'underline' 
   }
});
