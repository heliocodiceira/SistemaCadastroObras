import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroScreen({ navigation }) {
  const [nomeObra, setNomeObra] = useState('');
  const [endereco, setEndereco] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [previsaoTermino, setPrevisaoTermino] = useState('');

  const handleCadastrar = async () => {
    if (!nomeObra || !endereco || !responsavel || !dataInicio) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const obra = {
      id: Date.now().toString(),
      nomeObra,
      endereco,
      responsavel,
      dataInicio,
      previsaoTermino,
      status: 'Em andamento',
      dataCadastro: new Date().toLocaleDateString('pt-BR'),
    };

    try {
      const obrasSalvas = await AsyncStorage.getItem('obras');
      const obras = obrasSalvas ? JSON.parse(obrasSalvas) : [];
      obras.push(obra);
      await AsyncStorage.setItem('obras', JSON.stringify(obras));
      
      Alert.alert('Sucesso', 'Obra cadastrada com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
      
      // Limpar formulário
      setNomeObra('');
      setEndereco('');
      setResponsavel('');
      setDataInicio('');
      setPrevisaoTermino('');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar obra');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Cadastrar Nova Obra</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.label}>Nome da Obra *</Text>
          <TextInput
            style={styles.input}
            value={nomeObra}
            onChangeText={setNomeObra}
            placeholder="Digite o nome da obra"
            placeholderTextColor="#a0aec0"
          />

          <Text style={styles.label}>Endereço *</Text>
          <TextInput
            style={styles.input}
            value={endereco}
            onChangeText={setEndereco}
            placeholder="Digite o endereço"
            placeholderTextColor="#a0aec0"
          />

          <Text style={styles.label}>Responsável *</Text>
          <TextInput
            style={styles.input}
            value={responsavel}
            onChangeText={setResponsavel}
            placeholder="Nome do responsável"
            placeholderTextColor="#a0aec0"
          />

          <Text style={styles.label}>Data de Início *</Text>
          <TextInput
            style={styles.input}
            value={dataInicio}
            onChangeText={setDataInicio}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#a0aec0"
          />

          <Text style={styles.label}>Previsão de Término</Text>
          <TextInput
            style={styles.input}
            value={previsaoTermino}
            onChangeText={setPrevisaoTermino}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#a0aec0"
          />

          <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
            <Text style={styles.buttonText}>Cadastrar Obra</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a365d',
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
    color: '#ffd700',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  form: {
    paddingVertical: 20,
  },
  label: {
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#2d5a87',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#4a90a4',
  },
  button: {
    backgroundColor: '#ffd700',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#1a365d',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});