import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Button, ImageBackground, View, TextInput, Image } from 'react-native';
import UVv_Campus from '../assets/UVv_Campus.jpg';
import UVv_Logo from '../assets/UVV.png';
import { supabase } from '../Utils/supabase'; // Importando o supabase

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para armazenar mensagem de erro

  // Função para o login
  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.'); // Exibe mensagem se faltar campo
      return;
    }

    try {
      // Usando a autenticação do Supabase para login com email e senha
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error('Erro ao fazer login:', error.message);
        setErrorMessage('Ocorreu um erro ao verificar suas credenciais.');
        return;
      }

      // Se o login for bem-sucedido, redireciona para a página principal
      if (data) {
        navigation.navigate('Main');
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      setErrorMessage('Ocorreu um erro inesperado. Tente novamente.');
    }
  };

  return (
    <ImageBackground style={styles.background} source={UVv_Campus}>
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={UVv_Logo} />

        <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry={true}
        />

        {/* Exibe a mensagem de erro se houver */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Login"
              color="#021E73"
              onPress={handleLogin} // Chama a função de login
            />
          </View>

          <View style={styles.button}>
            <Button
              title="Registrar"
              color="#021E73"
              onPress={() => navigation.navigate('Register')} // Navega para a página de registro
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '85%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#ffffffcc',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: '#021E73',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 8,
    color: '#333',
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    width: '60%',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});
