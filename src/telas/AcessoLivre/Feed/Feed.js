import React, { useEffect, useState } from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Text,
    RefreshControl,
} from 'react-native';
import { api } from '../../../service/api';
import Card from './Card';



export default function Feed({ navigation }) {
    const [exemplares, setExemplares] = useState([]);
    const [imagens, setImagens] = useState([]);
    const [anuncios, setAnuncios] = useState([]);

    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        const feedData = async () => {
            await api.get('/anuncio').then(response => {
                setExemplares(response.data.exemplares);
                setAnuncios(response.data.anuncios);
                setImagens(response.data.imagens);

                setRefreshing(false)
            });
        }
        feedData();
    }, [refreshing]);

    const onRefresh = () => {
        setRefreshing(true)
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
            { anuncios.map((anuncio, index) => (
                <TouchableOpacity onPress={() => {}} key={index}>
                    <Card>
                        <View style={{ flexDirection: 'row', flex: 1,}}>
                            <Image style={styles.ExemplarImage}
                                source={require('../../Navegacao/assets/livro.jpg')}
                            />
                            <View
                                style={{
                                    flexDirection: 'column',
                                    marginLeft: 15,
                                    marginTop: 10,
                                }}
                            >
                                <Text style={styles.title}>
                                    {exemplares ? exemplares[index].exm_titulo : null}
                                </Text>
                                <Text style={styles.label}>
                                Autor: <Text style={styles.caption}>{exemplares ? exemplares[index].exm_autor : null}</Text>
                                </Text>
                                <Text style={styles.label}>
                                Gênero: <Text style={styles.caption}>{exemplares ? exemplares[index].exm_genero : null}</Text>
                                </Text>
                                <Text style={styles.label}>
                                Editora: <Text style={styles.caption}>{exemplares ? exemplares[index].exm_editora : null}</Text>
                                </Text>

                                <Text style={styles.regiao}>
                                Jardim Tranquilidade, Guarulhos
                                </Text>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>
            ))}
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
