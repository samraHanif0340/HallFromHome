import React, { useEffect } from "react";
import { Button, TextInput, View, StatusBar, ImageBackground, StyleSheet, Text, ActivityIndicator, ScrollView, Field } from "react-native";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

import { Formik, useFormikContext, useFormik } from "formik";
import * as Yup from "yup";

import { TextField, SelectField, Loader } from '../../components/customComponents/customComponents'
import axios from 'axios';
import { BASE_URL } from '../../constants/constants'
import Snackbar from 'react-native-snackbar';
import { Avatar } from "react-native-elements";
import moment from 'moment';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useStoreState } from 'easy-peasy';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';


const source = axios.CancelToken.source();

const validationSchema = Yup.object().shape({
  VenueName: Yup.string()
    .min(2, 'Venue Name must be atleast 6 characters long')
    .max(80, 'Venue Name must be atmost 80 characters long')
    .required('Required'),

    POCName:Yup.string()
    .min(2, 'POC Name must be atleast 6 characters long')
    .max(80, 'POC Name must be atmost 80 characters long')
    .required('Required'),

    ContactNumber:Yup.string()
    .min(11, 'Contact Number should be in format 03xxxxxxxxx')
    .max(11, 'Contact Number should be in format 03xxxxxxxxx')
    .matches(/^[0][3][\d]{9}$/, 'Mobile Number should be in format 03xxxxxxxxx')
    .required('Required'),

  MaxCapacity: Yup.string()
    .min(2,'Capacity must be 2 digit long')
    .max(7,'Capacity must be atmost 7 digits long')
    .required('Required'),

    RentPrice: Yup.string()
    .min(4,'Rent Price must be 4 digit long')
    .max(12,'Rent Price must be 12 digit long')
    .required('Required'),
   
    Longitude: Yup.string()
    .trim()
    .matches(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/, 'Longitude should be between -180 to 180')
    .required('Required'),

    Latitude: Yup.string()
    .trim()
    .matches(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/, 'Latitude should be between -90 to 90')
    .required('Required'),

    Location: Yup.string()
    .required('Required'),

    VenueTypeId: Yup.string()
    .required('Required'),

    CityId: Yup.string()
    .required('Required'),

    AreaId: Yup.string()
    .required('Required'),

    Shift: Yup.string()
    .required('Required'),
});


