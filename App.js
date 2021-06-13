import React from 'react';
import Login from './src/telas/AcessoLivre/Login';
import Register from './src/telas/AcessoLivre/Register/Register';
import Feed from './src/telas/AcessoLivre/Feed/Feed';
import CriarAnuncio from './src/telas/AcessoUsuario/Anuncio/CriarAnuncio';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import AuthProvider from './src/context/auth';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function DrawerRoutes() {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Feed" component={Feed} />
        <Drawer.Screen name="Criar um anúncio" component={CriarAnuncio} />
      </Drawer.Navigator>
  );
}
//Get data


function App() {
    return (
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Register">
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
                component={DrawerRoutes}
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

export default App;
