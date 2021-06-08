import React from 'react';
import Login from './src/telas/userAccess/Login';
import Register from './src/telas/userAccess/Register/Register';
import Feed from './src/telas/Feed/Feed';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthProvider from './src/context/auth';

const Stack = createStackNavigator();

//Get data


export default function App() {
    return (
      <AuthProvider>
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

              <Stack.Screen 
                name="Feed" 
                component={Feed}
                options={{
                  title: 'Feed',
                  headerStyle:{
                    backgroundColor: '#e53945'
                  },
                  headerTintColor: '#FFF'
                }}
              />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    );
}
