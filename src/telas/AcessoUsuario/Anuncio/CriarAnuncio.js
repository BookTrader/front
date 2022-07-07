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
    Image,
    ScrollView,
} from 'react-native'
import { Formik } from 'formik'
import { api } from '../../../service/api'
import * as ImagePicker from 'expo-image-picker'
import { Feather } from '@expo/vector-icons'

import * as yup from 'yup'
import { useAuth } from '../../../context/auth'
import { useNavigation } from '@react-navigation/native'

export default function CriarAnuncio() {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [formKey, setFormKey] = useState(1);

    const { usuario } = useAuth();
    const navigation = useNavigation();

    const schema = yup.object().shape({
        exm_titulo: yup
            .string()
            .required('O título do exemplar é obrigatório!'),
        exm_genero: yup
            .string()
            .required('O gênero do exemplar é obrigatório!'),
        exm_autor: yup.string().required('O autor do exemplar é obrigatório!'),
        exm_editora: yup
            .string()
            .required('A editora do exemplar é obrigatória!'),
    })

    async function handleRegister(values) {
        const data = await handleFormData(values);
        let exm_id = '';

        await api
            .post(`/usuario/${usuario.id}/exemplar`, data[0])
            .then((response) => {
                setLoading(true);
                exm_id = response.data.id;
            });

        await api
            .post(`/exemplar/${exm_id}/imagem`, data[1])

        await api
            .post(`/usuario/${usuario.id}/exemplar/${exm_id}/anuncio`, data[2])
            .then((response) => {
                setLoading(false);
                setImages([]);
                setFormKey(formKey + 1);

                navigation.navigate('Feed');
            })
    }

    async function handleFormData(values) {

        const dataAnuncio = {
            anc_descricao: values.anc_descricao
        }

        const dataExemplar = {
            exm_autor: values.exm_autor,
            exm_editora: values.exm_editora,
            exm_genero: values.exm_genero,
            exm_titulo: values.exm_titulo
        }

        const dataImagens = new FormData();

        images.forEach((image, index) => {
            dataImagens.append('imagens', {
              name: `image_${index}.jpg`,
              type: 'image/jpg',
              uri: image, 
            });
        });

        return [ dataExemplar, dataImagens, dataAnuncio ];
    }

    async function handleSelectImages() {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync()

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
            return;
        }

        // Renomeando o nome do parâmetro no meio da desestruturação
        const { uri: image } = result;

        // Recriando o array inteiro do 0
        // (Copiando os elementos que já existiam e adicionando um novo)
        setImages([...images, image]);
    }

    return (
        <Formik
            initialValues={{
                exm_titulo: '',
                exm_genero: '',
                exm_autor: '',
                exm_editora: '',
                anc_descricao: '',
            }}
            validationSchema={schema}
            key={formKey}
            onSubmit={(values) => handleRegister(values)}
        >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
                <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={80}>
                    <ScrollView>
                    <StatusBar
                        barStyle="light-content"
                        hidden={false}
                        backgroundColor="#77242a"
                    />
                    <View style={styles.form}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={true}
                        >
                            <View style={styles.uploadedImagesContainer} >
                                {images.map((image, index) => {
                                    return (
                                        <Image
                                            key={images[index]}
                                            source={{ uri: image }}
                                            style={styles.uploadedImage}
                                        />
                                    )
                                })}
                            </View>
                        </ScrollView>           
                        <TouchableOpacity
                            style={styles.imagesInput}
                            onPress={handleSelectImages}
                        >
                            <Feather name="file-plus" size={30} color="#031d44" />
                        </TouchableOpacity>

                        <Text style={styles.label}>Dados do exemplar</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Título"
                            autoCorrect={false}
                            value={values.exm_titulo}
                            onChangeText={handleChange('exm_titulo')}
                        />
                        {errors.exm_titulo && touched.exm_titulo ? (
                            <Text>{errors.exm_titulo}</Text>
                        ) : null}
                        <TextInput
                            style={styles.input}
                            placeholder="Autor"
                            autoCorrect={false}
                            value={values.exm_autor}
                            onChangeText={handleChange('exm_autor')}
                        />
                        {errors.exm_autor && touched.exm_autor ? (
                            <Text>{errors.exm_autor}</Text>
                        ) : null}
                        <TextInput
                            style={styles.input}
                            placeholder="Gênero"
                            autoCorrect={false}
                            value={values.exm_genero}
                            onChangeText={handleChange('exm_genero')}
                        />
                        {errors.exm_genero && touched.exm_genero ? (
                            <Text>{errors.exm_genero}</Text>
                        ) : null}
                        <TextInput
                            style={styles.input}
                            placeholder="Editora"
                            autoCorrect={false}
                            value={values.exm_editora}
                            onChangeText={handleChange('exm_editora')}
                        />
                        {errors.exm_editora && touched.exm_editora ? (
                            <Text>{errors.exm_editora}</Text>
                        ) : null}

                        <Text style={styles.label}>Descrição do anúncio</Text>
                        <TextInput
                            style={styles.inputText}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Ex: Busco por livros acadêmicos na área da tecnologia."
                            autoCorrect={false}
                            value={values.anc_descricao}
                            onChangeText={handleChange('anc_descricao')}
                        />

                        <TouchableOpacity 
                            style={styles.btnSubmit}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.btnSubmitText}>
                                {loading ? 'Criando...' : 'Criar anúncio'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
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
        textAlignVertical : "top",
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
    imagesInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderStyle: 'dashed',
        borderColor: '#031d44',
        borderWidth: 1.4,
        borderRadius: 5,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    uploadedImagesContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    uploadedImage: {
        width: 64,
        height: 64,
        borderRadius: 5,
        marginBottom: 32,
        marginRight: 8,
    },
})
