import React, { useEffect, useState } from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    Text
} from 'react-native';

import { api } from '../../../service/api';
import Card from '../../../components/Card';
import EmptyContent from '../../../components/EmptyContent';
import { useLocation } from '../../../context/location';

export default function Feed({ navigation }) {
    const [exemplares, setExemplares] = useState([]);
    const [imagens, setImagens] = useState([]);
    const [anuncios, setAnuncios] = useState([]);

    const [refreshing, setRefreshing] = useState(false)

    const { location } = useLocation();

    useEffect(() => {
        api.get('/anuncio').then(response => {
            setRefreshing(false);

            setAnuncios(response.data.anuncios);
            setExemplares(response.data.exemplares);
            setImagens(response.data.imagens);
        })
        .catch((err) => {
            setRefreshing(false)

            setAnuncios(null);
            setExemplares([]);
            setImagens([]);
        });
    }, [refreshing]);
            
    /* Utilização do onRefresh para reload do feed */
    const onRefresh = () => {
        setRefreshing(true);
    }
            
    /* Em caso de não haver anúncios, exibir tela de conteúdo vazio */
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
                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate(
                                "DetalheAnuncio", 
                                {anc_id: anuncio.id}
                            )
                        }} 
                        key={anuncio.id}
                    >
                        <Card 
                            image={imagens[index] ? imagens[index].url : null}
                            tituloExemplar={exemplares[index] ? exemplares[index].exm_titulo : null}
                            autorExemplar={exemplares[index] ? exemplares[index].exm_autor : null}
                            generoExemplar={exemplares[index] ? exemplares[index].exm_genero : null}
                            editoraExemplar={exemplares[index] ? exemplares[index].exm_editora : null}
                            local={"Jardim Tranquilidade, Guarulhos"}
                        />
                    </TouchableOpacity>
                )) : null }
                <Text>{JSON.stringify(location)}</Text>
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
    }
})
