import styled from 'styled-components/native';
import theme from '../../constants/theme';

export const StyledSafeAreaView = styled.SafeAreaView`
  background-color: ${theme.backgroundColor};
`;

export const StyledMainView = styled.View`
  margin: 20px 0;
`;

export const StyledView = styled.View`
  padding-left: 15px;
  margin: 10px 0;
`;
export const StyledImage = styled.Image`
  width: 48px;
  height: 48px;
  margin-right: 10px;
`;

export const StyledUserName = styled.Text`
  font-family: 'Classic Grotesque Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: ${theme.textColor};
  margin-left: 15px;
`;

export const StyledHorizontalLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${theme.borderColor};
`;

export const StyledCurrentDate = styled.Text`
  font-family: 'Classic Grotesque Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: ${theme.textColor};
`;

export const StyledHorizontalView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const StyledText = styled.Text`
  font-family: 'ClassicGrotesqueW01-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  margin-left: 10px;
  color: ${theme.textColor};
`;

export const StyledStartButtonView = styled.View`
  background-color: ${theme.primary};
  border-radius: 4px;
  height: 56px;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StyledStartButtonText = styled.Text`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: ${theme.buttonTextColor};
  text-transform: capitalize;
`;
export const StyledTimerView = styled.View`
  background-color: ${theme.textBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  margin: 0 15px;
`;

export const StyledProfileButtonView = styled.View`
  background-color: ${theme.primary};
  border-radius: 4px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
`;
export const StyledProfileButtonText = styled.Text`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: ${theme.buttonTextColor};
  text-transform: capitalize;
`;
