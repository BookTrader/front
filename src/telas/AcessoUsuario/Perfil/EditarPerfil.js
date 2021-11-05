import React, {useRef} from 'react';
import {
    KeyboardAvoidingView,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Modalize } from 'react-native-modalize';

export default function Perfil({ navigation }) {

    const modalizeRef = useRef(null);
    
    function onOpen(){
        modalizeRef.current?.open();
    }

    function onClose(){
        modalizeRef.current?.close();
    }


    return (
        <KeyboardAvoidingView
            style={styles.container}
            keyboardVerticalOffset={80}
        >
            <View style={{ margin: 20 }}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={onOpen}>
                        <View
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ImageBackground
                                source={require('../../../../assets/rodrigo-foto.jpg')}
                                style={{
                                    height: 100,
                                    width: 100,
                                }}
                                imageStyle={{ borderRadius: 15 }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Icon
                                        name="camera"
                                        size={35}
                                        color="#fff"
                                        style={{
                                            opacity: 0.7,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 10,
                                        }}
                                    />
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Dados Pessoais</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Apelido"
                    autoCorrect={false}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    autoCorrect={false}
                />

                <TextInput
                    style={styles.input}
                    placeholder="CPF"
                    autoCorrect={false}
                />

                <TouchableOpacity style={styles.btnSubmit}>
                    <Text style={styles.btnSubmitText}>Atualizar</Text>
                </TouchableOpacity>
            </View>

            <Modalize
                ref={modalizeRef}
                snapPoint={220}
                modalHeight={220}
            >
                <View style={styles.modalContent}>

                    <TouchableOpacity style={styles.btnModal}>
                        <Text style={styles.btnModalText}>Tirar foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnModal}>
                        <Text style={styles.btnModalText}>Escolher da galeria</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onClose} style={styles.btnModal}>
                        <Text style={styles.btnModalText}>Cancelar</Text>
                    </TouchableOpacity>

                </View>
            </Modalize>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECECEC',
    },
    modalHeader: {
        alignItems: 'center',
    },
    modalContent: {
        flex: 1,
        height: 180,
        marginTop: 30,
        alignSelf: 'stretch',
        paddingHorizontal: 30,
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
    inputText: {
        borderWidth: 1,
        borderColor: '#031d44',
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#242424',
        height: 84,
        textAlignVertical: 'top',
        paddingTop: 10,
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
    btnModalText: {
        color: '#FFF',
        fontSize: 18,
    },
    btnModal: {
        backgroundColor: '#e53945',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#242424',
        height: 44,
        marginBottom: 5,
        borderRadius: 5,
        marginTop: 5,
    },
    
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
    },
})
