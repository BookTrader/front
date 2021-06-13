import React, { useState } from 'react'
import { 
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    StatusBar,
    Alert,
    } from 'react-native';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../../service/api';
import { useNavigation } from '@react-navigation/native';

export default function Register() {

    const [hidePass, setHidePass] = useState(true);
    const [loading, setLoading] = useState(false);
    const {navigate} = useNavigation();

    async function handleRegister(values){
        await api.post('/usuario', values)
        .then(setLoading(true))
        .then(response => {
            setLoading(false);
            Alert.alert('Cadastro realizado com sucesso!');
        })
        .then(() => (navigate('Login')))
        .catch(err =>  {
            setLoading(false);
            Alert.alert('Erro ao cadastrar!');
        })
    }

    return (

        <Formik
        initialValues={{usr_apelido: '', usr_email: '', usr_senha: ''}}
        onSubmit={values => handleRegister(values)}
    >
    
    {({ handleChange, handleSubmit, values }) => (

        <KeyboardAvoidingView style={styles.container}>
            <StatusBar 
                barStyle="light-content"
                hidden={false}
                backgroundColor="#77242a"
            />
            <View style={styles.form}>
                    <Text style={styles.label}>
                        Dados
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Apelido"
                        autoCorrect={false}
                        value={values.usr_apelido}
                        onChangeText={handleChange('usr_apelido')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        autoCorrect={false}
                        value={values.usr_email}
                        onChangeText={handleChange('usr_email')}
                    />
                    <View style={styles.inputPassArea}>
                        <TextInput
                            style={styles.inputPass}
                            placeholder="Senha"
                            autoCorrect={false}
                            value={values.usr_senha}
                            onChangeText={handleChange('usr_senha')}
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
                    <Text onPress={handleSubmit} style={styles.btnSubmitText}>{loading ? 'Cadastrando...' : 'Cadastrar'}</Text>
                    </TouchableOpacity>
                </View>
        </KeyboardAvoidingView>
    )}
    </Formik>
    );
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
        borderColor: '#031d44',
        backgroundColor: '#FFF',
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
        borderColor: '#031d44',
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
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
    }
})
