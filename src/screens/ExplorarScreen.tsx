import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, TouchableOpacity, ScrollView } from 'react-native';
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

// Lista de causas com base nos dados reais do projeto para alimentar os botões
const CATEGORIAS = ['Todas', 'Meio Ambiente', 'Saúde', 'Educação', 'Causa Animal', 'Crianças'];

export default function ExplorarScreen() {
  const [ongs, setOngs] = useState<typeof DADOS_ONGS>([]);
  const [carregando, setCarregando] = useState(true);
  
  // 1. Novos estados para controlar o filtro e o texto buscado
  const [busca, setBusca] = useState('');
  const [causaSelecionada, setCausaSelecionada] = useState('Todas');

  useEffect(() => {
    const timer = setTimeout(() => {
      setOngs(DADOS_ONGS);
      setCarregando(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 2. Filtragem em tempo real utilizando useMemo para performance
  const ongsFiltradas = useMemo(() => {
    return ongs.filter((ong) => {
      const atendeBusca = ong.nome.toLowerCase().includes(busca.toLowerCase());
      const atendeCausa = causaSelecionada === 'Todas' || ong.causa === causaSelecionada;
      return atendeBusca && atendeCausa;
    });
  }, [busca, causaSelecionada, ongs]);

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
        data={ongsFiltradas} // 3. Passando a lista filtrada em vez da lista cheia
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ONGCard item={item} />}
        contentContainerStyle={styles.listaContent}
        ListEmptyComponent={ // 4. Mensagem caso nenhum critério dê match
          <View style={styles.containerVazio}>
            <Text style={styles.textoVazio}>Nenhuma ONG encontrada com esses filtros.</Text>
          </View>
        }
        ListHeaderComponent={ // 5. Injetando a barra e os botões no topo rolável da lista
          <View>
            <Text style={styles.subtitulo}>
              Explore projetos que precisam de ajuda perto de você.
            </Text>

            {/* Input de Pesquisa por Texto */}
            <TextInput
              style={styles.inputBusca}
              placeholder="Digite o nome da ONG..."
              placeholderTextColor="#81c784"
              value={busca}
              onChangeText={setBusca}
            />

            {/* Carrossel Horizontal de Filtros por Causa */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.carrosselCategorias}
              contentContainerStyle={styles.carrosselContent}
            >
              {CATEGORIAS.map((causa) => {
                const ativa = causaSelecionada === causa;
                return (
                  <TouchableOpacity
                    key={causa}
                    style={[styles.botaoFiltro, ativa && styles.botaoFiltroAtivo]}
                    onPress={() => setCausaSelecionada(causa)}
                  >
                    <Text style={[styles.textoFiltro, ativa && styles.textoFiltroAtivo]}>
                      {causa}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
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
  subtitulo: { fontSize: 15, color: '#2e7d32', marginBottom: 15, fontWeight: '500' },
  
  // Novos estilos criados para o filtro:
  inputBusca: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c8e6c9',
    fontSize: 15,
    color: '#1b5e20',
    marginBottom: 15,
  },
  carrosselCategorias: {
    marginBottom: 20,
    marginHorizontal: -20, // Expande para as bordas da tela
  },
  carrosselContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  botaoFiltro: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#a5d6a7',
  },
  botaoFiltroAtivo: {
    backgroundColor: '#2e7d32',
    borderColor: '#2e7d32',
  },
  textoFiltro: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '500',
  },
  textoFiltroAtivo: {
    color: '#ffffff',
    fontWeight: '600',
  },
  containerVazio: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  textoVazio: {
    fontSize: 15,
    color: '#558b2f',
    textAlign: 'center',
  }
});