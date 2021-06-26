import React from 'react';

import Login from './src/telas/AcessoLivre/Login/Login';
import Register from './src/telas/AcessoLivre/Register/Register';
import Feed from './src/telas/AcessoLivre/Feed/Feed';
import CriarAnuncio from './src/telas/AcessoUsuario/Anuncio/CriarAnuncio';
import { DrawerContent } from './src/telas/Navegacao/DrawerContent';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons } from '@expo/vector-icons';


import AuthProvider from './src/context/auth';

const FeedStack = createStackNavigator();
const LoginStack = createStackNavigator();
const CriarAnuncioStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const FeedStackScreen = ({navigation}) => (
  <FeedStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor:  '#e53945',
    },
    headerTintColor: '#FFF',
    headerTitleAlign: 'center',
    headerTitleStyle:{
      fontWeight:'bold'
    }
  }}>
      <FeedStack.Screen  name="Feed" component={Feed} options={{
          title: 'AlleyBook',
          headerLeft: () => (
            <Ionicons style={{paddingLeft: 10}} name="ios-menu" size={35}
            backgroundColor="#e53945" color="#FFF" onPress={() => navigation.openDrawer()}></Ionicons>
          )
        }}
      />
</FeedStack.Navigator>
)

const CriarAnuncioStackScreen = ({navigation}) => (
  <CriarAnuncioStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor:  '#e53945',
    },
    headerTintColor: '#FFF',
    headerTitleAlign: 'center',
    headerTitleStyle:{
      fontWeight:'bold'
    }
  }}>
      <CriarAnuncioStack.Screen  name="CriarAnuncio" component={CriarAnuncio} options={{
          title: 'Criar um anúncio',
          headerLeft: () => (
            <Ionicons style={{paddingLeft: 10}} name="ios-menu" size={35}
            backgroundColor="#e53945" color="#FFF" onPress={() => navigation.openDrawer()}></Ionicons>
          )
        }}
      />
</CriarAnuncioStack.Navigator>
)

const LoginStackScreen = ({navigation}) => (
  <LoginStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor:  '#e53945',
    },
    headerTintColor: '#FFF',
    headerTitleAlign: 'center',
    headerTitleStyle:{
      fontWeight:'bold'
    }
  }}>
      <LoginStack.Screen name="Login" component={Login} options={{
        title: 'Entrar',
        headerLeft: () => (
          <Ionicons style={{paddingLeft: 10}} name="ios-menu" size={35}
          backgroundColor="#e53945" color="#FFF" onPress={() => navigation.openDrawer()}></Ionicons>
        )
      }}
      />

      <LoginStack.Screen name="Register"  component={Register} options={{
        title: 'Cadastrar'
      }}
      />
</LoginStack.Navigator>
)


function App() {
    return (
      <AuthProvider>
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <DrawerContent { ... props} />} initialRouteName="CriarAnuncio">
                <Drawer.Screen name="Feed" component={FeedStackScreen} />
                <Drawer.Screen name="Login" component={LoginStackScreen} />
                <Drawer.Screen name="CriarAnuncio" component={CriarAnuncioStackScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
      </AuthProvider>
    );
}

export default App;
