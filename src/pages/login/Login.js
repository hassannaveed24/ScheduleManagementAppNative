/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import {
  StyledImage,
  StyledEmailPasswordView,
  StyledEmailPasswordImage,
  StyledTextInput,
  StyledLoginButtonView,
  StyledLoginButtonText,
  StyledInputTextView,
  StyledScreenView,
} from './Login.styled';
import BackgroundLoader from '../../components/BackgroundLoader.js';
import { loginImage, emailIcon, passwordIcon } from '../../assets/index';
import theme from '../../constants/theme';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import { Alert, BackHandler, TouchableWithoutFeedback, View } from 'react-native';
import { showToast } from '../../helpers/useToast';
import { SetPasswordModal } from './SetPasswordModal';
import ScreenWrapper from '../../components/screenWrapper/ScreenWrapper.js';
import { useBackHandler } from '@react-native-community/hooks';

import NetInfo from '@react-native-community/netinfo';
const Login = ({ navigation, setNavigation }) => {
  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const mutation = useMutation(
    async payload => {
      return axios.post(process.env.BASE_URL + '/employees/login', payload);
    },
    {
      onSuccess: res => {
        if (res.data.isPasswordSet === true) {
          setNavigation({ ...navigation, navigation: 'main', data: res.data });
        } else {
          setPasswordModalVisible(true);
          setNavigation({ ...navigation, data: res.data });
        }
      },
      onError: err => {
        showToast(err.response.data.data || err);
        setNavigation({ navigation: 'login', data: {} });
      },
    },
    { retry: false },
  );

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    // validationSchema: { reviewSchema },
    onSubmit: values => {
      if (mutation.isLoading || loading) {
        return;
      }
      setLoading(true);
      NetInfo.fetch().then(state => {
        if (state.isConnected && state.isInternetReachable) {
          mutation.mutate(values);
          setLoading(false);
        } else {
          setLoading(false);
          showToast('No internet connection');
          return;
        }
      });
    },
  });

  const handleEye = () => {
    setIsPasswordHide(!isPasswordHide);
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
  const passwordInputRef = useRef();
  return (
    <ScreenWrapper>
      <StyledScreenView>
        <SetPasswordModal
          passwordModalVisible={passwordModalVisible}
          setPasswordModalVisible={setPasswordModalVisible}
          isPasswordHide={isPasswordHide}
          setIsPasswordHide={setIsPasswordHide}
          navigation={navigation}
          setNavigation={setNavigation}
        />

        <StyledImage source={loginImage} />
        <StyledInputTextView>
          {/* Email */}
          <StyledEmailPasswordView>
            <StyledEmailPasswordImage source={emailIcon} />
            <StyledTextInput
              placeholderTextColor={theme.placeholder}
              blurOnSubmit={false}
              placeholder="Enter your email.."
              autoCompleteType="email"
              keyboardType="email-address"
              returnKeyType="next"
              textContentType="emailAddress"
              onChangeText={text => {
                formik.setFieldValue('email', text);
              }}
              value={formik.values.email}
              onSubmitEditing={() => passwordInputRef.current.focus()}
            />
          </StyledEmailPasswordView>

          {/* Password */}
          <StyledEmailPasswordView>
            <StyledEmailPasswordImage source={passwordIcon} />
            <StyledTextInput
              placeholderTextColor={theme.placeholder}
              ref={ref => (passwordInputRef.current = ref)}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={isPasswordHide}
              autoCorrect={false}
              returnKeyType="send"
              onSubmitEditing={async () => {
                formik.handleSubmit();
              }}
              onChangeText={text => {
                formik.setFieldValue('password', text);
              }}
              value={formik.values.password}
            />

            <TouchableWithoutFeedback onPress={handleEye}>
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  height: '100%',
                  width: 60,
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <Icon
                  size={26}
                  name={isPasswordHide ? 'eye-off-outline' : 'eye-outline'}
                  color={theme.textColor}
                  style={{ position: 'absolute', right: 15 }}
                />
              </View>
            </TouchableWithoutFeedback>
          </StyledEmailPasswordView>
        </StyledInputTextView>

        {/* Login Button */}
        <TouchableWithoutFeedback
          onPress={() => {
            formik.handleSubmit();
          }}>
          <StyledLoginButtonView>
            {mutation.isLoading || loading ? (
              <BackgroundLoader />
            ) : (
              <StyledLoginButtonText>login</StyledLoginButtonText>
            )}
          </StyledLoginButtonView>
        </TouchableWithoutFeedback>
      </StyledScreenView>
    </ScreenWrapper>
  );
};
export default Login;
