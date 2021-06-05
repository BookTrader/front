import React, { useState } from 'react'
import { 
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    StatusBar,
    } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {

    const [input, setInput] = useState('')
    const [hidePass, setHidePass] = useState(true)

    return (
    <KeyboardAvoidingView style={styles.background}>
        <StatusBar />
        <View style={styles.container}>
                <Text style={styles.textLabel}>
                    Dados
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    autoCorrect={false}
                    onChangeText={() => {}}
                />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    autoCorrect={false}
                    onChangeText={() => {}}
                />
                <View style={styles.inputArea}>
                    <TextInput
                        style={styles.inputPass}
                        placeholder="Senha"
                        autoCorrect={false}
                        value={input}
                        onChangeText={(texto) => setInput(texto)}
                        secureTextEntry={hidePass}
                    />
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => setHidePass(!hidePass)}
                    >
                        {hidePass ? (
                            <Ionicons name="eye" color="gray" size={25} />
                        ) : (
                            <Ionicons
                                name="eye-off"
                                color="gray"
                                size={25}
                            />
                        )}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btnSubmit}>
                    <Text style={styles.btnSubmitText}>Cadastre-se</Text>
                </TouchableOpacity>
            </View>
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 50,
        marginTop: 30,
    },
    textLabel:{
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    input: {
        backgroundColor: '#FFF',
        width: '90%',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'gray',
        color: '#242424',
        fontSize: 17,
        borderRadius: 5,
        padding: 10,
        height: 50,
    },
    inputArea: {
        flexDirection: 'row',
        width: '90%',
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        marginBottom: 15,
    },
    inputPass: {
        width: '85%',
        height: 50,
        color: '#242424',
        padding: 8,
        fontSize: 17,
    },
    icon: {
        width: '15%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSubmit: {
        backgroundColor: '#e0ac21',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    btnSubmitText: {
        color: '#FFF',
        fontSize: 18,
    }
})