const NewVenueAdditionPage = (props) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [markedDates, setMarkedDates] = React.useState({})

  const [shiftList, setShiftList] = React.useState([])
  const [VenueType, setVenueType] = React.useState([
    {label:'Banquet',value:'Banquet',enable:false},
    {label:'Fixed Marquee',value:'Fixed Marquee',enable:true},
    {label:'Hall Indoor',value:'Hall Indoor',enable:true},
    {label:'Outdoor Lawn',value:'Outdoor Lawn',enable:false}

  ])
  const [City, setCity] = React.useState([
    {label:'Karachi',value:'Karachi',enable:true}

  ])

  const [AreaDropdown, setAreaDropdown] = React.useState([
    {label:'Karachi',value:'Karachi',enable:true}

  ])

  const [initialFormValues, setInitialFormValues] = React.useState({
    VenueName: '',
    POCName:'',
    ContactNumber:'',
    MaxCapacity: '',
    RentPrice: '',
    Longitude: '',
    Latitude: '',
    Shift: '',
    Location: '',
    VenueTypeId: '',
    CityId: '',
    AreaId:''
  })
  // const [EventDate, setEventDate] = React.useState('')
  // const [venueID, setVenueID] = React.useState(route.params.venueID)
  const globalPayload = useStoreState((state) => state.payload);


  React.useEffect(() => {
    getTimesDropdown()
    getVenueTypeDropdown()
    getCityDropdown()
    getAreaDropdown()
  }, [])

  const getTimesDropdown = async () => {

    let configurationObject = {
      url: `${BASE_URL}GetShiftTimeLOV`,
      method: "GET",
      cancelToken: source.token,
    }
    try {
      const response = await axios(
        configurationObject,
      );
      if (response.data.ResponseCode === "00") {
        if(response.data.Result_DTO){
          setShiftList(response.data.Result_DTO)

        }
        return;
      } else {
        setShiftList([])

      }
    } catch (error) {
      setShiftList([])

    }
  };
  const getVenueTypeDropdown = async () => {
    let configurationObject = {
      url: `${BASE_URL}GetVenueTypeList`,
      method: "GET",
      cancelToken: source.token,
    }
    try {
      const response = await axios(
        configurationObject,
      );
      if (response.data.ResponseCode === "00") {
        if(response.data.Result_DTO){
          setVenueType(response.data.Result_DTO)
        }
        return;
      } else {
        setVenueType([])
      }
    } catch (error) {
      setVenueType([])
    }
  };
  const getCityDropdown = async () => {
    let configurationObject = {
      url: `${BASE_URL}GetCityList`,
      method: "GET",
      cancelToken: source.token,
    }
    try {
      const response = await axios(
        configurationObject,
      );
      if (response.data.ResponseCode === "00") {
        if(response.data.Result_DTO){
          setCity(response.data.Result_DTO)

        }
        return;
      } else {
        setCity([])

      }
    } catch (error) {
      setCity([])

    }
  };
  const getAreaDropdown = async () => {
    let configurationObject = {
      url: `${BASE_URL}GetAreaList`,
      method: "GET",
      cancelToken: source.token,
    }
    try {
      const response = await axios(
        configurationObject,
      );
      if (response.data.ResponseCode === "00") {
        if(response.data.Result_DTO){
          setAreaDropdown(response.data.Result_DTO)

        }
        return;
      } else {
        setAreaDropdown([])

      }
    } catch (error) {
      setAreaDropdown([])

    }
  };


  const submitForm = (formData) => {
    console.log(formData)
    if (formData != null || formData != {}) {
      saveData(formData)
    }
  }

  const saveData = async (data) => {
    let formData = Object.assign({}, data)
    let configurationObject = {
      url: `${BASE_URL}VenueBooking`,
      method: "POST",
      cancelToken: source.token,
      // data: { ...formData, CateringID : globalPayload.addons.CateringID, VenueID: globalPayload.venueId, userId: globalPayload.userId },
    }
    // navigation.navigate('BookingConfirm')

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
        setInitialFormValues({ VenueName: '',
        POCName:'',
        ContactNumber:'',
        MaxCapacity: '',
        RentPrice: '',
        Longitude: '',
        Latitude: '',
        Shift: '',
        Location: '',
        CityId: '',
        AreaId:'',
        VenueTypeId: ''})
        setMarkedDates({})
        navigation.navigate('BookingConfirm')
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

  const goToPicsAdditionPage = () =>{
    props.navigation.push('VenuePicVideos')
  }

  return (
    <View style={styles.container}>

      <Loader isLoading={isLoading} />

      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <ImageBackground style={styles.container}
        source={require("../../assets/images/Gradient_MI39RPu.png")}
      >
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Add New Venue</Text>
        </View>
        <ScrollView>
          <Formik
            initialValues={initialFormValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values, errors) => submitForm(values)}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValidating }) => {

              const myChangeFunc = (key, val) => {
                setInitialFormValues({ ...initialFormValues, [key]: val });
                return handleChange(val)
              }

              return (
                <View>
                  <TextField
                    placeholder="Venue Name" style={styles.labelText}
                    keyboardType='default'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="user"
                    maxLength={80}
                    onChangeText={(e) => { myChangeFunc('VenueName', e) }}
                    onBlur={handleBlur('VenueName')}
                    value={values.VenueName}
                    error={[errors.VenueName]}
                  />
                   <SelectField 
                    placeholder="Please Select Venue Type" 
                    items={VenueType} 
                    value={values.VenueTypeId} 
                    onChange={handleChange('VenueTypeId')} 
                    error={[errors.VenueTypeId]} 
                    nameOfIcon="home" 
                    mode="dialog" /> 

                     <SelectField 
                   placeholder="Please Select City" 
                    items={City} 
                    value={values.CityId} 
                    onChange={handleChange('CityId')} 
                    error={[errors.CityId]} 
                    nameOfIcon="map" 
                    mode="dialog" /> 

                    <SelectField 
                    placeholder="Please Select Area" 
                    items={AreaDropdown} 
                    value={values.AreaId} 
                    onChange={handleChange('AreaId')} 
                    error={[errors.AreaId]} 
                    nameOfIcon="map" 
                    mode="dialog" /> 

                    <TextField
                    placeholder="Address" style={styles.labelText}
                    keyboardType='default'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="user"
                    maxLength={80}
                    onChangeText={(e) => { myChangeFunc('Location', e) }}
                    onBlur={handleBlur('Location')}
                    value={values.Location}
                    error={[errors.Location]}
                  />
                  <TextField
                    placeholder="Longitude" style={styles.labelText}
                    keyboardType='default'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="envelope"
                    maxLength={50}
                    onChangeText={(e) => { myChangeFunc('Longitude', e) }}
                    onBlur={handleBlur('Longitude')}
                    value={values.Longitude}
                    error={[errors.Longitude]}
                  />
                  <TextField
                    placeholder="Latitude" style={styles.labelText}
                    keyboardType='default'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="credit-card"
                    maxLength={50}
                    onChangeText={(e) => { myChangeFunc('Latitude', e) }}
                    onBlur={handleBlur('Latitude')}
                    value={values.Latitude}
                    error={[errors.Latitude]}
                  />
                   <TextField
                    placeholder="MaxCapacity" style={styles.labelText}
                    keyboardType='phone-pad'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="credit-card"
                    maxLength={50}
                    onChangeText={(e) => { myChangeFunc('MaxCapacity', e) }}
                    onBlur={handleBlur('MaxCapacity')}
                    value={values.MaxCapacity}
                    error={[errors.MaxCapacity]}
                  />
                   <TextField
                    placeholder="Rent Price" style={styles.labelText}
                    keyboardType='phone-pad'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="credit-card"
                    maxLength={50}
                    onChangeText={(e) => { myChangeFunc('RentPrice', e) }}
                    onBlur={handleBlur('RentPrice')}
                    value={values.RentPrice}
                    error={[errors.RentPrice]}
                  />
                  <SelectField 
                   placeholder=" please select shifts" 
                    items={shiftList} 
                    value={values.Shift} 
                    onChange={handleChange('Shift')} 
                    error={[errors.Shift]} 
                    nameOfIcon="clock" 
                    mode="dialog" /> 

                  <TextField
                    placeholder="POC Name" style={styles.labelText}
                    keyboardType='default'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="user"
                    maxLength={80}
                    onChangeText={(e) => { myChangeFunc('POCName', e) }}
                    onBlur={handleBlur('POCName')}
                    value={values.POCName}
                    error={[errors.POCName]}
                  />

                  <TextField
                    placeholder="POC Number" style={styles.labelText}
                    keyboardType='phone-pad'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="bell"
                    maxLength={11}
                    onChangeText={(e) => { myChangeFunc('ContactNumber', e) }}
                    onBlur={handleBlur('ContactNumber')}
                    value={values.ContactNumber}
                    error={[errors.ContactNumber]}
                  />

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.submitButtonWrapper}

                  >
                    <Text style={styles.submitButtonText} onPress={()=>goToPicsAdditionPage()}>NEXT</Text>
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
    height: 111,
    alignContent: "center",
    textAlign: "center"
  },
  title: {
    color: "rgba(248,231,28,1)",
    fontSize: 40,
    width: 335,
    height: 70,
    flex: 1,
    fontFamily: "cursive",
    marginLeft: 30,
    marginTop: 30,
    marginRight: 30,
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
  },
  stylesReserved: {
    container: {
      backgroundColor: 'red'
    },
    text: {
      color: 'black',
      fontWeight: 'bold'
    }
  },

})

export default NewVenueAdditionPage;


