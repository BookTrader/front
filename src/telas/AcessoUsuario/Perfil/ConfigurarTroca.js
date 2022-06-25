import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Ionicons } from '@expo/vector-icons';
import React, { useLayoutEffect, useState } from "react";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { api } from "../../../service/api";

import { useAuth } from '../../../context/auth';
import { useLocation } from "../../../context/location";

export default function ConfigurarTroca({ navigation }) {
  const { usuario, setUsuario } = useAuth();
  const { getLocation } = useLocation();

  const [labelOption, setLabelOption] = useState(false);
  const [range, setRange] = useState(usuario?.usr_range_troca ? usuario?.usr_range_troca : 0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          style={{ paddingRight: 10 }}
          name="location-outline"
          size={30}
          backgroundColor="#e53945"
          color="#FFF"
          onPress={ getLocation }
        ></Ionicons>
      ),
    });
  }, []);

  async function handleSubmit() {
    await api.patch(`/usuario/${usuario.id}`, { usr_range_troca: range })
      .then((user) => {
        setUsuario(user.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={ PROVIDER_GOOGLE }
          initialRegion={{
            latitude: usuario.usr_latitude ? Number(usuario.usr_latitude) : -14.2401,
            longitude: usuario.usr_longitude ? Number(usuario.usr_longitude) : -53.1805,
            latitudeDelta: usuario.usr_latitude ? 0.011 : 40,
            longitudeDelta: usuario.usr_longitude ? 0.011 : 40
          }}
        >
          { usuario.usr_latitude ? 
                <>
                  <Marker 
                    coordinate={{
                      latitude: usuario.usr_latitude ? Number(usuario.usr_latitude) : undefined,
                      longitude: usuario.usr_longitude ? Number(usuario.usr_longitude) : undefined,
                    }}
                  />
                  <Circle 
                    center={{
                      latitude: usuario.usr_latitude ? Number(usuario.usr_latitude) : undefined,
                      longitude: usuario.usr_longitude ? Number(usuario.usr_longitude) : undefined,
                    }}
                    radius={range * 1000}
                    strokeWidth={2}
                    strokeColor={'#e53945'}
                    fillColor={'rgba(229, 57, 69, 0.2)'}
                  />
                </>
           : null }
        </MapView>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Preferências de Troca</Text>
        <MultiSlider 
          onValuesChangeStart={() => {
            setLabelOption(true); 
          }}
          onValuesChangeFinish={(values) => {
            setRange(values[0]);
            setLabelOption(false);
          }}
          markerStyle={{
            backgroundColor: '#e53945',    
            height:17,
            width: 17,
            borderRadius: 15,
          }}
          trackStyle={{
            height:3,
          }}

          selectedStyle={{
            backgroundColor: '#e53945',
          }}
          values={[range]}
          enableLabel={labelOption}
          min={0}
          max={51}
          snapped={true}
        />
        </View>
        <View style={styles.container2}>
          <TouchableOpacity 
              style={styles.btnSubmit}
              onPress={handleSubmit}
          >
              <Text style={styles.btnSubmitText}>
                  Atualizar dados
              </Text>
          </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#ECECEC'
  },
  container2: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    backgroundColor: '#ECECEC',
    paddingBottom: 15,
  },
  label: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#031d44',
      marginBottom: 8,
  },
  mapContainer: {
    flex: 1
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    ...StyleSheet.absoluteFillObject
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
})