import React , {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Feather as Icon } from "@expo/vector-icons";

const WppButton = ({ onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={[styles.button, styles.menu]}>
                    <Icon name="message-square" color={'#FFF'} size={26}/>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

export default WppButton;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        position: 'absolute',
        bottom: 80,
        right: 50,
    },
    button:{
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 10,
        shadowColor: '#e53945',
        shadowOpacity: 0.3,
        shadowOffset:{
            height: 10,
        },
        borderWidth: 1,
        borderColor: '#FFF'
    },
    menu:{
        backgroundColor: '#e53945'
    }
});
