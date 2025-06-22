import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListaScreen({ navigation }) {
  const [obras, setObras] = useState([]);

  const carregarObras = async () => {
    try {
      const obrasSalvas = await AsyncStorage.getItem('obras');
      if (obrasSalvas) {
        setObras(JSON.parse(obrasSalvas));
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar obras');
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarObras();
    }, [])
  );

  const removerObra = async (id) => {
    Alert.alert(
      'Confirmar',
      'Deseja realmente remover esta obra?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              const obrasAtualizadas = obras.filter(obra => obra.id !== id);
              await AsyncStorage.setItem('obras', JSON.stringify(obrasAtualizadas));
              setObras(obrasAtualizadas);
            } catch (error) {
              Alert.alert('Erro', 'Erro ao remover obra');
            }
          }
        }
      ]
    );
  };

  const renderObra = ({ item }) => (
    <View style={styles.obraCard}>
      <View style={styles.obraHeader}>
        <Text style={styles.obraNome}>{item.nomeObra}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.obraInfo}>📍 {item.endereco}</Text>
      <Text style={styles.obraInfo}>👤 {item.responsavel}</Text>
      <Text style={styles.obraInfo}>📅 Início: {item.dataInicio}</Text>
      {item.previsaoTermino && (
        <Text style={styles.obraInfo}>🏁 Previsão: {item.previsaoTermino}</Text>
      )}
      <Text style={styles.obraData}>Cadastrado em: {item.dataCadastro}</Text>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removerObra(item.id)}
      >
        <Text style={styles.removeButtonText}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Lista de Obras</Text>
      </View>

      {obras.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma obra cadastrada</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Cadastro')}
          >
            <Text style={styles.addButtonText}>Cadastrar Primeira Obra</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={obras}
          renderItem={renderObra}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f', // Cinza escuro
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#FFA500', // Laranja
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA500', // Laranja
    textAlign: 'center',
  },
  listContainer: {
    padding: 20,
  },
  obraCard: {
    backgroundColor: '#333333', // Cinza médio
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#555555', // Cinza claro
  },
  obraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  obraNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  statusBadge: {
    backgroundColor: '#FFA500', // Laranja
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#1f1f1f', // Cinza escuro
    fontWeight: 'bold',
  },
  obraInfo: {
    fontSize: 14,
    color: '#e2e8f0',
    marginBottom: 4,
  },
  obraData: {
    fontSize: 12,
    color: '#a0aec0',
    marginTop: 8,
    marginBottom: 12,
  },
  removeButton: {
    backgroundColor: '#cc5500', // Laranja queimado
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#a0aec0',
    textAlign: 'center',
    marginBottom: 30,
  },
  addButton: {
    backgroundColor: '#FFA500', // Laranja
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#1f1f1f', // Cinza escuro
    fontSize: 16,
    fontWeight: 'bold',
  },
});
