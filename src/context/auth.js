import React, { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../service/api';

const AuthContext = createContext();

export default function AuthProvider( {children} ){
    
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        async function carregarDadosArmazenados(){
            const [storagedUsuario, storagedToken] = await AsyncStorage.multiGet(['@alleybook:usuario', '@alleybook:token']);
            async function TokenValido(){
                return await api.post("/validate", {
                    token: JSON.parse(storagedToken[1]),
                }).then(response =>{
                    if(response.data.valid){
                        api.defaults.headers.Authorization = `Bearer  ${storagedToken[1]}`;
                        setUsuario(JSON.parse(storagedUsuario[1]));
                        setToken(JSON.parse(setToken[1]));
                    }else{
                        setUsuario(null);
                        setToken(null);
                        AsyncStorage.clear();
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
        api.defaults.headers["Authorization"] = `Bearer ${response.token}`;
        AsyncStorage.setItem("@alleybook:usuario", JSON.stringify(response.usuario));
        AsyncStorage.setItem("@alleybook:token", JSON.stringify(response.token));
    }

    return(
        <AuthContext.Provider value={{login, usuario, setUsuario, token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    const {login, usuario, setUsuario, token, setToken} = context;
    return {login, usuario, setUsuario, token, setToken};
}