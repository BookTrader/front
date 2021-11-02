import React from 'react';
import { 
  KeyboardAvoidingView, 
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export default function Perfil({ navigation }) {

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload de Foto</Text>
        <Text style={styles.panelSubtitle}>Selecione sua foto de perfil</Text>
      </View>
      <TouchableOpacity style={styles.panelButtom}>
        <Text style={styles.panelButtonTitle}>Tirar foto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButtom}>
        <Text style={styles.panelButtonTitle}>Escolher da galeria</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButtom}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}/>
      </View>
    </View>
  );
  
  bs = React.createRef();
  fall = new Animated.Value(1);

  return (
    <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={80}>
      <BottomSheet ref={this.bs}
                  snapPoints={[330, 0]}
                  renderContent={this.renderInner}
                  renderHeader={this.renderHeader}
                  initialSnap={1}
                  callbackNode={this.fall}
                  enabledGestureInteraction={true} 
                  />
        <Animated.View style={{margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
      }}/>            
      <View style={{margin: 20}}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={()=> this.bs.current.snapTo(0)}>
            <View style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <ImageBackground source={require(
        '../../../../assets/rodrigo-foto.jpg'
        )} style={{
          height: 100, width:100}}
          imageStyle={{borderRadius: 15}}>
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Icon name="camera" size={35} color="#fff" style={{
                    opacity: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10,
                  }}/>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.form}>
      <Text style={styles.label}>Dados Pessoais</Text>
          <TextInput
            style={styles.input}
            placeholder="Apelido"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Nome"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="CPF"
            autoCorrect={false}
          />

          <TouchableOpacity 
              style={styles.btnSubmit}
          >
              <Text style={styles.btnSubmitText}>
                  Atualizar
              </Text>
          </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )

}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ECECEC',
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#031d44',
    marginBottom: 8,
    },
  input: {
      borderWidth: 1,
      borderColor: '#031d44',
      backgroundColor: '#FFF',
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#242424',
      height: 44,
      marginBottom: 10,
      borderRadius: 5,
  },
  inputText: {
      borderWidth: 1,
      borderColor: '#031d44',
      backgroundColor: '#FFF',
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#242424',
      height: 84,
      textAlignVertical : "top",
      paddingTop: 10,
      marginBottom: 10,
      borderRadius: 5,
  },
  btnSubmit: {
      backgroundColor: '#e53945',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#242424',
      height: 44,
      marginBottom: 5,
      borderRadius: 5,
  },
  btnSubmitText: {
      color: '#FFF',
      fontSize: 18,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButtom: {
    
    padding: 13,
    borderRadius: 5,
    backgroundColor: '#e53945',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
  },

  
});