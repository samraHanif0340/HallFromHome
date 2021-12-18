import React from "react";
import { Button, TextInput, View, StatusBar, ImageBackground, StyleSheet, Text,ActivityIndicator,ScrollView } from "react-native";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

import { Formik} from "formik";
import * as Yup from "yup";

import { TextField } from '../../../components/customComponents/customComponents'
import axios from 'axios';
import { BASE_URL } from '../../../constants/constants'
import Snackbar from 'react-native-snackbar';

const source = axios.CancelToken.source();

const validationSchema = Yup.object().shape({
    Name: Yup.string()
    .min(2, 'Name must be atleast 6 characters long')
    .max(80, 'Name must be atmost 80 characters long')
    .required('Required'),

    EmailAddress: Yup.string().email('Enter a valid EMAIL (abc@abc.com)').required('Required').max(50, 'Email must be atmost 50 characters long'),
  Password: Yup.string()
    .min(8, 'Password must be atleast 8 characters long')
    .max(20, 'Password must be atmost 20 characters long')
    .required('Required'),
    PhoneNumber: Yup.string()
    .min(11, 'Mobile Number should be in format 03xxxxxxxxx')
    .max(11, 'Mobile Number should be in format 03xxxxxxxxx')
    .matches(/^[0][3][\d]{9}$/,'Mobile Number should be in format 03xxxxxxxxx')
    .required('Required'),
});


const RegistrationPage = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const submitForm = (formData) => {
    console.log(formData)
    if(formData != null || formData != {}){
      saveData(formData)
    }
  }

  const saveData = async (data) => {
    let formData = Object.assign({},data)

  
    console.log(formData)
  
    let configurationObject = {
      url: `${BASE_URL}UserRegistration`,
      method: "POST",
      cancelToken: source.token,
      data: formData,
  }
    console.log('in save data')
    // setErrortext(null)
    try {
        setIsLoading(true);
        const response = await axios(
            configurationObject,   
        );
        alert(response.ResponseCode)
        console.log(response)
        if (response.data.ResponseCode === "00") {
            setIsLoading(false);
            // setErrortext({text:'Success',styles:ToastStyles.success})
            Snackbar.show({
                text: response.data.ResponseDesc,
                duration: Snackbar.LENGTH_LONG,
              });
            navigation.navigate('Auth')
            //   AsyncStorage.setItem('user_id', response.data.Username);
            //   console.log(response.data.Username);
            
            return;
        } else {
            setIsLoading(false);
            // setErrortext({text:response.data.ResponseDesc,styles:ToastStyles.error})
            Snackbar.show({
                text: response.data.ResponseDesc,
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                  text: 'OK',
                  textColor: 'white',
                  onPress: () => { /* Do something. */ },
                },
              });
        }
    } catch (error) {
        setIsLoading(false);
        Snackbar.show({
            text: 'Something Went Wrong',
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
              text: 'OK',
              textColor: 'white',
              onPress: () => { /* Do something. */ },
            },
          });
  
    }
  };

  return (
    <View style={styles.container}>
     
        {isLoading ? <ActivityIndicator  size="large"  color="red"/> : null}
     
      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <ImageBackground style={styles.container}
        source={require("../../../assets/images/Gradient_MI39RPu.png")}
      >
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
          }}
          validationSchema={validationSchema}
          onSubmit={(values, errors) => submitForm(values)}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValidating }) => (
            <View>
              <TextField
                placeholder="Name" style={styles.labelText}
                keyboardType='default'
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
                placeholder="Email" style={styles.labelText}
                keyboardType='email-address'
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
                placeholder="Mobile Number" style={styles.labelText}
                keyboardType='phone-pad'
                mode="outlined"
                placeholderTextColor="#800000"
                nameOfIcon="bell"
                maxLength={11}
                onChangeText={handleChange('PhoneNumber')}
                onBlur={handleBlur('PhoneNumber')}
                value={values.PhoneNumber}
                error={[errors.PhoneNumber]}
              />

<TextField
                placeholder="Password" style={styles.labelText}
                keyboardType='default'
                mode="outlined"
                placeholderTextColor="#800000"
                nameOfIcon="eye"
                maxLength={20}
                onChangeText={handleChange('Password')}
                onBlur={handleBlur('Password')}
                value={values.Password}
                error={[errors.Password]}
              />

              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.submitButtonWrapper}
                
              >
                <Text style={styles.submitButtonText}>CONTINUE</Text>
              </TouchableOpacity>
            </View>
          )}

        </Formik>
</ScrollView>
      </ImageBackground>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleWrapper: {
    width: 278,
    height: 111
  },
  title: {
    color: "rgba(248,231,28,1)",
    fontSize: 40,
    width: 335,
    height: 70,
    flex: 1,
    fontFamily: "cursive",
    marginLeft: 10,
    marginTop: 30,
    alignContent: "center",
    textAlign: "center",
    //fontFamily: "dancing-script-regular",
    marginBottom: 28
  },
  submitButtonWrapper: {
    height: 59,
    //backgroundColor: "rgba(31,178,204,1)",
    backgroundColor: "rgba(142,7,27,1)",
    borderRadius: 5,
    justifyContent: "center",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 14,
    marginBottom: 14
  },
  submitButtonText: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 20,
    alignSelf: "center"
  },

})

export default RegistrationPage;


