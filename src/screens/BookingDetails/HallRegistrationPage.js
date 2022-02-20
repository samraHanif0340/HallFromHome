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
  HallName: Yup.string()
    .min(2, 'Name must be atleast 6 characters long')
    .max(80, 'Name must be atmost 80 characters long')
    .required('Required'),

  // Email: Yup.string().email('Enter a valid EMAIL (abc@abc.com)').required('Required').max(50, 'Email must be atmost 50 characters long'),
  // CNIC: Yup.string()
  //   .min(13, 'CNIC must be of 13 characters long')
  //   .max(13, 'CNIC must be of 13 characters long')
  //   .required('Required'),
    Capacity: Yup.string()
    .required('Required'),
    RentPrice: Yup.string()
    .required('Required'),
    Longitude: Yup.string()
    .required('Required'),
    Latitude: Yup.string()
    .required('Required'),
    Location: Yup.string()
    .required('Required'),
    HallType: Yup.string()
    .required('Required'),
    City: Yup.string()
    .required('Required'),
  // MobileNumber: Yup.string()
  //   .min(11, 'Mobile Number should be in format 03xxxxxxxxx')
  //   .max(11, 'Mobile Number should be in format 03xxxxxxxxx')
  //   .matches(/^[0][3][\d]{9}$/, 'Mobile Number should be in format 03xxxxxxxxx')
  //   .required('Required'),
  // EventDate: Yup.string()
  //   .required('Required'),
  EventShift: Yup.string()
    .required('Required'),
});


