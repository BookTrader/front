import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();

const FeedStack = createStackNavigator();
const CriarAnuncioStack = createStackNavigator();

import Feed from '../telas/AcessoLivre/Feed/Feed';
import CriarAnuncio from '../telas/AcessoUsuario/Anuncio/CriarAnuncio';
import { DrawerContent } from '../telas/Navegacao/DrawerContent';

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

const CriarAnuncioStackScreen = ({ navigation }) => (
    <CriarAnuncioStack.Navigator
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
        <CriarAnuncioStack.Screen
            name="CriarAnuncio"
            component={CriarAnuncio}
            options={{
                title: 'Criar um anúncio',
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
                        name="camera-outline"
                        size={30}
                        backgroundColor="#e53945"
                        color="#FFF"
                    ></Ionicons>
                ),
            }}
        />
    </CriarAnuncioStack.Navigator>
);

const AppRoutes = () => (
    <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="Feed"
    >
        <Drawer.Screen name="Feed" component={FeedStackScreen} />
        <Drawer.Screen
            name="CriarAnuncio"
            component={CriarAnuncioStackScreen}
        />
    </Drawer.Navigator>
);

export default AppRoutes;
