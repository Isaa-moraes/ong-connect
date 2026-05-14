import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import ONGCard from '../components/ONGCard';

const DADOS_ONGS = [
  { 
    id: '1', 
    nome: 'ONG VerdeCidade', 
    causa: 'Meio Ambiente', 
    imagem: require('../../assets/logohortaurbana.png'),
    descricao: 'Atua transformando espaços urbanos degradados e terrenos baldios em hortas comunitárias produtivas para famílias carentes.'
  },
  { 
    id: '2', 
    nome: 'Doutores do Riso', 
    causa: 'Saúde', 
    imagem: require('../../assets/logohortaurbana.png'),
    descricao: 'Leva palhaços voluntários e intervenções artísticas para alas de internação hospitalar, promovendo a saúde através do riso.'
  },
  { 
    id: '3', 
    nome: 'Aprender Sempre', 
    causa: 'Educação', 
    imagem: require('../../assets/logohortaurbana.png'),
    descricao: 'Oferece reforço escolar gratuito e alfabetização para jovens e adultos de baixa renda expandirem suas oportunidades.'
  },
  { 
    id: '4', 
    nome: 'Anjos de Patas', 
    causa: 'Causa Animal', 
    imagem: require('../../assets/logohortaurbana.png'),
    descricao: 'Resgata animais abandonados, promove assistência veterinária completa e organiza feiras de adoção responsável.'
  },
  { 
    id: '5', 
    nome: 'Pequenos Passos', 
    causa: 'Crianças', 
    imagem: require('../../assets/logohortaurbana.png'),
    descricao: 'Mantém creches e atividades esportivas no contraturno escolar para proteger e garantir o desenvolvimento infantil.'
  }
];

export default function ExplorarScreen() {
  const [ongs, setOngs] = useState<typeof DADOS_ONGS>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOngs(DADOS_ONGS);
      setCarregando(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (carregando) {
    return (
      <View style={styles.containerCentro}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text style={styles.textoCarregando}>Buscando organizações parceiras...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={ongs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ONGCard item={item} />}
        contentContainerStyle={styles.listaContent}
        ListHeaderComponent={
          <Text style={styles.subtitulo}>
            Explore projetos que precisam de ajuda perto de você.
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e8f5e9' },
  containerCentro: { flex: 1, backgroundColor: '#e8f5e9', justifyContent: 'center', alignItems: 'center', padding: 20 },
  textoCarregando: { marginTop: 12, fontSize: 15, color: '#2e7d32', fontWeight: '600' },
  listaContent: { padding: 20 },
  subtitulo: { fontSize: 15, color: '#2e7d32', marginBottom: 20, fontWeight: '500' },
});