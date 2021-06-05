import React, { useState } from 'react';
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


export default function Login({ navigation }) {
    const [input, setInput] = useState('')
    const [hidePass, setHidePass] = useState(true)


    return (
        <KeyboardAvoidingView style={styles.background}>
            <StatusBar />
            <View style={styles.container}>
                <Text style={styles.textLabel}>
                    E-mail
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: alley@book.com"
                    autoCorrect={false}
                    onChangeText={() => {}}
                />
                <Text style={styles.textLabel}>
                        Senha
                </Text>
                <View style={styles.inputArea}>
                    <TextInput
                        style={styles.inputPass}
                        placeholder=""
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
                    <Text style={styles.btnSubmitText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister}>
                    <Text onPress={ () => navigation.navigate('Register')} style={styles.btnRegisterText}>
                        Não tem uma conta? <Text style={styles.btnRegisterCTA}>Cadastre-se</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
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
        paddingBottom: 20
    },
    textLabel:{
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    input: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: 'gray',
        width: '90%',
        marginBottom: 10,
        color: '#242424',
        fontSize: 17,
        borderRadius: 5,
        padding: 10,
        height: 50,
    },
    inputArea: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'gray',
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        marginBottom: 10,
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
    },
    btnRegister: {
        marginTop: 10,
    },
    btnRegisterText: {
        fontSize: 16,
        color: '#000',
    },
    btnRegisterCTA: {
        color: '#e0ac21',
        fontWeight: 'bold'
    },
})
