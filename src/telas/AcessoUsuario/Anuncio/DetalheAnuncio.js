import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, Text, View } from 'react-native';

import { api } from '../../../service/api';

export default function DetalheAnuncio({ route }) {

  const anc_id = route.params?.anc_id;

  const [anuncio, setAnuncio] = useState();
  const [exemplar, setExemplar] = useState();
  const [usuario, setUsuario] = useState();

  useEffect(() => {
    const setData = async () => {
      await api.get(`/anuncio/${anc_id}`).then(async (response) => {
        await (
          setAnuncio(response.data.anuncio),
          setUsuario(response.data.usuario),
          setExemplar(response.data.exemplar)
        )
      })
      .catch((err) => {
        console.log("Erro na busca de anuncio!")
      });
    }
    setData();
  }, []) 
  

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow : 1, justifyContent : 'center' }}
    >
      <View>
        <Image 
          style={{ height: 100, width: 100 }}
          source={
            usuario?.usr_foto?.url 
            ? { uri: usuario.usr_foto.url }
            : require('../../../../assets/rodrigo-foto.jpg')
          }
        />
        <Text>{usuario?.usr_nome}</Text>
        { usuario?.usr_ender_uf ? 
          <Text>{ usuario?.usr_ender_cidade }, { usuario?.usr_ender_uf }</Text>
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
        <Button title={'Fazer Proposta'}/>
      </View>
    </ScrollView>
  );
}