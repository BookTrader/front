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
import { useAuth } from '../../../context/auth';

export default function Feed({ navigation }) {
    const [anuncioData, setAnuncioData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { usuario } = useAuth()

    useEffect(() => {
        api.get(`/anuncio/all/${usuario?.id}`).then(response => {
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
    if(anuncioData.length === 0) {
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
                { anuncioData.length > 0 ? anuncioData.map((data, index) => (
                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate(
                                "DetalheAnuncio", 
                                {anc_id: data.id}
                            )
                        }} 
                        key={data.id}
                    >
                        <Card 
                            image={data?.exemplares?.imagens ? data.exemplares.imagens.url : null}
                            tituloExemplar={data?.exemplares ? data.exemplares.exm_titulo : null}
                            autorExemplar={data?.exemplares ? data.exemplares.exm_autor : null}
                            generoExemplar={data?.exemplares ? data.exemplares.exm_genero : null}
                            editoraExemplar={data?.exemplares ? data.exemplares.exm_editora : null}
                            local={`${data?.usuario?.usr_ender_bairro}, ${data.usuario?.usr_ender_cidade}`}
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
