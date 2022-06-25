import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Anuncio from './anuncio';

export default function Footer({propostas, navigation}){
    const goToProposal = (id) => {
        console.log(id)
        navigation.navigate("DetalheProposta", {prop_id: id})
    }

    return (
        <View>
            <Text style={styles.title}>
               Outras propostas
            </Text>
            <View style={{flexDirection: 'row', marginBottom: '2%', marginTop: '1%'}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {propostas && propostas.map((elem) => (
                        <View style={{marginHorizontal: 10}} key={elem.proposta?.prop_id}>
                            <Anuncio img={elem.exemplar?.imagem?.url} exemplar={elem.exemplar?.exm_titulo} onPress={() => goToProposal(elem.proposta?.prop_id)} />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: '2%',
        paddingHorizontal: '2%',
    }
})