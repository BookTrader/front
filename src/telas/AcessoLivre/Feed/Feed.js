import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
//import { useAuth } from '../../../context/auth';

export default function Feed({ navigation }) {


    return (
    <KeyboardAvoidingView style={styles.container}>
        <StatusBar 
        barStyle="light-content"
        hidden={false}
        backgroundColor="#77242a"
        />
        <View style={styles.navegacao}>
          <Text>Feed</Text>
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
  texto:{
    fontSize: 18,
    marginBottom: 30,
  },
  Dinamico:{
    color: '#e53945',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  navegacao:{
    alignSelf: 'stretch',
    paddingHorizontal: 30,
  },    
  btnNavegacao: {
    backgroundColor: '#e53945',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#242424',
    height: 44,
    marginBottom: 5,
    borderRadius: 5,
},
btnNavegacaoText: {
    color: '#FFF',
    fontSize: 18,
},
});