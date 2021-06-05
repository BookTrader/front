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
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    autoCorrect={false}
                    onChangeText={() => {}}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
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
                            <Ionicons name="eye" color="#242424" size={25} />
                        ) : (
                            <Ionicons
                                name="eye-off"
                                color="#242424"
                                size={25}
                            />
                        )}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btnSubmit}>
                    <Text style={styles.btnSubmitText}>Cadastrar</Text>
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
        backgroundColor: '#242424',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 50,
    },
    input: {
        backgroundColor: '#FFF',
        width: '90%',
        marginBottom: 15,
        color: '#242424',
        fontSize: 17,
        borderRadius: 5,
        padding: 10,
        height: 50,
    },
    inputArea: {
        flexDirection: 'row',
        width: '90%',
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
