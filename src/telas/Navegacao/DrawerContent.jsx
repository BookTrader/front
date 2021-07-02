import React from 'react';

import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../context/auth';

export function DrawerContent(props) {
    const { usuario, logOut } = useAuth();

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                { usuario ? (
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={require('./assets/rodrigo-foto.jpg')}
                                size={50}
                            />
                            <View
                                style={{
                                    flexDirection: 'column',
                                    marginLeft: 15,
                                }}
                            >
                                <Title style={styles.title}>
                                    {usuario ? usuario.usr_apelido : 'Ih'}
                                </Title>
                                <Caption style={styles.caption}>
                                    {usuario ? usuario.usr_email : 'Ih@gmail.com'}
                                </Caption>
                            </View>
                        </View>
                    </View>
                ) : null }
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ size }) => (
                                <Icon
                                    name="home-outline"
                                    color="#e53945"
                                    size={size}
                                />
                            )}
                            label="Feed"
                            onPress={() => {
                                props.navigation.navigate('Feed')
                            }}
                        />
                    { !usuario ? (
                        <DrawerItem
                            icon={({ size }) => (
                                <Icon
                                    name="account-outline"
                                    color="#e53945"
                                    size={size}
                                />
                            )}
                            label="Acesse sua conta"
                            onPress={() => {
                                props.navigation.navigate('Login')
                            }}
                        />
                    ) : null}

                    { usuario ? (
                        <>
                        <DrawerItem
                            icon={({ size }) => (
                                <Icon
                                    name="book-plus-multiple-outline"
                                    color="#e53945"
                                    size={size}
                                />
                            )}
                            label="Criar um anúncio"
                            onPress={() => {
                                props.navigation.navigate('CriarAnuncio')
                            }}
                        />
                    
                        <DrawerItem
                            icon={({ size }) => (
                                <Icon
                                    name="bookshelf"
                                    color="#e53945"
                                    size={size}
                                />
                            )}
                            label="Minha biblioteca"
                            onPress={() => {}}
                        />
                            
                        <DrawerItem
                            icon={({ size }) => (
                                <Icon
                                    name="tools"
                                    color="#e53945"
                                    size={size}
                                />
                            )}
                            label="Configurações"
                            onPress={() => {}}
                        />
                        </>
                    ) : null }
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
        { usuario ? (
            <Drawer.Section style={styles.bottomDrawerSection} {...props}>
                <DrawerItem
                    icon={({ size }) => (
                        <Icon name="exit-to-app" color="#e53945" size={size} />
                    )}
                    label="Sair"
                    onPress={() => {logOut(); props.navigation.closeDrawer();}}
                />
            </Drawer.Section>
        ) : null }
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
})
