import React from 'react';
import Login from './src/telas/Login';
import Register from './src/telas/Register/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

//Get data


export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
            name="Login" 
            component={Login}
            options={{
              title: 'Entrar',
              headerStyle:{
                backgroundColor: '#e53945'
              },
              headerTintColor: '#FFF'
            }}
            />

            <Stack.Screen 
            name="Register" 
            component={Register}
            options={{
              title: 'Cadastrar',
              headerStyle:{
                backgroundColor: '#e53945'
              },
              headerTintColor: '#FFF'
            }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
