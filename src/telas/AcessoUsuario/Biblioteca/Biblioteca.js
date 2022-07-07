import React, { useEffect, useState } from 'react'
import { Alert, Modal, Pressable, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Button from '../../../components/button';
import Card from '../../../components/Card';
import EmptyContent from '../../../components/EmptyContent';
import { useAuth } from '../../../context/auth';
import { api } from '../../../service/api';

export default function Biblioteca() {
    const { usuario } = useAuth();

    const [exemplares, setExemplares] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [deleteExemp, setDeleteExemp] = useState();

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

    const deleteExemplar = async () => {
        await api.delete(`/exemplar/${deleteExemp}`)
            .then((resp) => {
                setIsOpen(false)
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Erro ao excluir!')
                setIsOpen(false)
            })
    }

    const handleDelete = (id) => {
        setDeleteExemp(id);
        setIsOpen(true);
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
        <>
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
                        <View key={exemplar.id}>
                            <Card
                                image={ exemplares[index] ? exemplares[index].imagens[0].url : null }
                                tituloExemplar={ exemplares[index] ? exemplares[index].exm_titulo : null }
                                autorExemplar={ exemplares[index] ? exemplares[index].exm_autor : null }
                                generoExemplar={ exemplares[index] ? exemplares[index].exm_genero : null }
                                editoraExemplar={ exemplares[index] ? exemplares[index].exm_editora : null }
                                onDelete={() => handleDelete(exemplar.id)}
                                />
                        </View>
                    )) : null}
                </ScrollView>
                
            </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isOpen}
                    onRequestClose={() => {
                        setIsOpen(!isOpen);
                    }}
                    style={{backgroundColor: 'transparent'}}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Deseja realmente excluir?</Text>
                            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 10}}>
                                <TouchableOpacity style={{padding: 10, borderRadius: 10, backgroundColor: '#e53945', margin: 5}} onPress={() => deleteExemplar()}>
                                    <Text style={{ fontSize: 16, color: '#fff' }}>Sim</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{padding: 10, borderRadius: 10, borderColor: '#e53945', borderWidth: 1, margin: 5}} onPress={() => setIsOpen(false)}>
                                    <Text style={{ fontSize: 16, color: '#000' }}>Não</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    modalText: {
        fontSize: 20,
    },
    modalView: {
        margin: '70%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 0,
        height: '20%',
        width: '80%',
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
})
