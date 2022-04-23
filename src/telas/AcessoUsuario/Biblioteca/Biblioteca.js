import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import Card from '../../../components/Card';
import EmptyContent from '../../../components/EmptyContent';
import { useAuth } from '../../../context/auth';
import { api } from '../../../service/api';

export default function Biblioteca() {
    const { usuario } = useAuth();

    const [exemplares, setExemplares] = useState([]);

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        api.get(`/usuario/${usuario.id}/exemplar`).then(response => {
            setRefreshing(false);

            setExemplares(response.data);
        })
        .catch((err) => {
            setRefreshing(false)

            setExemplares(null);
        });
    }, [refreshing]);

    /* Utilização do onRefresh para reload do feed */
    const onRefresh = () => {
        setRefreshing(true);
    }

    /* Em caso de não haver exemplares do usuário, exibir tela de conteúdo vazio */
    if(!exemplares) {
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
                <EmptyContent contentType="Exemplares" />
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
                {exemplares ? exemplares.map((exemplar, index) => (
                    <TouchableOpacity onPress={() => {}} key={exemplar.id}>
                        <Card
                            image={ exemplares[index] ? exemplares[index].imagens[0].url : null }
                            tituloExemplar={ exemplares[index] ? exemplares[index].exm_titulo : null }
                            autorExemplar={ exemplares[index] ? exemplares[index].exm_autor : null }
                            generoExemplar={ exemplares[index] ? exemplares[index].exm_genero : null }
                            editoraExemplar={ exemplares[index] ? exemplares[index].exm_editora : null }
                        />
                    </TouchableOpacity>
                )) : null}
            </ScrollView>
        </View>
    )
}

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
})
