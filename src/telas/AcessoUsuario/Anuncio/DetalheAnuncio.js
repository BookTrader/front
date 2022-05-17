import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, ScrollView, Text, View } from 'react-native';

import { api } from '../../../service/api';
import { useAuth } from '../../../context/auth'

export default function DetalheAnuncio({ route, navigation }) {

  const anc_id = route.params?.anc_id;
  const { usuario } = useAuth();

  const [anuncio, setAnuncio] = useState();
  const [exemplar, setExemplar] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const setData = async () => {
      await api.get(`/anuncio/${anc_id}`).then(async (response) => {
        await (
          setAnuncio(response.data.anuncio),
          setUser(response.data.usuario),
          setExemplar(response.data.exemplar)
        )
      })
      .catch((err) => {
        console.log("Erro na busca de anuncio!")
      });
    }
    setData();
  }, []) 
  
  const handleProposal = () => {
    !!usuario?.is_active ? 
      navigation.navigate(
        "CriarProposta", 
        {anc_id: anc_id}
      )
    : Alert.alert("Cadastro incompleto! Atualize seus dados na página de perfil.")
  }

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow : 1, justifyContent : 'center' }}
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
        <Button title={'Fazer Proposta'} onPress={() => handleProposal()} disabled={!usuario}/>
      </View>
    </ScrollView>
  );
}