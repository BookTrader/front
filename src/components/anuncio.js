import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Anuncio(){

    function filterTitle(title){
        if(title.length < 24){
            return title;
        }

        return `${title.substring(0,15)}...`;
    }

    return (
        <TouchableOpacity styles={styles.container}>
            <Image 
                source={require('../../assets/rodrigo-foto.jpg')}
                style={styles.anuncioImg}
            />
            <Text style={styles.anuncioText}>
                {filterTitle('Anuncio XYZXYZXYZXYZXYZXYZXYZ')}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    anuncioImg:{
        borderRadius: 5,
        width: 175,
        height: 175
    },
    anuncioText:{
        alignSelf: 'center',
        fontSize: 16,
    }
})