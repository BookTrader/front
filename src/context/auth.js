import { useContext, createContext } from 'react';

const AuthContext = createContext();

export default function login(response){

    export function useAuth(){
        const context = useContext(AuthContext);
        const login = context;
        return login;
    }

}