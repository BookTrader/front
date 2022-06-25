import React , {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Feather as Icon } from "@expo/vector-icons";


export default class WppButton extends Component {
    render(){
        return (
            <View style={[styles.container, this.props.style]}>
                <TouchableWithoutFeedback>
                    <View style={[styles.button, styles.menu]}>
                        <Icon name="message-square" color={'#FFF'} size={26}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        position: 'absolute',
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
