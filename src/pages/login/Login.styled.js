import styled from 'styled-components/native';
import theme from '../../constants/theme.js';
import { Dimensions } from 'react-native';

export const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView``;

export const StyledImage = styled.Image`
  width: 220px;
  height: 164px;
`;

export const StyledInputTextView = styled.View`
  padding: 40px 0;
  margin: 0 30px;
`;

export const StyledEmailPasswordView = styled.View`
  height: 56px;
  width: 100%;
  border: 1px solid #cfdde2;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;
export const StyledEmailPasswordImage = styled.Image`
  margin: 0 15px;
`;
export const StyledTextInput = styled.TextInput`
  font-style: normal;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: ${theme.textColor};
  width: 100%;
`;

export const StyledRememberPasswordView = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
`;

export const StyledRemeberPasswordText = styled.Text`
  font-family: '';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: ${theme.labelColor};
  margin-left: 15px;
`;

export const StyledLoginButtonView = styled.View`
  background-color: ${theme.primary};
  border-radius: 4px;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLoginButtonText = styled.Text`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: ${theme.buttonTextColor};
  text-transform: capitalize;
`;

export const StyledActivityIndicator = styled.ActivityIndicator``;
export const StyledErrorView = styled.View`
  width: 100%;
  padding: 10px 40px;
`;
export const StyledErrorText = styled.Text`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: ${theme.error};
  text-align: left;
`;
export const StyledScreenView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${Dimensions.get('window').height}px;
  margin: 0 15px;
`;
