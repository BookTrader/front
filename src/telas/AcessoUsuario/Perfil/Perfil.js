import React, { useEffect, useState } from 'react';
import { 
  KeyboardAvoidingView, 
  StyleSheet, 
  View,
  Text,
} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../../context/auth';
import { useLocation } from '../../../context/location';
import { api } from '../../../service/api';

export default function Perfil({ navigation }) {
  const {usuario} = useAuth();

  const [anuncios, setAnuncios] = useState()
  const [exemplares, setExemplares] = useState()

  useEffect(() => {
    api.get(`/list/exemplar/usuario/${usuario.id}`)
      .then((resp) => {
        setAnuncios(resp.data.anuncios)
        setExemplares(resp.data.exemplares)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={80}>
      
      {/* Nome, imagem e user */}
      <View style={styles.userInfoSection}>
      
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image source={
            usuario.usr_foto
            ? { uri: usuario.usr_foto.url }
            : require(
            '../../../../assets/rodrigo-foto.jpg'
            )}
            size={80}/>
            <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {
                marginTop: 15,
                marginBottom: 5,
              }]}>{usuario ? usuario.usr_apelido : ''}</Title>
              <Caption style={styles.caption}>{usuario ? usuario.usr_email : ''}</Caption>
            </View>
        </View>
      </View>
      
      {/* Infos adicionais */}
      <View style={styles.userInfoSection}>
        {usuario?.usr_ender_cidade && usuario?.usr_ender_uf && (
          <View style={styles.row}>
              <Icon name="map-marker-radius" color="#000000" size={20}/>
              <Text style={{color:"#000000", marginLeft: 20}}>{usuario.usr_ender_cidade}, {usuario.usr_ender_uf}</Text>
          </View>
        )}
        <View style={styles.row}>
            <Icon name="email" color="#000000" size={20}/>
            <Text style={{color:"#000000", marginLeft: 20}}>{usuario ? usuario.usr_email : ''}</Text>
        </View>
      </View>

      {/* Nota e trocas */}
      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, {
          borderRightColor: '#dddddd',
          borderRightWidth: 1,
        }]}>
          <Title style={{color: '#031d44'}}>{exemplares}</Title>
          <Caption style={{color: '#000000'}}>Exemplares criados</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title style={{color: '#031d44'}}>{anuncios}</Title>
          <Caption style={{color: '#000000'}}>Anúncios criados</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => navigation.navigate('ConfigurarTroca')}>
          <View style={styles.menuItem}>
            <Icon name="tools" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Preferências de troca</Text>

          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('EditarPerfil')}>
          <View style={styles.menuItem}>
            <Icon name="tools" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Configurações da conta</Text>

          </View>
        </TouchableRipple>
      </View>
    </KeyboardAvoidingView>
  )

}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ECECEC',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    color: '#031d44',
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    
    height: 100,
  },
  infoBox: {
    
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#000000',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26
  },
});