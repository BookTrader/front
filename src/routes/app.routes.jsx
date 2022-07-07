import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {Image} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Feed from '../telas/AcessoLivre/Feed/Feed';
import DetalheAnuncio from '../telas/AcessoUsuario/Anuncio/DetalheAnuncio';
import CriarAnuncio from '../telas/AcessoUsuario/Anuncio/CriarAnuncio';
import CriarProposta from '../telas/AcessoUsuario/Proposta/CriarProposta';
import DetalheProposta from '../telas/AcessoUsuario/Proposta/DetalheProposta';
import Troca from '../telas/AcessoUsuario/Troca/Troca';
import Biblioteca from '../telas/AcessoUsuario/Biblioteca/Biblioteca';
import MinhasTrocas from '../telas/AcessoUsuario/Troca/MinhasTrocas';
//import Configuracao from '../telas/AcessoUsuario/Configuracao/Configuracao';
import Perfil from '../telas/AcessoUsuario/Perfil/Perfil';
import EditarPerfil from '../telas/AcessoUsuario/Perfil/EditarPerfil';
import ConfigurarTroca from '../telas/AcessoUsuario/Perfil/ConfigurarTroca';

import { DrawerContent } from '../telas/Navegacao/DrawerContent';

const FeedStack = createStackNavigator();
const CriarAnuncioStack = createStackNavigator();
const BibliotecaStack = createStackNavigator();
const MinhasTrocasStack = createStackNavigator();
const PerfilStack = createStackNavigator();

const Drawer = createDrawerNavigator();

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
                        onPress={() => navigation.navigate('ConfigurarTroca')}
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
        <FeedStack.Screen
            name="CriarProposta"
            component={CriarProposta}
            options={{
                title: 'Criar uma proposta'
            }}
        />
        <FeedStack.Screen
            name="DetalheProposta"
            component={DetalheProposta}
            options={{
                title: 'Detalhe da Proposta'
            }}
        />
        <FeedStack.Screen
            name="DetalheTroca"
            component={Troca}
            options={{
                title: 'Detalhe da Troca'
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
            }}
        />
    </CriarAnuncioStack.Navigator>
);

const BibliotecaStackScreen = ({ navigation }) => (
    <BibliotecaStack.Navigator
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
        <BibliotecaStack.Screen
            name="Biblioteca"
            component={Biblioteca}
            options={{
                title: 'Meus Exemplares',
                headerLeft: () => (
                    <Ionicons
                        style={{ paddingLeft: 10 }}
                        name="ios-menu"
                        size={35}
                        backgroundColor="#e53945"
                        color="#FFF"
                        onPress={() => navigation.openDrawer()}
                    ></Ionicons>
                )
            }}
        />
    </BibliotecaStack.Navigator>
);

const MinhasTrocasStackScreen = ({ navigation }) => (
    <MinhasTrocasStack.Navigator
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
        <MinhasTrocasStack.Screen
            name="MinhasTrocas"
            component={MinhasTrocas}
            options={{
                title: 'Minhas Trocas',
                headerLeft: () => (
                    <Ionicons
                        style={{ paddingLeft: 10 }}
                        name="ios-menu"
                        size={35}
                        backgroundColor="#e53945"
                        color="#FFF"
                        onPress={() => navigation.openDrawer()}
                    ></Ionicons>
                )
            }}
        />
    </MinhasTrocasStack.Navigator>
);

const PerfilStackScreen = ({ navigation }) => (
    <PerfilStack.Navigator
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
        <PerfilStack.Screen
            name="Perfil"
            component={Perfil}
            options={{
                title: 'Perfil',
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
                        name="create-outline"
                        size={30}
                        backgroundColor="#e53945"
                        color="#FFF"
                        onPress={() => navigation.navigate('EditarPerfil')}
                    ></Ionicons>
                ),
            }}
        />
        <PerfilStack.Screen
            name="EditarPerfil"
            component={EditarPerfil}
            options={{
                title: 'Editar Perfil'
            }}
        />
        <PerfilStack.Screen
            name="ConfigurarTroca"
            component={ConfigurarTroca}
            options={
                ({ navigation, route }) => ({title: 'Configurar Troca'})
            }
        />
        
    </PerfilStack.Navigator>
);

const AppRoutes = () => (
    <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="Feed"
    >
        <Drawer.Screen name="Feed" component={FeedStackScreen} />
        <Drawer.Screen name="CriarAnuncio" component={CriarAnuncioStackScreen} />
        <Drawer.Screen name="Biblioteca" component={BibliotecaStackScreen} />
        <Drawer.Screen name="MinhasTrocas" component={MinhasTrocasStackScreen} />
        <Drawer.Screen name="Perfil" component={PerfilStackScreen} />

    </Drawer.Navigator>
);

export default AppRoutes;
