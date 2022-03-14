import styled from 'styled-components/native';
import theme from '../../constants/theme';

export const StyledView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 30px 0;
`;

export const StyledTimerText = styled.Text`
  font-family: 'Classic Grotesque Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 56px;
  color: ${theme.textColor};
`;

export const StyledTimerColons = styled.Text`
  font-family: 'Classic Grotesque Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 56px;
  color: ${theme.textColor};
  transform: translateY(-30px);
`;

export const StyledTimerLabel = styled.Text`
  font-family: 'ClassicGrotesqueW01-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: ${theme.timerLabelColor};
`;

export const StyledHorizontalView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
// export const StyledStartButtonView = styled.View`
//   background-color: ${theme.primary};
//   border-radius: 4px;
//   width: 247px;
//   height: 56px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// export const StyledStartButtonText = styled.Text`
//   font-family: Roboto;
//   font-style: normal;
//   font-weight: 500;
//   font-size: 18px;
//   line-height: 21px;
//   color: ${theme.buttonTextColor};
//   text-transform: capitalize;
// `;
