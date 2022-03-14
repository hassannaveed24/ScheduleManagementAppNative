import React, { Fragment } from 'react';
import { KeyboardAvoidingView, ScrollView, StatusBar } from 'react-native';
import theme from '../../constants/theme';

import { StyledSafeAreaView } from './screenWrapper.styled.js';
const ScreenWrapper = ({ children }) => {
  return (
    <>
      <StatusBar backgroundColor={theme.primary} />
      <KeyboardAvoidingView>
        <StyledSafeAreaView>
          <ScrollView>{children}</ScrollView>
        </StyledSafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};
export default ScreenWrapper;
