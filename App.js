import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';

import { NavigationContainer } from '@react-navigation/native';

import AuthProvider from './src/context/auth';
import LocationProvider from './src/context/location';
import Routes from './src/routes';

function App() {
    return (
      <RootSiblingParent>
        <NavigationContainer>
          <AuthProvider>
            <LocationProvider>
              <Routes />
            </LocationProvider>
          </AuthProvider>
        </NavigationContainer>
      </RootSiblingParent>
    );
}

export default App;
