import React, { useState } from 'react';
import { passwordIcon } from '../../assets';
import { showToast } from '../../helpers/useToast';
import { StyledEmailPasswordImage, StyledEmailPasswordView } from './Login.styled';
import { StyledModalView, StyledTextInput, StyledView } from './setPasswordModal.styled';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import axios from 'axios';
import theme from '../../constants/theme';
import PrimaryLoader from '../../components/PrimaryLoader';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NetInfo from '@react-native-community/netinfo';

export const SetPasswordModal = ({
  passwordModalVisible,
  setPasswordModalVisible,
  isPasswordHide,
  setIsPasswordHide,
  navigation,
  setNavigation,
}) => {
  const [loading, setLoading] = useState(false);
  const setPasswordMutation = useMutation(
    async payload =>
      axios.post(
        process.env.baseURL + '/employees/set-password/id/' + navigation.data._id,
        payload,
      ),
    {
      onSuccess: res => {
        showToast('Your password has been updated.');
        setNavigation({ navigation: 'main', data: { ...navigation.data, isPasswordSet: true } });
      },
      onError: err => {
        showToast(err.response.data.data);
      },
    },
  );

  const formik = useFormik({
    initialValues: { password: '' },
    onSubmit: values => {
      setPasswordMutation.mutate(values);
      setLoading(true);
      NetInfo.fetch().then(state => {
        if (state.isConnected && state.isInternetReachable) {
          setPasswordMutation.mutate(values);
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
  return (
    <Modal
      animationType="slide"
      visible={passwordModalVisible}
      //   transparent={true}
      onRequestClose={() => {
        setPasswordModalVisible(!passwordModalVisible);
      }}>
      {setPasswordMutation.isLoading || loading ? (
        <StyledView>
          <PrimaryLoader />
        </StyledView>
      ) : (
        <StyledView>
          <StyledModalView>
            <StyledEmailPasswordView>
              <StyledEmailPasswordImage source={passwordIcon} />
              <StyledTextInput
                placeholderTextColor={theme.placeholder}
                placeholder="Set Password"
                autoCapitalize="none"
                secureTextEntry={isPasswordHide}
                autoCorrect={false}
                returnKeyType="send"
                onChangeText={text => {
                  formik.setFieldValue('password', text);
                }}
                value={formik.values.password}
                onSubmitEditing={() => {
                  formik.handleSubmit();
                }}
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
          </StyledModalView>
        </StyledView>
      )}
    </Modal>
  );
};
