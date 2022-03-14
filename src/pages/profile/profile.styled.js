import styled from 'styled-components/native';
import theme from '../../constants/theme';

export const StyledManagerName = styled.Text`
  font-family: 'Classic Grotesque Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: ${theme.textColor};
`;
export const StyledDateRange = styled.Text`
  font-family: 'Classic Grotesque Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: ${theme.textColor};
  margin: 0 10px;
`;

export const StyledDate = styled.Text`
  font-family: 'Classic Grotesque Pro';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: ${theme.textColor};
`;

export const StyledScheduleTile = styled.View`
  border-radius: 4px;
  padding: 10px;
  margin: 5px;
  width: 80%;
`;

export const StyledScheduleDate = styled.View`
  background-color: white;
  padding: 10px 5px;
  width: 70px;
  border-right-width: 1px;
  border-right-color: ${theme.borderColor};
`;

export const StyledScheduleRow = styled.View`
  display: flex;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.borderColor};
  width: 100%;
  padding: 0 15px;
`;
export const StyledScreenView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;
