import React from 'react';
import {
  Button,
  TextInput,
  View,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import {Formik} from 'formik';
import * as Yup from 'yup';

import {
  TextField,
  Loader,
} from '../../../components/customComponents/customComponents';
import axios from 'axios';
import {BASE_URL} from '../../../constants/constants';
import Snackbar from 'react-native-snackbar';
import {useStoreState} from 'easy-peasy';

const source = axios.CancelToken.source();

const validationSchema = Yup.object().shape({
  EmailAddress: Yup.string()
    .email('Enter a valid EMAIL (abc@abc.com)')
    .required('Required')
    .max(50, 'Email must be atmost 50 characters long'),
  Password: Yup.string()
    .min(10, 'Password must be atleast 10 characters long')
    .max(20, 'Password must be atmost 20 characters long')
    .required('Required'),
  ConfirmPassword: Yup.string()
    .min(10, 'Password must be atleast 10 characters long')
    .max(20, 'Password must be atmost 20 characters long')
    .required('Required')
    .oneOf([Yup.ref('Password'), null], 'Both the passwords must match'),
});

const ForgotPasswordPage = ({navigation}) => {
  const globalPayload = useStoreState(state => state.payload);

  const [isLoading, setIsLoading] = React.useState(false);

  const submitForm = formData => {
    console.log(formData);
    let newObject = {...formData};
    delete newObject.ConfirmPassword;
    if (newObject != null || newObject != {}) {
      saveData(newObject);
    }
  };

  const saveData = async data => {
    let formData = Object.assign({}, data);
    let configurationObject = {
      url: `${BASE_URL}ForgotPassword`,
      method: 'POST',
      cancelToken: source.token,
      data: formData,
    };
    try {
      setIsLoading(true);
      const response = await axios(configurationObject);

      if (response.data.ResponseCode === '00') {
        setIsLoading(false);
        Snackbar.show({
          text: 'Success',
          backgroundColor: 'white',
          textColor: 'white',
          duration: Snackbar.LENGTH_LONG,
        });
        navigation.navigate('Login');
        return;
      } else {
        setIsLoading(false);
        Snackbar.show({
          text: response.data.ResponseDesc,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#B53849',
          textColor: 'black',
          action: {
            text: 'OK',
            textColor: 'black',
            onPress: () => {
              /* Do something. */
            },
          },
        });
      }
    } catch (error) {
      setIsLoading(false);
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#B53849',
        textColor: 'black',
        action: {
          text: 'OK',
          textColor: 'black',
          onPress: () => {
            /* Do something. */
          },
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading} />
      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Forgot Password</Text>
      </View>
      <ScrollView>
        <Formik
          initialValues={{
            EmailAddress: '',
            Password: '',
            ConfirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, errors) => submitForm(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValidating,
          }) => (
            <View>
              <TextField
                placeholder="Email"
                style={styles.labelText}
                errorMsgStyle={styles.errorMsg}
                keyboardType="email-address"
                mode="outlined"
                placeholderTextColor="#800000"
                nameOfIcon="envelope"
                maxLength={50}
                onChangeText={handleChange('EmailAddress')}
                onBlur={handleBlur('EmailAddress')}
                value={values.EmailAddress}
                error={[errors.EmailAddress]}
              />
              <TextField
                placeholder="Password"
                style={styles.labelText}
                keyboardType="default"
                mode="outlined"
                placeholderTextColor="#800000"
                nameOfIcon="lock"
                maxLength={20}
                secureTextEntry={true}
                onChangeText={handleChange('Password')}
                onBlur={handleBlur('Password')}
                value={values.Password}
                error={[errors.Password]}
                errorMsgStyle={styles.errorMsg}
              />

              <TextField
                placeholder="Confirm Password"
                style={styles.labelText}
                keyboardType="default"
                mode="outlined"
                secureTextEntry={true}
                placeholderTextColor="#800000"
                nameOfIcon="eye"
                maxLength={20}
                onChangeText={handleChange('ConfirmPassword')}
                onBlur={handleBlur('ConfirmPassword')}
                value={values.ConfirmPassword}
                error={[errors.ConfirmPassword]}
                errorMsgStyle={styles.errorMsg}
              />

              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.submitButtonWrapper}>
                <Text style={styles.submitButtonText}>CHANGE PASSWORD</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleWrapper: {
    width: 278,
    height: 111,
  },
  title: {
    color: 'black',
    fontSize: 40,
    width: 335,
    height: 70,
    flex: 1,
    fontFamily: 'cursive',
    marginLeft: 10,
    marginTop: 30,
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: 28,
  },
  submitButtonWrapper: {
    height: 59,
    backgroundColor: 'rgba(142,7,27,1)',
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 14,
    marginBottom: 14,
  },
  submitButtonText: {
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    fontSize: 20,
    alignSelf: 'center',
  },
  errorMsg: {
    color: 'red',
    marginRight: 20,
    marginLeft: 20,
    fontSize: 11,
    fontStyle: 'italic',
  },
});

export default ForgotPasswordPage;
