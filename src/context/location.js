import React, { useState, useContext, createContext, useEffect } from "react";

import * as Location from 'expo-location';
import { Alert } from "react-native";

import { api } from "../service/api";
import { useAuth } from "./auth";

const LocationContext = createContext();

export default function LocationProvider({children}) {

  const [location, setLocation] = useState();
  const { usuario, setUsuario } = useAuth();

  async function getLocation() {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    const [usr_latitude, usr_longitude] = [location.coords.latitude, location.coords.longitude];

    if (usuario) {
      await api.patch(`/usuario/${usuario.id}`, { usr_latitude, usr_longitude })
        .then((user) => {
          setUsuario(user.data);
        })
    }

  };

  useEffect(() => {
    getLocation();
  }, []);

  return(
    <LocationContext.Provider value={{location, setLocation, getLocation}}>
        {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  
  return context;
}