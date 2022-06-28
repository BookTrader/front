import React, { useCallback, useEffect, useState } from 'react'
import { Linking, Text, TouchableOpacity, View } from 'react-native'
import Card from '../../../components/Card';
import { api } from '../../../service/api';
import {Feather as Icon } from "@expo/vector-icons";
import { useAuth } from '../../../context/auth';
import WppButton from '../../../components/WppButton';

const Troca = ({ route, navigation }) => {
  const { anc_id } = route.params;
  const { usuario } = useAuth()

  const [anuncio, setAnuncio] = useState(null);
  const [proposta, setProposta] = useState(null);

  useEffect(() => {
    api.get(`/troca/${anc_id}`).then((resp) => {
      setAnuncio(resp.data.anuncio);
      setProposta(resp.data.proposta);
    })
    .catch((err) => {
      console.log(err.response)
    })
  }, [anc_id]);

  let url = '';
  let message = ''
  const openChat = useCallback(async () => {
    console.log(anuncio)
    if (usuario.id === anuncio.anc_user.id) {
      message = `Olá ${proposta.prop_user.usr_nome}, vamos fazer uma troca?`;
      url = `whatsapp://send?text=${message}&phone=+55${proposta.prop_user.usr_telefone}`;
    } else {
      message = `Olá ${anuncio.anc_user.usr_nome}, vamos fazer uma troca?`;
      url = `whatsapp://send?text=${message}&phone=+55${anuncio.anc_user.usr_telefone}`;
    }
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  if(!anuncio || !proposta) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={{ flexGrow : 1, justifyContent : 'center', paddingRight: 10, paddingLeft: 10 }}>
      <TouchableOpacity 
          onPress={() => {
              navigation.navigate(
                  "DetalheAnuncio", 
                  {anc_id: anuncio?.anc_id}
              )
          }} 
          key={anuncio?.anc_id}
      >
          <Card 
              image={anuncio?.anc_exm.imagem ? anuncio.anc_exm.imagem.url : null}
              tituloExemplar={anuncio?.anc_exm ? anuncio.anc_exm.exm_titulo : null}
              autorExemplar={anuncio?.anc_exm ? anuncio.anc_exm.exm_autor : null}
              generoExemplar={anuncio?.anc_exm ? anuncio.anc_exm.exm_genero : null}
              editoraExemplar={anuncio?.anc_exm ? anuncio.anc_exm.exm_editora : null}
              local={`${anuncio?.anc_user?.usr_ender_bairro}, ${anuncio.anc_user?.usr_ender_cidade}`}
          />
      </TouchableOpacity>

      <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 10, marginTop: 10}}>
          <Icon name="arrow-down" color={'grey'} size={50}/>
          <Icon name="arrow-up" color={'grey'} size={50}/>
      </View>

      <TouchableOpacity 
          onPress={() => {
              navigation.navigate(
                  "DetalheProposta", 
                  {prop_id: proposta?.prop_id}
              )
          }} 
          key={proposta?.prop_id}
      >
          <Card 
              image={proposta?.prop_exm.imagem ? proposta.prop_exm.imagem.url : null}
              tituloExemplar={proposta?.prop_exm ? proposta.prop_exm.exm_titulo : null}
              autorExemplar={proposta?.prop_exm ? proposta.prop_exm.exm_autor : null}
              generoExemplar={proposta?.prop_exm ? proposta.prop_exm.exm_genero : null}
              editoraExemplar={proposta?.prop_exm ? proposta.prop_exm.exm_editora : null}
              local={`${proposta?.prop_user?.usr_ender_bairro}, ${proposta.prop_user?.usr_ender_cidade}`}
          />
      </TouchableOpacity>

      <WppButton 
        style={{bottom: 80, right: 60}}
        onPress={() => openChat()}
      />
    </View>
  );
}

export default Troca;