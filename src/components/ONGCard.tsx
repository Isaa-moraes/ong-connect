import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ImageSourcePropType, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ONGProps {
  item: {
    id: string;
    nome: string;
    causa: string;
    imagem: ImageSourcePropType;
    descricao: string; 
    cidade?: string; // Adicionado como opcional para não quebrar os dados atuais
  };
}

const { width } = Dimensions.get('window');

export default function ONGCard({ item }: ONGProps) {
  
  const exibirDetalhes = () => {
    Alert.alert(
      `📖 Sobre a ${item.nome}`,
      item.descricao,
      [{ text: 'Entendi', style: 'default' }]
    );
  };

  return (
    <TouchableOpacity style={styles.card} onPress={exibirDetalhes} activeOpacity={0.8}>
      <Image 
        source={item.imagem} 
        style={styles.imagemOng}
        resizeMode="cover"
      />
      
      <View style={styles.infoContainer}>
        <Text style={styles.tagCausa}>{item.causa}</Text>
        <Text style={styles.nomeOng} numberOfLines={1}>{item.nome}</Text>
        
        {/* Descrição curta para dar contexto rápido antes do clique */}
        <Text style={styles.descricaoCurta} numberOfLines={2}>
          {item.descricao}
        </Text>
        
        <View style={styles.localContainer}>
          <Ionicons name="location" size={14} color="#2e7d32" />
          <Text style={styles.localTexto}>{item.cidade || 'Clique para saber mais'}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.btnApoiar} onPress={exibirDetalhes}>
        <Text style={styles.btnTexto}>Apoiar</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5eee9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    shadowColor: '#1b5e20',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4, 
  },
  imagemOng: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  tagCausa: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  nomeOng: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1b5e20', // Ajustado para conversar com a paleta verde do app
  },
  descricaoCurta: {
    fontSize: 13,
    color: '#555555',
    marginTop: 2,
    lineHeight: 16,
  },
  localContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  localTexto: {
    fontSize: 12,
    color: '#757575',
  },
  btnApoiar: {
    backgroundColor: '#2e7d32', // Cor verde escura alinhada ao tema geral
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    minHeight: 44, 
    justifyContent: 'center',
  },
  btnTexto: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});