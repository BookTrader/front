import React from 'react'
import {
    View,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Text,
} from 'react-native'
import Card from './Card';

//import { useAuth } from '../../../context/auth';

export default function Feed({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                hidden={false}
                backgroundColor="#77242a"
            />
            <ScrollView style={styles.cardContainer}>
                <TouchableOpacity onPress={() => {}}>
                    <Card>
                        <View style={{ flexDirection: 'row', flex: 1,}}>
                            <Image style={styles.ExemplarImage}
                                source={require('../../Navegacao/assets/livro.jpg')}
                            />
                            <View
                                style={{
                                    flexDirection: 'column',
                                    marginLeft: 15,
                                    marginTop: 10,
                                }}
                            >
                                <Text style={styles.title}>
                                    Estrutura de dados
                                </Text>
                                <Text style={styles.label}>
                                Autor: <Text style={styles.caption}>André Backes</Text>
                                </Text>
                                <Text style={styles.label}>
                                Gênero: <Text style={styles.caption}>Acadêmico</Text>
                                </Text>
                                <Text style={styles.label}>
                                Editora: <Text style={styles.caption}>Elsevier</Text>
                                </Text>

                                <Text style={styles.regiao}>
                                Jardim Tranquilidade, Guarulhos
                                </Text>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ECECEC',
    },
    cardContainer: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 5,
        alignSelf: 'stretch',
    },
    ExemplarImage: {
      width: 140,
      height: 140,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    title: {
      fontSize: 16,
      marginBottom: 10,
    },
    caption: {
      fontSize: 14,
      fontWeight: 'normal',
    },
    label:{
      fontSize: 14,
      fontWeight: 'bold',
    },
    regiao:{
      marginTop: 12,
      fontSize: 12,
      color: '#333',
    }
})
