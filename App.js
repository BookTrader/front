import React, {useState, useEffect} from 'react';
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, Text, StyleSheet, Animated, Keyboard, StatusBar } from 'react-native';

export default function App() {

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [logo] = useState(new Animated.ValueXY({x: 200, y: 201}));


  useEffect(()=> {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);


    Animated.spring(offset.y, {
      toValue: 0,
      speed: 4,
      bounciness: 30,
      useNativeDriver: false
    }).start();
  }, []);

  function keyboardDidShow(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 100,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 101,
        duration: 200,
        useNativeDriver: false,
      })
    ]).start();
  }

  function keyboardDidHide(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 200,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 201,
        duration: 200,
        useNativeDriver: false,
      })
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
        <StatusBar/>
        <View style={styles.containerLogo}>
            <Animated.Image
            style={
              {
                width: logo.x,
                height: logo.y,
              }
            }
              source={require('./assets/logo.png')}
            />
        </View>

        <Animated.View style={[styles.container,
          {
            transform: [
              {
                translateY: offset.y
              }
            ]
          }
        ]}>
            <TextInput style={styles.input}
            placeholder="Email"
            autoCorrect={false}
            onChangeText={()=> {}}
            />

          <TextInput secureTextEntry={true} style={styles.input}
            placeholder="Senha"
            autoCorrect={false}
            onChangeText={()=> {}}
            />

          <TouchableOpacity style={styles.btnSubmit}>
            <Text  style={styles.btnSubmitText}>
                Acessar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnRegister}>
            <Text style={styles.btnRegisterText}>
                Não possui uma conta? Cadastre-se
            </Text>
          </TouchableOpacity>
        </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242424'
  },
  containerLogo:{
    flex:1,
    justifyContent: 'center',
  },
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50,
  },
  input:{
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom:15,
    color: '#242424',
    fontSize: 17,
    borderRadius: 5,
    padding: 10,
  },
  btnSubmit:{
    backgroundColor: '#e0ac21',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnSubmitText:{
    color: '#FFF',
    fontSize: 18,
  },
  btnRegister:{
    marginTop:10,
  },
  btnRegisterText:{
    color: '#FFF',
  },
});
