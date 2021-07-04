import React from 'react';
import { StyleSheet, View } from 'react-native';


{/* Componentização do card */}

export default function Card(props){
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                { props.children }
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
})