const HallRegistrationPage = ({ route,navigation }) => {
  console.log('Hall Registration page params', route)
  const [isLoading, setIsLoading] = React.useState(false)
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [markedDates, setMarkedDates] = React.useState({})

  const [shiftList, setShiftList] = React.useState([
    {label:'Day',value:'Day',enable:false},
    {label:'Night',value:'Night',enable:false},
    {label:'Both',value:'Both',enable:false}

  ])
  const [VenueType, setVenueType] = React.useState([
    {label:'Banquet',value:'Banquet',enable:false},
    {label:'Fixed Marquee',value:'Fixed Marquee',enable:false},
    {label:'Hall Indoor',value:'Hall Indoor',enable:false},
    {label:'Outdoor Lawn',value:'Outdoor Lawn',enable:false}

  ])
  const [City, setCity] = React.useState([
    {label:'Karachi',value:'Karachi',enable:false}

  ])
  const [initialFormValues, setInitialFormValues] = React.useState({
    HallName: '',
    Capacity: '',
    RentPrice: '',
    Longitude: '',
    Latitude: '',
    EventShift: '',
    Location: '',
    HallType: '',
    City: ''
  })
  // const [EventDate, setEventDate] = React.useState('')
  // const [venueID, setVenueID] = React.useState(route.params.venueID)
  // const globalPayload = useStoreState((state) => state.payload);


  // useEffect(() => {
  //   getReservedDates(globalPayload.venueId)


  // }, [globalPayload.venueId])



  // const getReservedDates = async (venueID) => {
  //   let payload = {
  //     VenueID: venueID
  //   }

  //   let configurationObject = {
  //     url: `${BASE_URL}GetEventBookedDatesByVenue`,
  //     method: "POST",
  //     cancelToken: source.token,
  //     data: payload,
  //   }
  //   try {
  //     const response = await axios(
  //       configurationObject,
  //     );
  //     if (response.data.ResponseCode === "00") {
  //       if(response.data.Result_DTO){
  //         let obj = {}
  //         let dateArray = ['2022-01-05', '2022-01-10', '2022-01-26', '2022-01-25','2022-02-06','2022-02-10']
  //         for(let i=0;i<dateArray.length;i++){
  //           // let date = response.data.Result_DTO[i].format("YYYY-MM-DD")
            

  //           obj[dateArray[i]] = {
  //             disabled: true, color: 'white', disableTouchEvent: true,backgroundColor:'red' ,customStyles:styles.stylesReserved
  //           }
  //         }

  //         console.log(obj)
  //         setMarkedDates(obj)
  //       }

       
  //       return;
  //     } else {
  //       setMarkedDates([])

  //     }
  //   } catch (error) {
  //     setMarkedDates([])

  //   }
  // };

  const getTimesDropdown = async (data) => {
    let formData = Object.assign({}, data)

    console.log(formData)
    formData.VenueID = globalPayload.venueId

    let configurationObject = {
      url: `${BASE_URL}GetBookedTiming_DD`,
      method: "POST",
      cancelToken: source.token,
      data: formData,
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
  const getVenueTypeDropdown = async (data) => {
    let formData = Object.assign({}, data)

    console.log(formData)
    formData.VenueID = globalPayload.venueId

    let configurationObject = {
      url: `${BASE_URL}GetVenueType_DD`,
      method: "POST",
      cancelToken: source.token,
      data: formData,
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
  const getCityeDropdown = async (data) => {
    let formData = Object.assign({}, data)

    console.log(formData)
    formData.VenueID = globalPayload.venueId

    let configurationObject = {
      url: `${BASE_URL}GetHallCity_DD`,
      method: "POST",
      cancelToken: source.token,
      data: formData,
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

  const submitForm = (formData) => {
    console.log(formData)
    if (formData != null || formData != {}) {
      saveData(formData)
    }
  }

  const saveData = async (data) => {
    let formData = Object.assign({}, data)
    
    formData.ReservedCapacity = 600

    console.log(globalPayload)
    console.log(formData)

    let configurationObject = {
      url: `${BASE_URL}VenueBooking`,
      method: "POST",
      cancelToken: source.token,
      data: { ...formData, CateringID : globalPayload.addons.CateringID, VenueID: globalPayload.venueId, userId: globalPayload.userId },
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
        setInitialFormValues({ HallName: '',
        Capacity: '',
        RentPrice: '',
        Longitude: '',
        Latitude: '',
        EventShift: '',
        Location: '',
        City: '',
        HallType: ''})
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

  const setEventDateMethod = (formValues) => {
    console.log(formValues)
    // setEventDate(formValues.EventDate)
    setInitialFormValues({ ...initialFormValues, EventDate: formValues.EventDate });
    setShowCalendar(false)
    // if(formValues.EventDate){
    //   getTimesDropdown(formValues)
    // }
  }

  const CalendarComponent = (props) => {
    console.log(props)
    const changeSelection = (day) => {
      let selectedDate = moment(day);
      selectedDate = selectedDate.format("YYYY-MM-DD");
      let obj = {
        EventDate: selectedDate
      }
      props.parentCallback(obj);

      getTimesDropdown(obj)
    }

    return (
      <View>

        <Calendar
          hideExtraDays={true}
          // markedDates={{
          //   '2022-01-20': { customStyles: styles.stylesReserved, disableTouchEvent: true },
          //   '2021-01-22': { startingDay: true, color: 'green', disableTouchEvent: true, customStyles: styles.stylesReserved },
          //   '2021-12-31': { selected: true, endingDay: true, customStyles: styles.stylesReserved, disableTouchEvent: true },
          //   '2021-12-28': { disabled: true, startingDay: true, customStyles: styles.stylesReserved, disableTouchEvent: true },
          //   '2021-12-12': { disabled: true, startingDay: true, customStyles: styles.stylesReserved, disableTouchEvent: true }
          // }}
          markedDates={props['markedDates']}
          current={new Date()}
          minDate={new Date()}
          onDayPress={day => changeSelection(day.dateString)}
          markingType={'custom'}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'red',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'red',
            indicatorColor: 'blue',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
        />
      </View>

    )
  }

  return (
    <View style={styles.container}>

      <Loader isLoading={isLoading} />

      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <ImageBackground style={styles.container}
        source={require("../../assets/images/Gradient_MI39RPu.png")}
      >
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Enter Hall Details</Text>
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
                    placeholder="Hall Name" style={styles.labelText}
                    keyboardType='default'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="user"
                    maxLength={80}
                    onChangeText={(e) => { myChangeFunc('Name', e) }}
                    onBlur={handleBlur('Name')}
                    value={values.HallName}
                    error={[errors.HallName]}
                  />
                   <SelectField 
                    pleaseSelectPlaceholder="Hall Type" 
                    items={VenueType} 
                    value={values.HallType} 
                    onChange={handleChange('VenueType')} 
                    error={[errors.HallType]} 
                    nameOfIcon="home" 
                    mode="dialog" /> 

                     <SelectField 
                    pleaseSelectPlaceholder="City" 
                    items={City} 
                    value={values.City} 
                    onChange={handleChange('City')} 
                    error={[errors.City]} 
                    nameOfIcon="map" 
                    mode="dialog" /> 

                    <TextField
                    placeholder="Location" style={styles.labelText}
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
                    keyboardType='Longitude'
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
                    keyboardType='Latitude'
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
                    placeholder="Capacity" style={styles.labelText}
                    keyboardType='Capacity'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="credit-card"
                    maxLength={50}
                    onChangeText={(e) => { myChangeFunc('Capacity', e) }}
                    onBlur={handleBlur('Capacity')}
                    value={values.Capacity}
                    error={[errors.Capacity]}
                  />
                   <TextField
                    placeholder="Rent Price" style={styles.labelText}
                    keyboardType='Rent Price'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="credit-card"
                    maxLength={50}
                    onChangeText={(e) => { myChangeFunc('Rent Price', e) }}
                    onBlur={handleBlur('Rent Price')}
                    value={values.RentPrice}
                    error={[errors.RentPrice]}
                  />
                  <SelectField 
                    pleaseSelectPlaceholder="Shift" 
                    items={shiftList} 
                    value={values.EventShift} 
                    onChange={handleChange('EventShift')} 
                    error={[errors.EventShift]} 
                    nameOfIcon="clock" 
                    mode="dialog" /> 
                    
                  {/* <TextField
                    placeholder="Mobile Number" style={styles.labelText}
                    keyboardType='phone-pad'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="bell"
                    maxLength={11}
                    onChangeText={(e) => { myChangeFunc('MobileNumber', e) }}
                    onBlur={handleBlur('MobileNumber')}
                    value={values.MobileNumber}
                    error={[errors.MobileNumber]}
                  />

                  {showCalendar ? <CalendarComponent markedDates={markedDates} parentCallback={setEventDateMethod} /> : null}



                  <TextField
                    placeholder="Event Date" style={styles.labelText}
                    keyboardType='default'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="calendar"
                    maxLength={11}
                    onPress={() => setShowCalendar(!showCalendar)}
                    // onChangeText={handleChange('EventDate')}
                    onBlur={handleBlur('EventDate')}
                    value={values.EventDate}
                    disabled={true}
                    error={[errors.EventDate]}
                  />
                  {initialFormValues.EventDate ? <SelectField pleaseSelectPlaceholder="Select Shift" items={shiftList} value={values.EventShift} onChange={handleChange('EventShift')} error={[errors.EventShift]} nameOfIcon="clock" mode="dialog" /> : null} */}

                  {/* <View style={styles.eventDetails}>
                <View style={styles.eventChilds}>
                  <Text style={styles.eventChilds.content.viewTypeLeft}>Event Date:</Text>
                  <Text style={styles.eventChilds.content.viewTypeLeft}>Event Time:</Text>
                  <Text style={styles.eventChilds.content.viewTypeLeft}>Advance Payment:</Text>
                </View>
                <View style={styles.eventChilds}>
                <Text style={styles.eventChilds.content.viewTypeRight}>14-12-2021</Text>
                  <Text style={styles.eventChilds.content.viewTypeRight}>7PM - 11 PM</Text>
                  <Text style={styles.eventChilds.content.viewTypeRight}>30,000 PKR</Text>
                </View>
              </View> */}

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.submitButtonWrapper}

                  >
                    <Text style={styles.submitButtonText}>SEND HALL REQUEST</Text>
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

export default HallRegistrationPage;


