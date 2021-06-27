import React from 'react'
import { Ionicons } from '@expo/vector-icons';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../telas/AcessoLivre/Login/Login';
import Register from "../telas/AcessoLivre/Register/Register";
import Feed from '../telas/AcessoLivre/Feed/Feed';
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
              title: 'AlleyBook',
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
  </FeedStack.Navigator>
);

const AuthRoutes = () => (
    <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="Login"
    >
        <Drawer.Screen name="Login" component={LoginStackScreen} />
        <Drawer.Screen name="Feed" component={FeedStackScreen} />
    </Drawer.Navigator>
);

export default AuthRoutes;