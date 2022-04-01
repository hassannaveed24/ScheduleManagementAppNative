import React, { useState } from 'react';
import { View } from 'react-native';
import Login from './src/pages/login/Login';
import Main from './src/pages/main/Main';
import Profile from './src/pages/profile/Profile.js';
import PrimaryLoader from './src/components/PrimaryLoader';
import { QueryClientProvider, QueryClient } from 'react-query';
const queryClient = new QueryClient();

export default function App() {
  const [navigation, setNavigation] = useState({ navigation: 'login', data: {} });
  return (
    <QueryClientProvider client={queryClient}>
      <View>
        {navigation.navigation === 'login' ? (
          <Login navigation={navigation} setNavigation={setNavigation} />
        ) : navigation.navigation === 'main' ? (
          <Main navigation={navigation} setNavigation={setNavigation} />
        ) : navigation.navigation === 'profile' ? (
          <Profile navigation={navigation} setNavigation={setNavigation} />
        ) : (
          <PrimaryLoader />
        )}
      </View>
    </QueryClientProvider>
  );
}
