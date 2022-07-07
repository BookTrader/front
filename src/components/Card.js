import React from 'react';
import { StyleSheet, View, Image, Text, Touchable, Pressable } from 'react-native';
import {Feather as Icon } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';

{/* Componentização do card */}

export default function Card(props){
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Image 
                        style={styles.ExemplarImage}
                        source={{ uri: props.image }}
                    />
                    <View
                        style={{
                            flexDirection: 'column',
                            marginLeft: 15,
                            marginTop: 10,
                        }}
                    >
                        <Text style={styles.title}>
                            { props.tituloExemplar }
                        </Text>
                        <Text style={styles.label}>
                            Autor: <Text style={styles.caption}>{ props.autorExemplar }</Text>
                        </Text>
                        <Text style={styles.label}>
                            Gênero: <Text style={styles.caption}>{ props.generoExemplar }</Text>
                        </Text>
                        <Text style={styles.label}>
                            Editora: <Text style={styles.caption}>{ props.editoraExemplar }</Text>
                        </Text>

                        <Text style={styles.regiao}>
                            { props.local }
                        </Text>
                    </View>
                    {props.onDelete && (
                        <Pressable style={{position: 'absolute', top: 55, right: 20}} onPress={props.onDelete}>
                            <Icon name='trash-2' size={30} color='#e53945'></Icon>
                        </Pressable>
                    )}
                </View>
            </View>
        </View>
    )
}

{/* Estilização */}


const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        elevation: 3, 
        backgroundColor: '#FFF',
        marginHorizontal: 1,
        marginVertical: 6,
        height: 140,
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