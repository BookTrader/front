import React, {useRef, useState} from 'react';
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
import * as ImagePicker from 'expo-image-picker';
import { Modalize } from 'react-native-modalize';
import { useAuth } from '../../../context/auth';
import { api } from '../../../service/api';

export default function Perfil({ navigation }) {

    const {usuario, setUsuario, loading} = useAuth();

    const [userApelido, setUserApelido] = useState(usuario.usr_apelido ? usuario.usr_apelido : '');
    const [userNome, setUserNome] = useState(usuario.usr_nome ? usuario.usr_nome : '');
    const [userCpf, setUserCpf] = useState(usuario.usr_cpf ? usuario.usr_cpf : '');
    const [image, setImage] = useState();

    const modalizeRef = useRef(null);

    //teste
    //Func p/ selecionar foto da galeria
    async function handleSelectImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (status !== 'granted') {
            alert(
                'Você precisa liberar o acesso à galeria para selecionarmos uma foto.'
            )
            return
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
    
        if (result.cancelled) {
            alert('Upload de foto cancelado.');
            return;
        }
    
        // Renomeando o nome do parâmetro no meio da desestruturação
        const { uri: image } = result;
    
        setImage(image);

        onClose();
    }


    //Func p/ tirar foto da câmera
    async function handleTakeImage() {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
        if (status !== 'granted') {
            alert(
                'Você precisa liberar o acesso à câmera.'
            )
            return
        }
    
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
    
        if (result.cancelled) {
            alert('Upload de foto cancelado.');
            return;
        }
    
        // Renomeando o nome do parâmetro no meio da desestruturação
        const { uri: image } = result;
    
        setImage(image);

        onClose();
    }

    async function handlePerfilSubmit() {
        const data = await handleFormData();
        console.log(data)
    
        await api
          .patch(`/usuario/${usuario.id}`, data)
          .then((response) => {
              const updatedUser = response.data;
              setUsuario(updatedUser);
          })
      }
    
      async function handleFormData() {
        const data = new FormData();
    
        data.append('usr_apelido', userApelido);
        data.append('usr_nome', userNome);
        data.append('usr_cpf', userCpf);
    
        data.append('imagem', {
          name: 'user_image_1.jpg',
          type: 'image/jpg',
          uri: image
        });
    
        return data;
      }


    //Funcs p/ abrir e fechar o modal
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
                                source={image
                                    ? { uri: image }
                                    : usuario.usr_foto
                                    ? { uri: usuario.usr_foto.url }
                                    : require('../../../../assets/rodrigo-foto.jpg')}
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
                    value={userApelido}
                    onChangeText={setUserApelido}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    autoCorrect={false}
                    value={userNome}
                    onChangeText={setUserNome}
                />

                <TextInput
                    style={styles.input}
                    placeholder="CPF"
                    autoCorrect={false}
                    value={userCpf}
                    onChangeText={setUserCpf}
                />

                <TouchableOpacity style={styles.btnSubmit} onPress={handlePerfilSubmit}>
                    <Text style={styles.btnSubmitText}>
                        {loading ? 'Atualizando...' : 'Atualizar'}</Text>
                </TouchableOpacity>
            </View>

            <Modalize
                ref={modalizeRef}
                snapPoint={220}
                modalHeight={220}
            >
                <View style={styles.modalContent}>

                    <TouchableOpacity style={styles.btnModal} onPress={handleTakeImage}>
                        <Text style={styles.btnModalText}>Tirar foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnModal} onPress={handleSelectImage}>
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
