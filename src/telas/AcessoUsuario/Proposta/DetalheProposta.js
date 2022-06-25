import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, RefreshControl, ScrollView, Text, View } from 'react-native';

import { api } from '../../../service/api';
import { useAuth } from '../../../context/auth'

export default function DetalheAnuncio({ route, navigation }) {
  const { prop_id } = route.params;
  const { usuario } = useAuth();

  const [exemplar, setExemplar] = useState();
  const [user, setUser] = useState();
  const [proposta, setProposta] = useState();
  const [anuncio, setAnuncio] = useState();
  
  const loadPage = async () => {
    await api.get(`/proposta/${prop_id}`).then((response) => {
      setProposta(response.data.proposta),
      setUser(response.data.usuario),
      setExemplar(response.data.exemplar)
      setAnuncio(response.data.anuncio)
    })
    .catch((err) => {
      console.log("Erro na busca de proposta!")
    });
  }

  useEffect(() => {
    loadPage();
  }, [prop_id])

  const acceptProposal = async () => {
    const anc_id = anuncio.anc_id

    await api.post(`anuncio/${anc_id}/proposta/${prop_id}/troca`)
      .then((response) => {
        navigation.navigate('DetalheTroca', { anc_id })
      })
      .catch((err) => {
        Alert.alert("Erro ao criar troca.")
      })
  }

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow : 1, justifyContent : 'center' }}
    >
      <View>
        <Text>Quem fez a proposta</Text>
        <Image 
          style={{ height: 100, width: 100 }}
          source={
            user?.usr_foto
            ? { uri: `http://192.168.100.83:3333/uploads/${user.usr_foto}` }
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
        <Text>{proposta?.prop_descricao}</Text>
      </View>
      {usuario?.id === anuncio?.usr_id && (
        <View>
          <Button title={'Aceitar Proposta'} onPress={() => acceptProposal()} disabled={!usuario || usuario?.id === user?.usr_id}/>
        </View>
      )}
    </ScrollView>
  );
}