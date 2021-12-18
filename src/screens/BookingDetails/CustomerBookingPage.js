import React from "react";
import { Button, TextInput, View,StatusBar,ImageBackground,StyleSheet,Text } from "react-native";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { TouchableHighlight,TouchableOpacity } from "react-native-gesture-handler";
// import { TextField } from "react-native-material-textfield";
import { TextField } from '../../components/customComponents/customComponents'
 
const validationSchema = Yup.object().shape({
  name: Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),

email: Yup.string().email('Enter a valid EMAIL (abc@abc.com)').required('Required').min(50,'Email must be atmost 50 characters long'),
cnic: Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),
});
 
const CustomerBookingPage =  (props) =>
 {
  return(
  <View style={styles.container}>
  <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
  <ImageBackground style={styles.container}
    source={require("../../assets/images/Gradient_MI39RPu.png")}
  >
    <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Enter Booking Details</Text>
    </View>
<Formik
       initialValues={{
        name: '',
        email: '',
        cnic: '',
        phoneNumber:'',       
       }}
       validationSchema={validationSchema}
       onSubmit={(values,errors) => {
         // same shape as initial values
         console.log(errors)
         console.log(values);
       }}
     >
    
     {({ handleChange, handleBlur, handleSubmit, values,errors, touched, isValidating }) => (
      <View>       
        <TextField
         placeholder="Username/Email" style={styles.labelText}
         keyboardType='email-address'
         mode="outlined"
         placeholderTextColor="#800000"
         nameOfIcon="inbox"
         maxLength={50}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          placeholder="Email"
          error={[errors.email]}
        />
        <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.submitButtonWrapper}
                    >
                        <Text style={styles.submitButtonText}>Send Book Request</Text>
                    </TouchableOpacity>
      </View>
    )}
      
     </Formik>
   
</ImageBackground>
</View>
  )}


  
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
    marginBottom:14
  },
  submitButtonText: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 20,
    alignSelf: "center"
  }

})

export default CustomerBookingPage;


