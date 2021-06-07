import React from 'react';
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

// API Client


export default function Login({ navigation }) {

    async function handleLogin(values){
        await applicationCache.post('/login', values)
        .then(response => {
            setLoader(false);
            signIn(response.data);
        })
        .catch(err =>  {
            Alert.alert('Usuário ou senha inválidos');
        })
    }


    return (
        <Formik
            initialValues={{email: '', senha: ''}}
            onSubmit={values => handleLogin(values)}
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
                        E-mail *
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: alley@book.com"
                        autoCorrect={false}
                        value={values.email}
                        onChange={handleChange('email')}
                    />
                    <Text style={styles.label}>
                            Senha *
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={values.senha}
                        onChange={handleChange('senha')}
                    />
                    <TouchableOpacity style={styles.btnSubmit}>
                        <Text style={styles.btnSubmitText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btnRegister}>
                    <Text onPress={ () => navigation.navigate('Register')} style={styles.btnRegisterText}>
                        Não tem uma conta? <Text style={styles.btnRegisterCTA}>Cadastre-se</Text>
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        )}
        </Formik>
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
