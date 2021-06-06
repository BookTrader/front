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
    <KeyboardAvoidingView style={styles.container}>
        <StatusBar 
            barStyle="light-content"
            hidden={false}
            backgroundColor="#b58f28"
        />
        <View style={styles.form}>
                <Text style={styles.label}>
                    Dados
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Apelido"
                    autoCorrect={false}
                    onChangeText={() => {}}
                />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    autoCorrect={false}
                    onChangeText={() => {}}
                />
                <View style={styles.inputPassArea}>
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
    },
    label:{
        fontWeight: 'bold',
        fontSize: 18,
        color: '#242424',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#242424',
        height: 44,
        marginBottom: 10,
        borderRadius: 5,
    },
    inputPassArea: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'gray',
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
        padding: 8,
        fontSize: 17,
    },
    icon: {
        width: '10%',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSubmit: {
        backgroundColor: '#e0ac21',
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
    }
})
