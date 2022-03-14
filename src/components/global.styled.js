import styled from 'styled-components/native';
import theme from '../constants/theme';

export const StyledSafeAreaView = styled.SafeAreaView`
  background-color: ${theme.backgroundColor};
`;
export const StyledMainView = styled.View`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;
export const StyledImage = styled.Image`
  width: 48px;
  height: 48px;
  margin-right: 10px;
`;

export const StyledHorizontalLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${theme.borderColor};
`;
export const StyledUserName = styled.Text`
  font-family: 'Classic Grotesque Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: ${theme.textColor};
`;
export const StyledHorizontalView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
