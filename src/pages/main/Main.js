import React, { useState } from 'react';
import { Alert, BackHandler, TouchableWithoutFeedback } from 'react-native';
import {
  StyledCurrentDate,
  StyledHorizontalLine,
  StyledHorizontalView,
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

// import * as Location from 'expo-location';
import { showToast } from '../../helpers/useToast';
import ScreenWrapper from '../../components/screenWrapper/ScreenWrapper';
import { useBackHandler } from '@react-native-community/hooks';

function Main({ navigation, setNavigation }) {
  const getCurrentLocation = async () => {
    // if (Platform.OS !== 'android') {
    //   throw new Error('Invalid platform');
    // }
    // const status = await Location.requestForegroundPermissionsAsync();
    // if (status.status !== 'granted') {
    //   throw new Error('Location not granted');
    // }

    // const location = await Location.getCurrentPositionAsync({});

    // if (location.hasOwnProperty('mocked') && location.mocked) {
    //   throw new Error('Please turn off mock location');
    // }

    console.log('in getting current location');
    Geolocation.getCurrentPosition(
      position => {
        console.log('position success');
        console.log(position.coords.longitude);
        const location = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
        return location;
      },
      error => {
        console.log(JSON.stringify(error));
        showToast(JSON.stringify(error));
        return;
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    return {
      // lat: location.coords?.latitude,
      // long: location.coords?.longitude,
      // lat: navigation.data?.location?.coordinates.lat,
      // long: navigation.data?.location?.coordinates.long,
      // lat: info.coords.latitude,
      // long: info.coords.longitude,
    };
  };
  const [currentPunchMode, setCurrentPunchMode] = useState(navigation.data.currentPunchMode);
  const [lastIn, setLastIn] = useState(
    navigation.data.currentPunchMode === 'stop' ? navigation.data.lastIn : new Date(),
  );

  const mutation = useMutation(
    () => {
      Geolocation.getCurrentPosition(
        position => {
          console.log('position success');
          const location = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          };
          console.log(location);
          console.log(process.env.BASE_URL);
          return axios.post(
            process.env.BASE_URL + '/employees/' + currentPunchMode + '-tracking',
            { ...location, nowDate: dayjs().utc().format() },
            {
              headers: { Authorization: `Bearer ${navigation.data?.token}` },
            },
          );
        },
        error => {
          console.log(JSON.stringify(error));
          showToast(JSON.stringify(error));
          return;
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    },
    {
      onSuccess: data => {
        console.log(data);
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
        console.log('error');
        console.log(e);
        showToast(e.response?.data?.data || e.message);
      },
      retry: false,
    },
  );

  const handlePunch = async () => {
    if (mutation.isLoading) {
      return;
    }
    mutation.mutate();
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
            <StyledUserName>{navigation.data.name}</StyledUserName>
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
            <Icon name="location-sharp" color={theme.textColor} />
            <StyledText>{navigation.data?.location?.name || 'Assigned Location'}</StyledText>
          </StyledHorizontalView>
        </StyledView>

        {/* Manager Name */}
        <StyledView>
          <StyledHorizontalView>
            <FontAwesome5 name="user" color={theme.textColor} />
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
              {mutation.isLoading ? (
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
