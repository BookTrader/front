import React, { useEffect, useState } from 'react';
import { Alert, Image, RefreshControl, ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import ButtonCustom from '../../../components/button';
import Footer from '../../../components/footer';

import { api } from '../../../service/api';
import { useAuth } from '../../../context/auth'
import Carousel from 'react-native-snap-carousel';


export default function DetalheAnuncio({ route, navigation }) {

  const anc_id = route.params?.anc_id;
  const { usuario } = useAuth();

  const [anuncio, setAnuncio] = useState(null);
  const [exemplar, setExemplar] = useState(null);
  const [user, setUser] = useState(null);
  const [proposta, setProposta] = useState(null);
  
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
      }).catch((err) => console.log(err.response))
  }

  useEffect(() => {
    anc_id && loadPage();
  }, [anc_id, refresh])

  useEffect(() => {
    if(anuncio?.status === 'closed' && usuario?.id === anuncio?.usr_id) {
      navigation.navigate('DetalheTroca', { anc_id })
    }
  }, [anuncio])
  
  const handleProposal = () => {
    !!usuario?.is_active ? 
      navigation.navigate(
        "CriarProposta", 
        {anc_id: anc_id}
      )
    : Alert.alert("Cadastro incompleto! Atualize seus dados na página de perfil.")
  }

  // const goToProposal = (id) => {
  //   console.log(id)
  //   navigation.navigate("DetalheProposta", {prop_id: id})
  // }

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
      refreshControl={
        <RefreshControl 
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
        />
      }
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
              {anuncio?.anc_descricao ? anuncio?.anc_descricao : 'Sem descrição...'}
            </Text>
          </View>

          {usuario && usuario?.id !== anuncio?.usr_id && (
            <ButtonCustom onPress={() => handleProposal()}>Fazer proposta</ButtonCustom>
          )}

          {usuario && proposta && (
            <>
              <View style={styles.line}>
                <Footer propostas={proposta} navigation={navigation} />
              </View>
            </>
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