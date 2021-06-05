import React from 'react';
import Login from './src/telas/Login';
import Register from './src/telas/Register/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
            name="Login" 
            component={Login}
            options={{headerShown: false}}
            />

            <Stack.Screen 
            name="Register" 
            component={Register}
            options={{
              title: 'Cadastre-se',
              headerStyle:{
                backgroundColor: '#e0ac21'
              },
              headerTintColor: '#FFF'
            }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
