import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Button({onPress, disabled = false, children}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={disabled ? styles.btnDisabled : styles.btnContainer} onPress={onPress} disabled={disabled}>
                <Text style={disabled ? styles.textDisabled : styles.title}>
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
    btnDisabled: {
        width: '90%',
        height: 50,
        backgroundColor: '#ccc',
        borderRadius: 5,
        marginVertical: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontSize: 17,
        color: '#fff'
    },
    textDisabled: {
        fontSize: 17,
        color: '#000'
    }
});