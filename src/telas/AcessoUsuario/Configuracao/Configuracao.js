import React, { useState } from 'react';
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

const PerfilRoute = (props) => {

  return (
    <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={80}>
      <ScrollView>
        <View style={styles.form}>
          <TouchableOpacity onPress={props.handleSelectImage}>
            <Image
              key={1}
              source={
                props.image
                ? { uri: props.image }
                : props.usuario.usr_foto
                ? { uri: props.usuario.usr_foto.url }
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
            value={props.userApelido}
            onChangeText={props.setUserApelido}
          />

          <TextInput
            style={styles.input}
            placeholder="Nome"
            autoCorrect={false}
            value={props.userNome}
            onChangeText={props.setUserNome}
          />

          <TextInput
            style={styles.input}
            placeholder="CPF"
            autoCorrect={false}
            value={props.userCpf}
            onChangeText={props.setUserCpf}
          />

          <TouchableOpacity 
              style={styles.btnSubmit}
              onPress={props.handlePerfilSubmit}
          >
              <Text style={styles.btnSubmitText}>
                  {props.loading ? 'Atualizando...' : 'Atualizar dados'}
              </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )

}

const LocalizacaoRoute = (props) => {

  function handleCep(e) {
    const value = e.nativeEvent.text;

    const cep = value?.replace(/[^0-9]/g, '');
    if (cep?.length !== 8) {
      props.setUserUf(null);
      props.setUserCidade(null);
      props.setUserBairro(null);
      
      return;
    }
    
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if(data) {
          props.setUserCep(data.cep);
          props.setUserUf(data.uf);
          props.setUserCidade(data.localidade);
          props.setUserBairro(data.bairro);
        }
      }
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={80}>
      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.label}>Dados de Localização</Text>       
          <TextInput
            style={styles.input}
            placeholder="CEP"
            autoCorrect={false}
            value={props.userCep}
            onChangeText={props.setUserCep}
            onEndEditing={handleCep}
          />
                        
          <TextInput
            style={styles.input}
            placeholder="UF"
            editable={false}
            selectTextOnFocus={false}
            autoCorrect={false}
            value={props.userUf}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            editable={false}
            selectTextOnFocus={false}
            autoCorrect={false}
            value={props.userCidade}
          />

          <TextInput
            style={styles.input}
            placeholder="Bairro"
            editable={false}
            selectTextOnFocus={false}
            autoCorrect={false}
            value={props.userBairro}
          />

          <TouchableOpacity 
              style={styles.btnSubmit}
              onPress={props.handlePerfilSubmit}
          >
              <Text style={styles.btnSubmitText}>
                  {props.loading ? 'Atualizando...' : 'Atualizar dados'}
              </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const TrocaRoute = (props) => {
  const [scroll, setScroll] = useState(true);
  const [labelOption, setLabelOption] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={80}>
      <ScrollView scrollEnabled={scroll}>
        <View style={styles.form}>
          <Text style={styles.label}>Preferências de Troca</Text>
          <MultiSlider 
            values={props.range}
            onValuesChangeStart={() => {
              setLabelOption(true); 
              setScroll(false);
            }}
            onValuesChangeFinish={(values) => {
              props.setRange(values);
              setLabelOption(false);
              setScroll(true);
            }}
            enableLabel={labelOption}
            min={0}
            max={50}
            snapped={true}
          />

          <Text>{props.range}</Text>

          <TouchableOpacity 
              style={styles.btnSubmit}
              onPress={props.handlePerfilSubmit}
          >
              <Text style={styles.btnSubmitText}>
                  {props.loading ? 'Atualizando...' : 'Atualizar dados'}
              </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default function Configuracao() {
  const { usuario, setUsuario } = useAuth();

  const [tabViewIndex, setTabViewIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  // const [formKey, setFormKey] = useState(1);

  const [userApelido, setUserApelido] = useState(usuario.usr_apelido ? usuario.usr_apelido : '');
  const [userNome, setUserNome] = useState(usuario.usr_nome ? usuario.usr_nome : '');
  const [userCpf, setUserCpf] = useState(usuario.usr_cpf ? usuario.usr_cpf : '');
  const [image, setImage] = useState();
  const [userUf, setUserUf] = useState(usuario.usr_ender_uf ? usuario.usr_ender_uf : '');
  const [userCep, setUserCep] = useState(usuario.usr_ender_cep ? usuario.usr_ender_cep : '');
  const [userCidade, setUserCidade] = useState(usuario.usr_ender_cidade ? usuario.usr_ender_cidade : '');
  const [userBairro, setUserBairro] = useState(usuario.usr_ender_bairro ? usuario.usr_ender_bairro : '');
  const [range, setRange] = useState(usuario.usr_range_troca ? usuario.usr_range_troca : [0]);

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

  async function handlePerfilSubmit() {
    const data = await handleFormData();
    // console.log(data)

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
    data.append('usr_ender_uf', userUf);
    data.append('usr_ender_cep', userCep);
    data.append('usr_ender_cidade', userCidade);
    data.append('usr_ender_bairro', userBairro);
    data.append('usr_range_troca', range[0]);

    data.append('imagem', {
      name: `user_image_1.jpg`,
      type: 'image/jpg',
      uri: image
    });

    return data;
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'perfil':
        return <PerfilRoute 
          image={image}
          setimage={setImage}
          userApelido={userApelido}
          setUserApelido={setUserApelido}
          userNome={userNome}
          setUserNome={setUserNome}
          userCpf={userCpf}
          setUserCpf={setUserCpf}
          usuario={usuario}
          handleSelectImage={handleSelectImage}
          handlePerfilSubmit={handlePerfilSubmit}
          loading={loading}
        />;
      case 'localizacao':
        return <LocalizacaoRoute 
          userUf={userUf}
          setUserUf={setUserUf}
          userCep={userCep}
          setUserCep={setUserCep}
          userCidade={userCidade}
          setUserCidade={setUserCidade}
          userBairro={userBairro}
          setUserBairro={setUserBairro}
          handlePerfilSubmit={handlePerfilSubmit}
          loading={loading}
        />;
      case 'troca':
        return <TrocaRoute 
          range={range}
          setRange={setRange}
          handlePerfilSubmit={handlePerfilSubmit}
          loading={loading}
        />;
      default:
        return null;
    }
  };

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