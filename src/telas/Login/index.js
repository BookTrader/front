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
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar 
            barStyle="light-content"
            hidden={false}
            backgroundColor="#77242a"
            />
            <View style={styles.form}>
                <Text style={styles.label}>
                    E-mail *
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: alley@book.com"
                    autoCorrect={false}
                    onChangeText={() => {}}
                />
                <Text style={styles.label}>
                        Senha *
                </Text>
                <View style={styles.inputPassArea}>
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
                            <Ionicons name="eye" color="#031d44" size={25} />
                        ) : (
                            <Ionicons
                                name="eye-off"
                                color="#031d44"
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
        container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ECECEC',
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
    },
    label:{
        fontWeight: 'bold',
        fontSize: 18,
        color: '#031d44',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderColor: '#031d44',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#242424',
        height: 44,
        marginBottom: 10,
        borderRadius: 5,
    },
    inputPassArea: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#031d44',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#242424',
        height: 44,
        marginBottom: 10,
        borderRadius: 5,
    },
    inputPass: {
        width: '90%',
        height: 44,
        color: '#242424',
        fontSize: 16,
    },
    icon: {
        width: '10%',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSubmit: {
        backgroundColor: '#e53945',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#242424',
        height: 44,
        marginBottom: 5,
        borderRadius: 5,
    },
    btnSubmitText: {
        color: '#FFF',
        fontSize: 18,
    },
    btnRegister: {
        alignSelf: 'center',
        marginTop: 10,
    },
    btnRegisterText: {
        fontSize: 16,
        color: '#031d44',
    },
    btnRegisterCTA: {
        color: '#031d44',
        fontWeight: 'bold'
    },
})
