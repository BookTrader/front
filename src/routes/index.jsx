import React, {useContext} from "react";
import { View, ActivityIndicator } from "react-native";

import { useAuth } from "../context/auth";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

const Routes = () => {
  const {logado, loading} = useAuth();

  if(loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#000"/>
      </View>
    );
  }

  return logado ? <AppRoutes /> : <AuthRoutes />
}

export default Routes;