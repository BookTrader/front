import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  StatusBar,
  Text,
  StyleSheet
} from 'react-native';
import { useAuth } from '../../context/auth';

export default function Feed() {

  const {usuario} = useAuth();
  
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar 
        barStyle="light-content"
        hidden={false}
        backgroundColor="#77242a"
      />
      <View>
        <Text>Bem-Vindo {usuario.usr_apelido}!</Text>
        <Text>Este é o seu email: {usuario.usr_email}</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECECEC',
  },
});