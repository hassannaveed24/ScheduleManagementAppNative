import React from 'react';
import { ActivityIndicator } from 'react-native';
import theme from '../constants/theme';
import { StyledActivityIndicatorView } from './loader.styled.js';
export default function App() {
  return (
    <StyledActivityIndicatorView>
      <ActivityIndicator size="large" color={theme.backgroundColor} />
    </StyledActivityIndicatorView>
  );
}
