import styled from 'styled-components/native';
import theme from '../../constants/theme';

export const StyledView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  max-width: 100%;
  margin: 0 45px;
`;

export const StyledTextInput = styled.TextInput`
  font-style: normal;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: ${theme.textColor};
  width: 100%;
`;
export const StyledModalView = styled.View`
  shadow-color: #000;
  elevation: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
export const StyledModalText = styled.Text``;
