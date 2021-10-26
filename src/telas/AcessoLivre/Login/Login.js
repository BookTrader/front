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
} from 'react-native'
import { Formik } from 'formik'
import { api } from '../../../service/api'
import { useAuth } from '../../../context/auth'
import { Ionicons } from '@expo/vector-icons'

import * as yup from 'yup'

export default function Login({ navigation }) {
    const { login } = useAuth()
    const [hidePass, setHidePass] = useState(true)
    const [loading, setLoading] = useState(false)

    /* Utilização do yup para validação de campos no formulário  */

    const schema = yup.object().shape({
        usr_email: yup
            .string()
            .required('Seu e-mail é obrigatório!')
            .email('Digite um email válido!'),
        usr_senha: yup
            .string()
            .required('Sua senha é obrigatória!')
            .min(4, 'Senha deve possuir pelo menos 4 caracteres'),
    });

    async function handleLogin(values) {
        await api
            .post('/login', values)
            .then(setLoading(true))
            .then((response) => {
                setLoading(false)
                console.log(response.data)
                login(response.data)
            })
            .catch((err) => {
                setLoading(false)
                Alert.alert('Usuário ou senha incorretos!')
            })
    }


    {/* Utilização do Formik para criação do formulário */}

    return (

        <Formik
            initialValues={{ usr_email: '', usr_senha: '' }}
            validationSchema={schema}
            onSubmit={(values) => handleLogin(values)}
        >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
                <KeyboardAvoidingView style={styles.container}>
                    <StatusBar
                        barStyle="light-content"
                        hidden={false}
                        backgroundColor="#77242a"
                    />
                    <View style={styles.form}>
                        <Text style={styles.label}>E-mail *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: alley@book.com"
                            autoCorrect={false}
                            value={values.usr_email}
                            onChangeText={handleChange('usr_email')}
                        />
                        {errors.usr_email && touched.usr_email ? (
                          <Text style={{ color: 'red', fontSize: 13, textAlign: 'center', paddingBottom: 10}}>{errors.usr_email}</Text>
                        ) : null}
                        
                        <Text style={styles.label}>Senha *</Text>
                        <View style={styles.inputPassArea}>
                            <TextInput
                                style={styles.inputPass}
                                placeholder=""
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
                                    <Ionicons
                                        name="eye-off"
                                        color="#031d44"
                                        size={25}
                                    />
                                ) : (
                                    <Ionicons
                                        name="eye"
                                        color="#031d44"
                                        size={25}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                        {errors.usr_senha && touched.usr_senha ? (
                          <Text style={{ color: 'red', fontSize: 13, textAlign: 'center', paddingBottom: 10}}>{errors.usr_senha}</Text>
                        ) : null}

                        <TouchableOpacity style={styles.btnForgotPass}>
                            <Text
                                onPress={() => navigation.navigate('Register')}
                                style={styles.btnForgotPassText}
                            >
                                Esqueceu a senha?
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.btnSubmit}
                            onPress={handleSubmit}
                        >
                            <Text

                                style={styles.btnSubmitText}
                            >
                                {loading ? 'Enviando...' : 'Enviar'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btnRegister}>
                        <Text
                            onPress={() => navigation.navigate('Register')}
                            style={styles.btnRegisterText}
                        >
                            Não tem uma conta?{' '}
                            <Text style={styles.btnRegisterCTA}>
                                Cadastre-se
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            )}
        </Formik>
    )
}

/* Estilização dos componentes */

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
    label: {
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
    },
    btnRegister: {
        alignSelf: 'center',
        marginTop: 10,
    },
    btnRegisterText: {
        fontSize: 16,
        color: '#031d44',
    },
    btnForgotPass: {
        alignSelf: 'center',
        marginBottom: 10,
    },
    btnForgotPassText: {
        fontSize: 16,
        color: '#031d44',
    },
    btnRegisterCTA: {
        color: '#031d44',
        fontWeight: 'bold',
    },
})
