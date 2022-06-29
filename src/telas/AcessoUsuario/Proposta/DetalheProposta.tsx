import React, { useEffect, useState } from 'react';
import { Alert, Image, RefreshControl, ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import ButtonCustom from '../../../components/button';

import { api } from '../../../service/api';
import { useAuth } from '../../../context/auth'
import Carousel from 'react-native-snap-carousel';


export default function DetalheAnuncio({ route, navigation }) {

  const { prop_id } = route.params;
  const { usuario } = useAuth();

  const [anuncio, setAnuncio] = useState(null);
  const [exemplar, setExemplar] = useState(null);
  const [user, setUser] = useState(null);
  const [proposta, setProposta] = useState(null);
  
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

  useEffect(() => {
    if(anuncio?.status === 'closed' && usuario?.id === anuncio?.usr_id) {
      navigation.navigate('DetalheTroca', { anc_id: anuncio?.anc_id })
    }
  }, [proposta])

  const acceptProposal = async () => {
    const anc_id = anuncio.anc_id
    console.log(anc_id)
    console.log(prop_id)

    await api.post(`anuncio/${anc_id}/proposta/${prop_id}/troca`)
      .then((response) => {
        navigation.navigate('DetalheTroca', { anc_id })
      })
      .catch((err) => {
        console.log(err.response)
        Alert.alert("Erro ao criar troca.")
      })
  }

  const slider_width = Dimensions.get('window').width;
  const item_width = slider_width * 0.88;

  let carouselItems = []
  carouselItems = exemplar && exemplar.imagens.map((img) => {
    return {imgUrl: img?.url}
  })

  type Props = {
    item: {
      imgUrl: string
    }
    index: number
  }

  function carouselCardItem({item, index}: Props){
    return(
      <View style={styles.cardCarousel} key={index}>
        <Image style={styles.img} source={{uri: item.imgUrl}}/>
      </View>
    )
  }

  {!anuncio || !exemplar || !proposta && (
    <Text style={{textAlign: 'center', textAlignVertical:'center'}}>Carregando...</Text>
  )}

  return (
    <ScrollView 
      style={styles.container}
    >
        {carouselItems && (
          <Carousel
          data={carouselItems}
          renderItem={carouselCardItem}
          sliderWidth={slider_width}
          itemWidth={item_width}
          useScrollView={true}
          />
        )}

        <View style={styles.bloco}>
          <View style={styles.textContent}>
            <Text style={styles.title}>{exemplar?.exm_titulo}</Text>
            <Text style={styles.title}>Autor:<Text style={styles.textList}> {exemplar?.exm_autor}</Text></Text>
            <Text style={styles.title}>Gênero:<Text style={styles.textList}> {exemplar?.exm_genero}</Text></Text>
            <Text style={styles.title}>Editora:<Text style={styles.textList}> {exemplar?.exm_editora}</Text></Text>
          </View>

          <View style={styles.textContent}>
            <Text style={styles.desc}>Descrição</Text>
          </View>
          <View style={styles.textContent}>
            <Text style={styles.textContent}>
              {proposta?.prop_descricao ? proposta?.prop_descricao : 'Sem descrição...'}
            </Text>
          </View>

          {usuario && usuario?.id !== user?.usr_id && (
            <ButtonCustom onPress={() => acceptProposal()}>Aceitar proposta</ButtonCustom>
          )}

        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    backgroundColor:'#ECECEC'
  },
  image:{
    marginTop: '5%',
    alignSelf: 'center'
  },
  bloco:{
    marginTop: '7%'
  },
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: '2%'
    },
  desc:{
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: '2%',
  },
  button:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 5,
  },
  textContent:{
    fontSize: 16,
    lineHeight: 25,
    marginVertical: '1%',
    paddingHorizontal: '2%'
  },
  textList:{
    fontSize: 16,
    lineHeight: 25,
    fontWeight: 'normal'
  },
  line:{
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  cardCarousel:{
    width: '100%',
    marginTop: '5%'
  },
  img:{
    height: 250,
    borderRadius: 5,
  },
});