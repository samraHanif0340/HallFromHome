import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, ImageBackground, ScrollView } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { MultiLineTextInput, SelectField, Loader, TextField } from '../../components/customComponents/customComponents'
import axios from 'axios';
import { BASE_URL } from '../../constants/constants'
import Snackbar from 'react-native-snackbar';
import { Formik } from "formik";
import * as Yup from "yup";
import { useStoreState } from 'easy-peasy';

const source = axios.CancelToken.source();

const validationSchema = Yup.object().shape({
  VenueID: Yup.string()
    .required('Required'),
  Rating: Yup.string()
    .min(1, 'Rating must be between 1 to 5')
    .max(1, 'Rating must be between 1 to 5')
    .required('Required'),

  ReviewText: Yup.string()
    .min(3, 'Review must be of atleast 3 charaters long')
    .max(500, 'Review must be of atmost 500 charaters long')
    .required('Required'),
});

const LodgeReviewPage = (props) => {

  const [isLoading, setIsLoading] = React.useState(false)
  const [initialFormValues, setInitialFormValues] = React.useState({
    VenueID: null,
    Rating: '',
    ReviewText: '',
  })
  const [venueList, setVenueList] = React.useState([])
  const globalPayload = useStoreState((state) => state.payload);


  useEffect(() => {
    getVenueDropdown();
    return () => source.cancel("Data fetching cancelled");
  }, []);

  const submitForm = (formData) => {
    console.log(formData)
    if (formData != null || formData != {}) {
      saveData(formData)
    }
  }

  const saveData = async (data) => {
    console.log('in save dtaa')
    let formData = Object.assign({}, data)
    // formData.venueID = route.params.venueID

    console.log(globalPayload)
    console.log(formData)

    let configurationObject = {
      url: `${BASE_URL}InsertVenueReview`,
      method: "POST",
      cancelToken: source.token,
      data: { ...formData, UserID: globalPayload.userId },
    }
    console.log('in save data')
    try {
      setIsLoading(true);
      const response = await axios(
        configurationObject,
      );
      if (response.data.ResponseCode === "00") {
        setIsLoading(false);
        Snackbar.show({
          text: response.data.ResponseDesc,
          duration: Snackbar.LENGTH_LONG,
        });
        return;
      } else {
        setIsLoading(false);
        Snackbar.show({
          text: response.data.ResponseDesc,
          duration: Snackbar.LENGTH_LONG,
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
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'OK',
          textColor: 'white',
          onPress: () => { /* Do something. */ },
        },
      });

    }
  };

  const getVenueDropdown = async () => {
    let configurationObject = {
      url: `${BASE_URL}GetVenueList`,
      method: "GET",
    }
    try {
      setIsLoading(true);
      const response = await axios(
        configurationObject
      );

      if (response.data.ResponseCode == "00") {
        setIsLoading(false);
        setVenueList(response.data.Result_DTO)
        return;
      } else {
        console.log(response)
        throw new Error("Failed to fetch records");
      }
    } catch (error) {
      // handle error
      if (axios.isCancel(error)) {
        console.log('Data fetching cancelled');
      } else {
        setIsLoading(false);
      }
      // alert(error.message);
    }
  };


  return (

    <View style={styles.container}>

      <Loader isLoading={isLoading} />

      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <ImageBackground style={styles.container}
        source={require("../../assets/images/Gradient_MI39RPu.png")}
      >
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Feedback/Review</Text>
        </View>
        <ScrollView>
          <Formik
            initialValues={initialFormValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values, errors) => submitForm(values)}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValidating }) => {

              const myChangeFunc = (key, val) => {
                console.log(key, val)
                setInitialFormValues({ ...initialFormValues, [key]: val });
                return handleChange(val)
              }

              const mySelectFunc = (key, val) => {
                console.log(key, val)
                setInitialFormValues({ ...initialFormValues, [key]: val });
                // return handleChange(val)
              }

              return (
                <View>
                  <SelectField items={venueList} value={values.VenueID} 
                  onChange={(e) => { mySelectFunc('VenueID', e) }} 
                  error={[errors.VenueID]} 
                  nameOfIcon="envelope" mode="dialog" />

                  <TextField
                    placeholder="Rating" style={styles.labelText}
                    keyboardType='number'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="envelope"
                    maxLength={1}
                    onChangeText={(e) => { myChangeFunc('Rating', e) }}
                    onBlur={handleBlur('Rating')}
                    value={values.Rating}
                    error={[errors.Rating]}
                  />
                  <MultiLineTextInput
                    placeholder="Review" style={styles.labelText}
                    keyboardType='default'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="comment"
                    maxLength={500}
                    onChangeText={(e) => { myChangeFunc('ReviewText', e) }}
                    onBlur={handleBlur('ReviewText')}
                    value={values.ReviewText}
                    error={[errors.ReviewText]}
                    numberOfLines={3}
                  />

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.submitButtonWrapper}

                  >
                    <Text style={styles.submitButtonText}>SUBMIT FEEDBACK</Text>
                  </TouchableOpacity>
                </View>
              )
            }}

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
  eventDetails: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 14,
    marginBottom: 14,
    flexDirection: 'row',

  },
  eventChilds: {
    flex: 6,
    content: {
      viewTypeLeft: {
        color: 'white',
        alignSelf: 'flex-start',
        alignContent: 'space-around'
      },
      viewTypeRight: {
        color: 'white',
        alignSelf: 'flex-end',
        alignContent: 'space-around'
      }
    }
  }

});

export default LodgeReviewPage;


