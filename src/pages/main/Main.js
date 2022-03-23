import React, { useState } from 'react';
import { Alert, BackHandler, TouchableWithoutFeedback } from 'react-native';
import {
  StyledCurrentDate,
  StyledHorizontalLine,
  StyledHorizontalView,
  StyledIconView,
  StyledLogoutIcon,
  StyledLogoutView,
  StyledMainView,
  StyledProfileButtonText,
  StyledProfileButtonView,
  StyledStartButtonText,
  StyledStartButtonView,
  StyledText,
  StyledTimerView,
  StyledUserName,
  StyledView,
} from './main.styled.js';
import Icon from 'react-native-vector-icons/Ionicons';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import UserAvatar from 'react-native-user-avatar';
import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
import theme from '../../constants/theme';
import Timer from './Timer.component.js';
import BackgroundLoader from '../../components/BackgroundLoader';

import axios from 'axios';
import { useMutation } from 'react-query';
import Geolocation from '@react-native-community/geolocation';

import { showToast } from '../../helpers/useToast';
import ScreenWrapper from '../../components/screenWrapper/ScreenWrapper';
import { useBackHandler } from '@react-native-community/hooks';

function Main({ navigation, setNavigation }) {
  const [loading, setLoading] = useState(false);
  const [currentPunchMode, setCurrentPunchMode] = useState(navigation.data.currentPunchMode);
  const [lastIn, setLastIn] = useState(
    navigation.data.currentPunchMode === 'stop' ? navigation.data.lastIn : new Date(),
  );

  const mutation = useMutation(
    location => {
      return axios.post(
        process.env.BASE_URL + '/employees/' + currentPunchMode + '-tracking',
        { ...location, nowDate: dayjs().utc().format() },
        {
          headers: { Authorization: `Bearer ${navigation.data?.token}` },
        },
      );
    },
    {
      onSuccess: data => {
        setCurrentPunchMode(data.data.currentPunchMode);
        setLastIn(data.data.lastIn);
        setNavigation(prev => ({
          ...prev,
          data: {
            ...prev.data,
            lastIn: data.data.lastIn,
            currentPunchMode: data.data.currentPunchMode,
          },
        }));
      },
      onError: e => {
        showToast(e.response?.data?.data || e.message);
      },
      retry: false,
    },
  );

  const handlePunch = async () => {
    if (mutation.isLoading) {
      return;
    }
    setLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        const location = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
        setLoading(false);

        return mutation.mutate(location);
      },
      error => {
        setLoading(false);

        showToast(error.message);
        return;
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  const handleLogout = () => {
    setNavigation({
      navigation: 'login',
      data: {},
    });
  };

  useBackHandler(() => {
    Alert.alert('', 'Are you sure you want to quit?', [
      {
        text: 'No',
        onPress: () => null,
      },
      {
        text: 'Yes',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  });

  return (
    <ScreenWrapper>
      <StyledMainView>
        <StyledView>
          <StyledHorizontalView>
            <UserAvatar size={50} name={navigation.data.name} bgColor={theme.textColor} />
            <StyledUserName>{navigation?.data?.name || 'user name'}</StyledUserName>
            <TouchableWithoutFeedback onPress={handleLogout}>
              <StyledLogoutView>
                <StyledLogoutIcon>
                  <Icon name="log-out-outline" size={40} color={theme.danger} style={{}} />
                </StyledLogoutIcon>
              </StyledLogoutView>
            </TouchableWithoutFeedback>
          </StyledHorizontalView>
        </StyledView>
      </StyledMainView>
      <StyledHorizontalLine />
      <StyledMainView>
        <StyledView>
          <StyledCurrentDate>{dayjs().format('ddd, MMM DD')}</StyledCurrentDate>
        </StyledView>

        {/* Location */}
        <StyledView>
          <StyledHorizontalView>
            <Icon name="location-sharp" size={20} color={theme.textColor} />
            <StyledText>{navigation.data?.location?.name || 'Assigned Location'}</StyledText>
          </StyledHorizontalView>
        </StyledView>

        {/* Manager Name */}
        <StyledView>
          <StyledHorizontalView>
            <StyledIconView>
              <FontAwesome5 name="user" size={18} color={theme.textColor} />
            </StyledIconView>
            <StyledText>{navigation?.data?.manager?.name || 'Manager Name'}</StyledText>
          </StyledHorizontalView>
        </StyledView>
      </StyledMainView>
      <StyledHorizontalLine />
      <StyledMainView>
        <StyledTimerView>
          <Timer
            navigation={navigation}
            setNavigation={setNavigation}
            currentPunchMode={currentPunchMode}
            lastIn={lastIn}
          />
          {/* Start/Stop Button */}
          <TouchableWithoutFeedback onPress={handlePunch}>
            <StyledStartButtonView>
              {mutation.isLoading || loading ? (
                <BackgroundLoader />
              ) : (
                <StyledStartButtonText>{currentPunchMode}</StyledStartButtonText>
              )}
            </StyledStartButtonView>
          </TouchableWithoutFeedback>
        </StyledTimerView>
      </StyledMainView>
      {/* Profile Button */}
      <StyledMainView>
        <TouchableWithoutFeedback
          onPress={() => setNavigation(prev => ({ ...prev, navigation: 'profile' }))}>
          <StyledProfileButtonView>
            <StyledProfileButtonText>profile</StyledProfileButtonText>
          </StyledProfileButtonView>
        </TouchableWithoutFeedback>
      </StyledMainView>
    </ScreenWrapper>
  );
}

export default Main;
