import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, RefreshControl, ScrollView, Text, View } from 'react-native';

import { api } from '../../../service/api';
import { useAuth } from '../../../context/auth'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DetalheAnuncio({ route, navigation }) {

  const anc_id = route.params?.anc_id;
  const { usuario } = useAuth();

  const [anuncio, setAnuncio] = useState();
  const [exemplar, setExemplar] = useState();
  const [user, setUser] = useState();
  const [proposta, setProposta] = useState();
  
  const [refresh, setRefresh] = useState(false);

  const loadPage = async () => {
    await api.get(`/anuncio/${anc_id}`).then((response) => {
      setAnuncio(response.data.anuncio),
      setUser(response.data.usuario),
      setExemplar(response.data.exemplar)
      setRefresh(false);
    })
    .catch((err) => {
      console.log("Erro na busca de anuncio!")
      setRefresh(false)
    });

    await api.get(`/anuncio/${anc_id}/proposta`)
      .then((res) => {
        setProposta(res.data);
        setRefresh(false);
      })
  }

  useEffect(() => {
    loadPage();
  }, [anc_id, refresh])
  
  const handleProposal = () => {
    !!usuario?.is_active ? 
      navigation.navigate(
        "CriarProposta", 
        {anc_id: anc_id}
      )
    : Alert.alert("Cadastro incompleto! Atualize seus dados na página de perfil.")
  }

  const goToProposal = (id) => {
    console.log(id)
    navigation.navigate("DetalheProposta", {prop_id: id})
  }

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow : 1, justifyContent : 'center' }}
      refreshControl={
        <RefreshControl 
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
        />
    }
    >
      <View>
        <Image 
          style={{ height: 100, width: 100 }}
          source={
            user?.usr_foto?.url 
            ? { uri: user.usr_foto.url }
            : require('../../../../assets/rodrigo-foto.jpg')
          }
        />
        <Text>{user?.usr_nome}</Text>
        { user?.usr_ender_uf ? 
          <Text>{ user?.usr_ender_cidade }, { user?.usr_ender_uf }</Text>
         : null }
      </View>
      <View>
        { exemplar?.imagens ? exemplar?.imagens.map((imagem) => (
          <Image 
            style={{ height: 100, width: 100 }}
            source={{ uri: imagem.url }}
            key={ imagem.id }
          />
         )) : null }
        <Text>{exemplar?.exm_titulo}</Text>
        <Text>{exemplar?.exm_genero}</Text>
        <Text>{exemplar?.exm_autor}</Text>
        <Text>{anuncio?.anc_descricao}</Text>
      </View>
      <View>
        <Button title={'Fazer Proposta'} onPress={() => handleProposal()} disabled={!usuario || usuario?.id === anuncio?.usr_id}/>
      </View>

      {usuario && (
        <View>
            <Text>Propostas</Text>
            {proposta && proposta.map((prop) => (
              <TouchableOpacity onPress={() => goToProposal(prop.proposta?.prop_id)} key={prop.proposta?.prop_id}>
                <View >
                  <Image 
                    style={{ height: 100, width: 100 }}
                    source={{ uri: prop.exemplar?.imagem?.url }}
                    key={ prop.exemplar.exm_id }
                    />
                  <Text>{prop?.exemplar?.exm_titulo}</Text>
                  <Text>{prop?.exemplar?.exm_genero}</Text>
                  <Text>{prop?.exemplar?.exm_autor}</Text>
                  <Text>{prop?.usuario?.usr_apelido}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      )}
    </ScrollView>
  );
}