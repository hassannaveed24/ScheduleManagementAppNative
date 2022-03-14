import React from 'react';
import { ScrollView } from 'react-native';
import {
  StyledMainView,
  StyledUserName,
  StyledHorizontalLine,
} from '../../components/global.styled.js';
import { StyledManagerName, StyledScreenView } from './profile.styled.js';
import UserAvatar from 'react-native-user-avatar';

import theme from '../../constants/theme';
import { useBackHandler } from '@react-native-community/hooks';
import ScreenWrapper from '../../components/screenWrapper/ScreenWrapper';
import ScheduleTable from './ScheduleTable.js';

const Profile = ({ navigation, setNavigation }) => {
  useBackHandler(() => {
    setNavigation(prev => ({ ...prev, navigation: 'main' }));
    return true;
  });

  return (
    <ScreenWrapper>
      <ScrollView>
        <StyledScreenView>
          <StyledMainView>
            <UserAvatar
              size={50}
              name={navigation?.data?.name || 'Username'}
              bgColor={theme.textColor}
            />
            <StyledMainView>
              <StyledUserName>{navigation?.data?.name || 'Username'}</StyledUserName>
            </StyledMainView>
          </StyledMainView>
          <StyledHorizontalLine />
          <StyledMainView>
            <StyledManagerName>
              Manager: {navigation?.data?.manager?.name || 'Manager Name'}
            </StyledManagerName>
          </StyledMainView>
          <StyledHorizontalLine />
          <ScheduleTable navigation={navigation} />
        </StyledScreenView>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Profile;
