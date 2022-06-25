import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Anuncio from './anuncio';

export default function Footer(){
    return (
        <View>
            <Text style={styles.title}>
               Outras propostas
            </Text>
            <View style={{flexDirection: 'row', marginBottom: '2%', marginTop: '1%'}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{marginHorizontal: 10}}>
                        <Anuncio img={require('../../assets/rodrigo-foto.jpg')}></Anuncio>
                    </View>

                    <View style={{marginHorizontal: 10}}>
                        <Anuncio img={require('../../assets/rodrigo-foto.jpg')}></Anuncio>
                    </View>

                    <View style={{marginHorizontal: 10}}>
                        <Anuncio img={require('../../assets/rodrigo-foto.jpg')}></Anuncio>
                    </View>
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