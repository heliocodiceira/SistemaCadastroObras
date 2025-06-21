import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

// Ícone simples sem SVG
function SimpleIcon() {
  return (
    <View style={iconStyles.container}>
      <Text style={iconStyles.helmet}>🟡</Text>
      <Text style={iconStyles.tools}>🔧⚒️</Text>
      <Text style={iconStyles.checklist}>📋</Text>
    </View>
  );
}

const iconStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  helmet: {
    fontSize: 40,
    marginRight: 10,
  },
  tools: {
    fontSize: 30,
    marginRight: 10,
  },
  checklist: {
    fontSize: 35,
  },
});

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <SimpleIcon />
        </View>
        
        <Text style={styles.title}>Cadastro de Obras em Andamento</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Cadastro')}
          >
            <Text style={styles.buttonText}>Cadastrar Nova Obra</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Lista')}
          >
            <Text style={styles.buttonText}>Listar Obras</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.subtitle}>
          Redirecionando para o Cadastro de Obra...
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a365d',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  iconContainer: {
    marginBottom: 40,
    backgroundColor: '#2d5a87',
    padding: 30,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 50,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#ffd700',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: '#1a365d',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#a0aec0',
    textAlign: 'center',
  },
});