import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type InteressesScreenRouteProp = RouteProp<RootStackParamList, 'Interesses'>;
type InteressesScreenNavProp = StackNavigationProp<RootStackParamList, 'Interesses'>;

const OPCOES_INTERESSES = ['Saúde', 'Educação', 'Meio Ambiente', 'Crianças', 'Causa Animal', 'Idosos'];

export default function InteressesScreen() {
  const route = useRoute<InteressesScreenRouteProp>();
  const navigation = useNavigation<InteressesScreenNavProp>();
  const { userName, email } = route.params;

  const [selecionados, setSelecionados] = useState<string[]>([]);

  const alternarInteresse = (interesse: string) => {
    if (selecionados.includes(interesse)) {
      setSelecionados(selecionados.filter((i) => i !== interesse));
    } else {
      setSelecionados([...selecionados, interesse]);
    }
  };

  const concluirCadastro = () => {
    if (selecionados.length === 0) {
      Alert.alert('💡 Dica', 'Selecione pelo menos uma área de interesse para podermos te guiar melhor.');
      return;
    }
    // Entra no App enviando Nome, Email e o Array com todos os Interesses marcados
    navigation.navigate('HomeTabs', { userName, email, interesses: selecionados });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>🎯 Suas Causas</Text>
        <Text style={styles.subtitulo}>Selecione as áreas que você mais se identifica para personalizarmos sua jornada:</Text>

        <View style={styles.grid}>
          {OPCOES_INTERESSES.map((item) => {
            const isSelected = selecionados.includes(item);
            return (
              <TouchableOpacity
                key={item}
                style={[styles.tag, isSelected && styles.tagSelecionada]}
                onPress={() => alternarInteresse(item)}
              >
                <Text style={[styles.tagTexto, isSelected && styles.tagTextoSelecionado]}>
                  {isSelected ? `✓ ${item}` : item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.btnConcluir} onPress={concluirCadastro}>
          <Text style={styles.btnTexto}>Concluir e Entrar</Text>
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
    maxWidth: 380, 
    backgroundColor: '#ffffff', 
    padding: 25, 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: '#a5d6a7', 
    elevation: 4 
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1b5e20', 
    textAlign: 'center' 
  },
  subtitulo: { 
    fontSize: 14, 
    color: '#555555', 
    textAlign: 'center', 
    marginTop: 8, 
    marginBottom: 20, 
    lineHeight: 20 
  },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 10, 
    justifyContent: 'center', 
    marginBottom: 25 
  },
  tag: { 
    paddingVertical: 10, 
    paddingHorizontal: 16, 
    borderRadius: 20, 
    borderWidth: 2, 
    borderColor: '#4caf50', 
    backgroundColor: '#ffffff' 
  },
  tagSelecionada: { 
    backgroundColor: '#2e7d32', 
    borderColor: '#2e7d32' 
  },
  tagTexto: { 
    color: '#2e7d32', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
  tagTextoSelecionado: { 
    color: '#ffffff' 
  },
  btnConcluir: { 
    backgroundColor: '#2e7d32', 
    width: '100%', 
    height: 50, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  btnTexto: { 
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});