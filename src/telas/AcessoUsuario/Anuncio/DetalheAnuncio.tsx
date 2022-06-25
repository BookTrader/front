import React, { useEffect, useState } from 'react';
import { Alert, Image, RefreshControl, ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import ButtonCustom from '../../../components/button';
import Footer from '../../../components/footer';
import WppButton from '../../../components/WppButton';

import { api } from '../../../service/api';
import { useAuth } from '../../../context/auth'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';


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

  const slider_width = Dimensions.get('window').width;
  const item_width = slider_width * 0.88;

  const carouselItems =[
    {
      imgUrl:'https://assets.adin.com.br/clientes/arezzo/emkt/Arezzo/2022/06/footer-bolsas-miranda.png'
    },
    {
      imgUrl:'https://assets.adin.com.br/clientes/arezzo/emkt/Arezzo/2022/06/footer-megan.jpg'
    },
    {
      imgUrl:'https://assets.adin.com.br/clientes/arezzo/emkt/Arezzo/2022/06/footer-inverno.png'
    },
  ]

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

  return (
    
    <ScrollView style={styles.container}>
          
          <Carousel
            data={carouselItems}
            renderItem={carouselCardItem}
            sliderWidth={slider_width}
            itemWidth={item_width}
            useScrollView={true}
          />

          <View style={styles.bloco}>
            <View style={styles.textContent}>
              <Text style={styles.title}>O poder do hábito</Text>
              <Text style={styles.title}>Autor:<Text style={styles.textList}> Charles Duhigg</Text></Text>
              <Text style={styles.title}>Gênero:<Text style={styles.textList}> Filosofia</Text></Text>
              <Text style={styles.title}>Editora:<Text style={styles.textList}> Abril</Text></Text>
            </View>

            <View style={styles.textContent}>
              <Text style={styles.desc}>Descrição</Text>
            </View>
            <View style={styles.textContent}>
              <Text style={styles.textContent}>
              Durante os últimos dois anos, uma jovem transformou quase todos os aspectos de sua vida. Parou de fumar, correu uma maratona e foi promovida. Em um laboratório, neurologistas descobriram que os padrões dentro do cérebro dela mudaram de maneira fundamental. Publicitários da Procter & Gamble observaram vídeos de pessoas fazendo a cama.
              </Text>
            </View>


            <ButtonCustom/>

            <View style={styles.line}/>
              <Footer/>
            </View>

            <WppButton 
              style={{bottom: 80, right: 60}}
            />


          
      {/* <View>
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
      )} */}
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