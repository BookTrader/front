import React from "react";
import { View, Image, StyleSheet, Text, ScrollView } from "react-native";

export default function EmptyContent({contentType}) {
  return (
    <View style={styles.container}>
      <Image 
        style={styles.image}
        source={require('../../assets/sad-face.png')}
      />
      <Text style={styles.text}>Ops... Não encontramos nenhum {contentType}...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#031D44'
  }
});