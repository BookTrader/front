import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Button({onPress, children}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
                <Text style={styles.title}>
                    {children}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnContainer:{
        width: '90%',
        height: 50,
        backgroundColor: '#e53945',
        borderRadius: 5,
        marginVertical: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontSize: 17,
        color: '#fff'
    }
});