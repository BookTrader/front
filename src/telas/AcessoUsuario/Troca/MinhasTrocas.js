import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {Feather as Icon } from "@expo/vector-icons";
import Card from '../../../components/Card';
import EmptyContent from '../../../components/EmptyContent';
import { useAuth } from '../../../context/auth';
import { api } from '../../../service/api';

export default function MinhasTrocas({ navigation }) {
    const { usuario } = useAuth();

    const [data, setData] = useState([]);

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        api.get(`/troca/usuario/${usuario.id}`).then(response => {
            setRefreshing(false);
            setData(response.data);
        })
        .catch((err) => {
            setRefreshing(false)
        });
    }, [refreshing]);

    /* Utilização do onRefresh para reload do feed */
    const onRefresh = () => {
        setRefreshing(true);
    }

    /* Em caso de não haver exemplares do usuário, exibir tela de conteúdo vazio */
    if(data.length === 0) {
        return (
            <ScrollView 
                contentContainerStyle={{ flexGrow : 1, justifyContent : 'center' }}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <EmptyContent contentType="Troca" />
            </ScrollView>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                hidden={false}
                backgroundColor="#77242a"
            />
            <ScrollView
                style={styles.cardContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {data.length > 0 ? data.map((data, index) => (
                    <TouchableOpacity onPress={() => {
                      navigation.navigate(
                        "DetalheTroca", 
                        {troca_id: data.troca.id}
                      )}}
                      key={data.troca.id}
                    >
                        <View style={styles.card}>
                            <View style={{width: '45%', padding: 5, flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                                <Text style={styles.title}>Anúncio</Text>
                                <Text>
                                    Usuário: {data?.anuncio?.usuario?.usr_apelido}
                                </Text>
                                <Text>
                                    Exemplar: {data?.anuncio?.exemplar?.exm_titulo}
                                </Text>
                            </View>
                            <View style={{flexDirection: 'column', justifyContent: 'center', marginLeft: 10, marginRight: 10}}>
                                <Icon name="arrow-right" color={'grey'} size={25}/>
                                <Icon name="arrow-left" color={'grey'} size={25}/>
                            </View>
                            <View style={{width: '45%', padding: 5, flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                                <Text style={styles.title}>Proposta</Text>
                                <Text>
                                    Usuário: {data?.proposta?.usuario?.usr_apelido}
                                </Text>
                                <Text>
                                    Exemplar: {data?.proposta?.exemplar?.exm_titulo}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )) : null}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        elevation: 3, 
        backgroundColor: '#FFF',
        marginHorizontal: 1,
        marginVertical: 6,
        minHeight: 140,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ECECEC',
    },
    cardContainer: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 5,
        alignSelf: 'stretch',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#031d44',
        marginBottom: 8,
        alignSelf: 'center',
    }
})
