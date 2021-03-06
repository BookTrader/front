import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../telas/AcessoLivre/Login/Login';
import Register from "../telas/AcessoLivre/Register/Register";
import Feed from '../telas/AcessoLivre/Feed/Feed';
import DetalheAnuncio from '../telas/AcessoUsuario/Anuncio/DetalheAnuncio';
import { DrawerContent } from '../telas/Navegacao/DrawerContent';

const Drawer = createDrawerNavigator();

const LoginStack = createStackNavigator();
const FeedStack = createStackNavigator();

const LoginStackScreen = ({ navigation }) => (
    <LoginStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#e53945',
            },
            headerTintColor: '#FFF',
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}
    >
        <LoginStack.Screen
            name="Login"
            component={Login}
            options={{
                title: 'Entrar',
                headerLeft: () => (
                    <Ionicons
                        style={{ paddingLeft: 10 }}
                        name="ios-menu"
                        size={35}
                        backgroundColor="#e53945"
                        color="#FFF"
                        onPress={() => navigation.openDrawer()}
                    ></Ionicons>
                ),
            }}
        />

        <LoginStack.Screen
            name="Register"
            component={Register}
            options={{
                title: 'Cadastrar',
            }}
        />
    </LoginStack.Navigator>
);

const FeedStackScreen = ({ navigation }) => (
  <FeedStack.Navigator
      screenOptions={{
          headerStyle: {
              backgroundColor: '#e53945',

          },
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
          headerTitleStyle: {
              fontWeight: 'bold',
          },
      }}
  >
      <FeedStack.Screen
          name="Feed"
          component={Feed}
          options={{
            headerTitle: props => <Image
              style={{ width: 110, height: 20}}
              source={require('../../assets/Logo1.png')}
            />,
              headerLeft: () => (
                  <Ionicons
                      style={{ paddingLeft: 10,  }}
                      name="ios-menu"
                      size={35}
                      backgroundColor="#e53945"
                      color="#FFF"
                      onPress={() => navigation.openDrawer()}
                  ></Ionicons>
              ),
              headerRight: () => (
                <Ionicons
                    style={{ paddingRight: 10 }}
                    name="map-outline"
                    size={30}
                    backgroundColor="#e53945"
                    color="#FFF"
                ></Ionicons>
            ),
          }}
      />
      <FeedStack.Screen
        name="DetalheAnuncio"
        component={DetalheAnuncio}
        options={{
            title: 'Detalhe do Anuncio'
        }}
      />
  </FeedStack.Navigator>
);

const AuthRoutes = () => (
    <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="Feed"
    >
        <Drawer.Screen name="Login" component={LoginStackScreen} />
        <Drawer.Screen name="Feed" component={FeedStackScreen} />
    </Drawer.Navigator>
);

export default AuthRoutes;