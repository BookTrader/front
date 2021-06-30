import React, { useContext, createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../service/api';
import { Alert } from 'react-native';

const AuthContext = createContext();

export default function AuthProvider( {children} ){
    
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function carregarDadosArmazenados(){
            const [storagedUsuario, storagedToken] = await AsyncStorage.multiGet(['@alleybook:usuario', '@alleybook:token']);

            async function TokenValido() {
                return await api.post("/validate", {
                    token: JSON.parse(storagedToken[1]),
                }).then(response =>{
                    if(response.data.valid){
                        api.defaults.headers.Authorization = `Bearer ${storagedToken[1]}`;
                        setUsuario(JSON.parse(storagedUsuario[1]));
                        setToken(JSON.parse(setToken[1]));
                        setLoading(false);
                    }else{
                        AsyncStorage.clear().then(() => {
                            setUsuario(null);
                            setToken(null);
                        });
                    }
                });
            }
            TokenValido();
        }
        carregarDadosArmazenados();
    }, []);
    
    function login(response){
        setUsuario(response.usuario);
        setToken(response.token);

        api.defaults.headers["Authorization"] = `Bearer ${token}`;

        AsyncStorage.setItem("@alleybook:usuario", JSON.stringify(response.usuario));
        AsyncStorage.setItem("@alleybook:token", JSON.stringify(response.token));
    }

    function logOut() {
        AsyncStorage.clear().then(() => {
            setUsuario(null);
            setToken(null);
        });
				Alert.alert("Deslogado!!!")
    }

    return(
        <AuthContext.Provider value={{logado: Boolean(usuario), loading, login, logOut, usuario, setUsuario}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    
    return context;
}