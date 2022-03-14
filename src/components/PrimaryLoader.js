import React from 'react';
import { ActivityIndicator } from 'react-native';
import theme from '../constants/theme';
import { StyledActivityIndicatorView } from './loader.styled';
export default function App() {
  return (
    <>
      <StyledActivityIndicatorView>
        <ActivityIndicator size="large" color={theme.primary} />
      </StyledActivityIndicatorView>
    </>
  );
}
