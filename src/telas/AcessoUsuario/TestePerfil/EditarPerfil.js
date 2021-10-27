import React from 'react';
import { 
  KeyboardAvoidingView, 
  ScrollView, 
  StyleSheet, 
  View,
  Text,
  Button
} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function TestePerfil({ navigation }) {

  return (
    <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={80}>
      
      {/* Nome, imagem e user */}
      <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image source={require(
            '../../../../assets/rodrigo-foto.jpg'
            )}
            size={80}/>
            <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {
                marginTop: 15,
                marginBottom: 5,
              }]}>José Serra</Title>
              <Caption style={styles.caption}>@jose_serrinha</Caption>
            </View>
        </View>
      </View>
      
      {/* Infos adicionais */}
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>São Paulo, Brasil</Text>
        </View>
        <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>+55 11 992766210</Text>
        </View>
        <View style={styles.row}>
            <Icon name="email" color="#777777" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>joseserrabrasil@gmail.com</Text>
        </View>
      </View>

      {/* Nota e trocas */}
      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, {
          borderRightColor: '#dddddd',
          borderRightWidth: 1,
        }]}>
          <Title>4.8</Title>
          <Caption>Nota</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>17</Title>
          <Caption>Trocas realizadas</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Livros favoritos</Text>

          </View>
        </TouchableRipple>
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Icon name="map-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Configurações de localização</Text>

          </View>
        </TouchableRipple>
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Icon name="tools" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Preferências de troca</Text>

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
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
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
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26
  },
});