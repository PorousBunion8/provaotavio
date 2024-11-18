import React from 'react';
import { Text, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import UVv_Campus from '../assets/UVv_Campus.jpg';

export default function MainPage() {
  return (
    <ImageBackground style={styles.background} source={UVv_Campus}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeMessage}>Bem-vindo à nossa aplicação!</Text>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#021E73',
  },
});
