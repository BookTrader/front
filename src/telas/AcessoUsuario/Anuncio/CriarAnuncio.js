import React from 'react'
import { 
    View,
    KeyboardAvoidingView,
    Text,
    StyleSheet,
    StatusBar,
    } from 'react-native';

export default function CriarAnuncio() {


    return (
    <KeyboardAvoidingView style={styles.container}>
        <StatusBar 
            barStyle="light-content"
            hidden={false}
            backgroundColor="#77242a"
        />
       <View>
           <Text>Anúncio</Text>
       </View>
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ECECEC',
    }
})
