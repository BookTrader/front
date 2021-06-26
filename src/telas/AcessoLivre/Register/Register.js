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

import * as yup from 'yup';

export default function Register() {

    const [hidePass, setHidePass] = useState(true);
    const [hideConfirmPass, setHideConfirmPass] = useState(true);
    const [loading, setLoading] = useState(false);
    const {navigate} = useNavigation();

    const schema = yup.object().shape({
        usr_apelido: yup
            .string()
            .required('Este campo é obrigatório!')
            .min(2, 'Apelido deve possuir pelo menos 2 caracteres'),
        usr_email: yup
            .string()
            .required('Este campo é obrigatório!')
            .email('Digite um email válido!'),
        usr_confirmSenha: yup
            .string()
            .required('Este campo é obrigatório!')
            .min(4, 'Senha deve possuir pelo menos 4 caracteres!')
            .oneOf([yup.ref('usr_senha'), null], "Campos de senha devem ser iguais!"),
    })

    async function handleRegister(values){
        await api.post('/usuario', values)
        .then(response => {
            setLoading(false);
            Alert.alert('Cadastro realizado com sucesso!');
        })
        .then(setLoading(true))
        .then(() => (navigate('Login')))
        .catch(err =>  {
            setLoading(false);
            Alert.alert('Erro ao cadastrar!');
        })
    }

    return (

        <Formik
        initialValues={{usr_apelido: '', usr_email: '', usr_senha: '', usr_confirmSenha: ''}}
        validationSchema={schema}
        onSubmit={values => handleRegister(values)}
    >
    
    {({ handleChange, handleSubmit, values, errors, touched }) => (

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
                    {errors.usr_apelido && touched.usr_apelido ? (
                        <Text>{errors.usr_apelido}</Text>
                    ) : null}
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        autoCorrect={false}
                        value={values.usr_email}
                        onChangeText={handleChange('usr_email')}
                    />
                    {errors.usr_email && touched.usr_email ? (
                        <Text>{errors.usr_email}</Text>
                    ) : null}
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
                                <Ionicons name="eye-off" color="#031d44" size={25} />
                            ) : (
                                <Ionicons
                                    name="eye"
                                    color="#031d44"
                                    size={25}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputPassArea}>
                        <TextInput
                            style={styles.inputPass}
                            placeholder="Confirmar Senha"
                            autoCorrect={false}
                            value={values.usr_confirmSenha}
                            onChangeText={handleChange('usr_confirmSenha')}
                            secureTextEntry={hideConfirmPass}
                        />
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => setHideConfirmPass(!hideConfirmPass)}
                        >
                            {hideConfirmPass ? (
                                <Ionicons name="eye-off" color="#031d44" size={25} />
                            ) : (
                                <Ionicons
                                    name="eye"
                                    color="#031d44"
                                    size={25}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    {errors.usr_confirmSenha && touched.usr_confirmSenha ? (
                        <Text>{errors.usr_confirmSenha}</Text>
                    ) : null}

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
