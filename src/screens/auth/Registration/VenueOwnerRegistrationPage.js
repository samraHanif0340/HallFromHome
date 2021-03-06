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
import {BASE_URL, ERROR_MESSAGES} from '../../../constants/constants';
import Snackbar from 'react-native-snackbar';

const source = axios.CancelToken.source();

const validationSchema = Yup.object().shape({
  Name: Yup.string()
    .min(2, 'Name must be atleast 6 characters long')
    .max(80, 'Name must be atmost 80 characters long')
    .required('Required'),

  EmailAddress: Yup.string()
    .email('Enter a valid EMAIL (abc@abc.com)')
    .required('Required')
    .max(50, 'Email must be atmost 50 characters long'),
  Password: Yup.string()
    .min(10, 'Password must be atleast 10 characters long')
    .max(20, 'Password must be atmost 20 characters long')
    .required('Required'),
  PhoneNumber: Yup.string()
    .min(11, 'Mobile Number should be in format 03xxxxxxxxx')
    .max(11, 'Mobile Number should be in format 03xxxxxxxxx')
    .matches(/^[0][3][\d]{9}$/, 'Mobile Number should be in format 03xxxxxxxxx')
    .required('Required'),
  CNIC: Yup.string()
    .min(13, 'CNIC must be of 13 characters long')
    .max(13, 'CNIC must be of 13 characters long')
    .required('Required'),
});

const VenueOwnerRegistrationPage = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const submitForm = formData => {
    console.log(formData);
    if (formData != null || formData != {}) {
      saveData(formData);
    }
  };

  const saveData = async data => {
    let formData = Object.assign({}, data);
    formData.IsVenueOwner = true;
    let configurationObject = {
      url: `${BASE_URL}UserRegistration`,
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
          text: 'Registered Successfully',
          backgroundColor: 'green',
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
        text: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
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
        <Text style={styles.title}>Create Account</Text>
      </View>
      <ScrollView>
        <Formik
          initialValues={{
            Name: '',
            EmailAddress: '',
            Password: '',
            PhoneNumber: '',
            CNIC: '',
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
                errorMsgStyle={styles.errorMsg}
                placeholder="Name"
                style={styles.labelText}
                keyboardType="default"
                mode="outlined"
                placeholderTextColor="#800000"
                nameOfIcon="user"
                maxLength={80}
                onChangeText={handleChange('Name')}
                onBlur={handleBlur('Name')}
                value={values.Name}
                error={[errors.Name]}
              />

              <TextField
                errorMsgStyle={styles.errorMsg}
                placeholder="Email"
                style={styles.labelText}
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
                errorMsgStyle={styles.errorMsg}
                placeholder="Mobile Number"
                style={styles.labelText}
                keyboardType="phone-pad"
                mode="outlined"
                placeholderTextColor="#800000"
                nameOfIcon="phone"
                maxLength={11}
                onChangeText={handleChange('PhoneNumber')}
                onBlur={handleBlur('PhoneNumber')}
                value={values.PhoneNumber}
                error={[errors.PhoneNumber]}
              />
              <TextField
                errorMsgStyle={styles.errorMsg}
                placeholder="CNIC"
                style={styles.labelText}
                keyboardType="phone-pad"
                mode="outlined"
                placeholderTextColor="#800000"
                nameOfIcon="credit-card"
                maxLength={13}
                onChangeText={handleChange('CNIC')}
                onBlur={handleBlur('CNIC')}
                value={values.CNIC}
                error={[errors.CNIC]}
              />

              <TextField
                errorMsgStyle={styles.errorMsg}
                placeholder="Password"
                style={styles.labelText}
                keyboardType="default"
                mode="outlined"
                placeholderTextColor="#800000"
                nameOfIcon="lock"
                maxLength={20}
                onChangeText={handleChange('Password')}
                onBlur={handleBlur('Password')}
                value={values.Password}
                error={[errors.Password]}
              />

              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.submitButtonWrapper}>
                <Text style={styles.submitButtonText}>REGISTER</Text>
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
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  titleWrapper: {
    width: 278,
    height: 111,
    alignContent: 'center',
    textAlign: 'center',
  },
  title: {
    color: 'black',
    fontSize: 40,
    width: 335,
    height: 70,
    flex: 1,
    fontFamily: 'cursive',
    marginLeft: 30,
    marginTop: 30,
    marginRight: 30,
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: 28,
  },
  submitButtonWrapper: {
    height: 59,
    //backgroundColor: "rgba(31,178,204,1)",
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

export default VenueOwnerRegistrationPage;
