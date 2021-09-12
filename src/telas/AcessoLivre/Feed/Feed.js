import React, { useEffect, useState } from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
} from 'react-native';

import { api } from '../../../service/api';
import Card from '../../../components/Card';
import EmptyContent from '../../../components/EmptyContent';

export default function Feed({ navigation }) {
    const [exemplares, setExemplares] = useState(null);
    const [imagens, setImagens] = useState(null);
    const [anuncios, setAnuncios] = useState(null);

    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        api.get('/anuncio').then(response => {
            setImagens(response.data.imagens);
            setExemplares(response.data.exemplares);
            setAnuncios(response.data.anuncios);

            setRefreshing(false);
        });
    }, [refreshing]);
            
    /* Utilização do onRefresh para reload do feed */
    const onRefresh = () => {
        setRefreshing(true);
    }
            
    /* Verificação de existência de anúncios */
    if(!anuncios) {
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
                <EmptyContent contentType="anúncio" />
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
            {/* Utilização do map para listar anúncios no feed */}    
            { anuncios ? anuncios.map((anuncio, index) => (
                <TouchableOpacity onPress={() => {}} key={anuncio.id}>
                    <Card 
                        tituloExemplar={exemplares[index].exm_titulo}
                        image={imagens[index].url} 
                        autorExemplar={exemplares[index].exm_autor}
                        generoExemplar={exemplares[index].exm_genero}
                        editoraExemplar={exemplares[index].exm_editora}
                    />
                </TouchableOpacity>
            )) : null}
            </ScrollView>
        </View>
    )
}

{/* Estilização dos componentes */}

const styles = StyleSheet.create({
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
    ExemplarImage: {
      width: 140,
      height: 140,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    title: {
      fontSize: 16,
      marginBottom: 10,
    },
    caption: {
      fontSize: 14,
      fontWeight: 'normal',
    },
    label:{
      fontSize: 14,
      fontWeight: 'bold',
    },
    regiao:{
      marginTop: 12,
      fontSize: 12,
      color: '#333',
    }
})
