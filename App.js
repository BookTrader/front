import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AuthProvider from './src/context/auth';
import LocationProvider from './src/context/location';
import Routes from './src/routes';

function App() {
    return (
        <NavigationContainer>
          <AuthProvider>
            <LocationProvider>
              <Routes />
            </LocationProvider>
          </AuthProvider>
        </NavigationContainer>
    );
}

export default App;
