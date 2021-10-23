import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { 
  Image, 
  KeyboardAvoidingView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import { useAuth } from '../../../context/auth';
import { api } from '../../../service/api';

export default function Configuracao() {
  const { usuario, setUsuario } = useAuth();

  const [tabViewIndex, setTabViewIndex] = useState(0);
  const [formKey, setFormKey] = useState(1);
  const [range, setRange] = useState(usuario.usr_range_troca ? usuario.usr_range_troca : [0]);
  const [image, setImage] = useState();
  const [labelOption, setLabelOption] = useState(false);
  const [scroll, setScroll] = useState(true);
  const [loading, setLoading] = useState(false);

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
  }

  const PerfilRoute = () => {

    async function handlePerfilSubmit(values) {
      const data = await handleFormData(values);

      await api
        .patch(`/usuario/${usuario.id}`, data)
        .then((response) => {
            const updatedUser = response.data;
            setUsuario(updatedUser);
        })
    }

    async function handleFormData(values) {
      const data = new FormData();

      data.append('usr_apelido', values.usr_apelido);
      data.append('usr_nome', values.usr_nome);
      data.append('usr_cpf', values.usr_cpf);
      data.append('imagem', {
        name: `user_image_1.jpg`,
        type: 'image/jpg',
        uri: image
      });

      return data;
    }

    return (
      <Formik
        initialValues={{
          usr_apelido: usuario.usr_apelido ? usuario.usr_apelido : '',
          usr_nome: usuario.usr_nome ? usuario.usr_nome : '',
          usr_cpf: usuario.usr_cpf ? usuario.usr_cpf : '',
        }}
        key={formKey}
        onSubmit={(values) => handlePerfilSubmit(values)}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={80}>
            <ScrollView>
              <View style={styles.form}>
                <TouchableOpacity onPress={handleSelectImage}>
                  <Image
                    key={1}
                    source={
                      image
                      ? { uri: image }
                      : usuario.usr_foto
                      ? { uri: usuario.usr_foto.url }
                      : require('../../../../assets/rodrigo-foto.jpg')
                    }
                    style={styles.image}
                  />
                </TouchableOpacity>

                <Text style={styles.label}>Dados Pessoais</Text>
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
                  placeholder="Nome"
                  autoCorrect={false}
                  value={values.usr_nome}
                  onChangeText={handleChange('usr_nome')}
                />
                {errors.usr_nome && touched.usr_nome ? (
                    <Text>{errors.usr_nome}</Text>
                ) : null}

                <TextInput
                  style={styles.input}
                  placeholder="CPF"
                  autoCorrect={false}
                  value={values.usr_cpf}
                  onChangeText={handleChange('usr_cpf')}
                />
                {errors.usr_cpf && touched.usr_cpf ? (
                    <Text>{errors.usr_cpf}</Text>
                ) : null}

                <TouchableOpacity 
                    style={styles.btnSubmit}
                    onPress={handleSubmit}
                >
                    <Text style={styles.btnSubmitText}>
                        {loading ? 'Atualizando...' : 'Atualizar dados'}
                    </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    )
  }

  const LocalizacaoRoute = () => {
    const [userAddress, setUserAddress] = useState();

    function handleCep(e) {
      const value = e.nativeEvent.text;

      const cep = value?.replace(/[^0-9]/g, '');
      if (cep?.length !== 8) {
        return;
      }
      
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => setUserAddress(data));
    }

    return (
      <Formik
        initialValues={{
          usr_ender_uf: usuario.usr_ender_uf ? usuario.usr_ender_uf : '',
          usr_ender_cep: usuario.usr_ender_cep ? usuario.usr_ender_cep : '',
          usr_ender_cidade: usuario.usr_ender_cidade ? usuario.usr_ender_cidade : '',
          usr_ender_bairro: usuario.usr_ender_bairro ? usuario.usr_ender_bairro : '',
        }}
        key={formKey}
        onSubmit={(values) => handleUserData(values)}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={80}>
            <ScrollView scrollEnabled={scroll}>
              <View style={styles.form}>
                <Text style={styles.label}>Dados de Localização</Text>       
                <TextInput
                  style={styles.input}
                  placeholder="CEP"
                  autoCorrect={false}
                  value={usuario.usr_ender_cep ? usuario.usr_ender_cep : values.usr_ender_cep}
                  onChangeText={handleChange('usr_ender_cep')}
                  onEndEditing={handleCep}
                />
                {errors.usr_ender_cep && touched.usr_ender_cep ? (
                    <Text>{errors.usr_ender_cep}</Text>
                ) : null}
                              
                <TextInput
                  style={styles.input}
                  placeholder="UF"
                  editable={false}
                  selectTextOnFocus={false}
                  autoCorrect={false}
                  value={usuario.usr_ender_uf ? usuario.usr_ender_uf : userAddress?.uf}
                  onChangeText={handleChange('usr_ender_uf')}
                />
                {errors.usr_ender_uf && touched.usr_ender_uf ? (
                    <Text>{errors.usr_ender_uf}</Text>
                ) : null}
                
                <TextInput
                  style={styles.input}
                  placeholder="Cidade"
                  editable={false}
                  selectTextOnFocus={false}
                  autoCorrect={false}
                  value={usuario.usr_ender_cidade ? usuario.usr_ender_cidade : userAddress?.localidade}
                  onChangeText={handleChange('usr_ender_cidade')}
                />
                {errors.usr_ender_cidade && touched.usr_ender_cidade ? (
                    <Text>{errors.usr_ender_cidade}</Text>
                ) : null}

                <TextInput
                  style={styles.input}
                  placeholder="Bairro"
                  editable={false}
                  selectTextOnFocus={false}
                  autoCorrect={false}
                  value={usuario.usr_ender_bairro ? usuario.usr_ender_bairro : userAddress?.bairro}
                  onChangeText={handleChange('usr_ender_bairro')}
                />
                {errors.usr_ender_bairro && touched.usr_ender_bairro ? (
                    <Text>{errors.usr_ender_bairro}</Text>
                ) : null}

                <TouchableOpacity 
                    style={styles.btnSubmit}
                >
                    <Text style={styles.btnSubmitText}>
                        {loading ? 'Atualizando...' : 'Atualizar dados'}
                    </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    )
  }

  const TrocaRoute = () => {
    return (
      <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={80}>
        <ScrollView>
          <View style={styles.form}>
            <Text style={styles.label}>Preferências de Troca</Text>
            <MultiSlider 
              values={range}
              onValuesChangeStart={() => {
                setLabelOption(true); 
                setScroll(false);
              }}
              onValuesChangeFinish={(values) => {
                setRange(values);
                setLabelOption(false);
                setScroll(true);
              }}
              enableLabel={labelOption}
              min={0}
              max={50}
              snapped={true}
            />

            <Text>{range}</Text>

            <TouchableOpacity 
                style={styles.btnSubmit}
            >
                <Text style={styles.btnSubmitText}>
                    {loading ? 'Atualizando...' : 'Atualizar dados'}
                </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

  const renderScene = SceneMap({
    perfil: PerfilRoute,
    localizacao: LocalizacaoRoute,
    troca: TrocaRoute
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#fff' }}
      style={{ backgroundColor: '#e53945' }}
    />
  );

  return (
    <TabView
      navigationState={{ 
        index: tabViewIndex,
        routes: [
          { key: 'perfil', title: 'Perfil' },
          { key: 'localizacao', title: 'Localização' },
          { key: 'troca', title: 'Troca' }
        ]
      }}
      renderScene={renderScene}
      onIndexChange={setTabViewIndex}
      renderTabBar={renderTabBar}
    />
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
  image: {
    width: 50,
    height: 50,
    borderRadius: 50
  }
})