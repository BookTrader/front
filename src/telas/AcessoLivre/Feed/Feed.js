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

export default function Feed({ navigation }) {
    const [anuncioData, setAnuncioData] = useState([]);

    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        api.get('/anuncio').then(response => {
            setRefreshing(false);

            setAnuncioData(response.data);
            console.log(anuncioData)
        })
        .catch((err) => {
            setRefreshing(false)

            setAnuncioData(null);
        });
    }, [refreshing]);
            
    /* Utilização do onRefresh para reload do feed */
    const onRefresh = () => {
        setRefreshing(true);
    }
            
    /* Em caso de não haver anúncios, exibir tela de conteúdo vazio */
    if(!anuncioData.anuncios) {
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
                { anuncioData.anuncios ? anuncioData.anuncios.map((anuncio, index) => (
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
                            image={anuncioData.imagens[index] ? anuncioData.imagens[index].url : null}
                            tituloExemplar={anuncioData.exemplares[index] ? anuncioData.exemplares[index].exm_titulo : null}
                            autorExemplar={anuncioData.exemplares[index] ? anuncioData.exemplares[index].exm_autor : null}
                            generoExemplar={anuncioData.exemplares[index] ? anuncioData.exemplares[index].exm_genero : null}
                            editoraExemplar={anuncioData.exemplares[index] ? anuncioData.exemplares[index].exm_editora : null}
                            local={`${anuncioData.usuarios[index]?.usr_ender_bairro}, ${anuncioData.usuarios[index]?.usr_ender_cidade}`}
                        />
                    </TouchableOpacity>
                )) : null }
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
