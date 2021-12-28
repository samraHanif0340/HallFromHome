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


const source = axios.CancelToken.source();

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be atleast 6 characters long')
    .max(80, 'Name must be atmost 80 characters long')
    .required('Required'),

  email: Yup.string().email('Enter a valid EMAIL (abc@abc.com)').required('Required').max(50, 'Email must be atmost 50 characters long'),
  cnic: Yup.string()
    .min(13, 'CNIC must be of 13 characters long')
    .max(13, 'CNIC must be of 13 characters long')
    .required('Required'),
  mobileNumber: Yup.string()
    .min(11, 'Mobile Number should be in format 03xxxxxxxxx')
    .max(11, 'Mobile Number should be in format 03xxxxxxxxx')
    .matches(/^[0][3][\d]{9}$/, 'Mobile Number should be in format 03xxxxxxxxx')
    .required('Required'),
  EventDate: Yup.string()
    .required('Required'),
  EventShift: Yup.string()
    .required('Required'),
});


const CustomerBookingPage = ({ route }) => {
  console.log('customer booking page params', route)
  const [isLoading, setIsLoading] = React.useState(false)
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [shiftList, setShiftList] = React.useState([
    { label: ' Please Select', value: '', enable: true },
    { label: 'Day', value: 'Day', enable: true },
    { label: 'Night', value: 'Night', enable: true },
  ])
  const [initialFormValues, setInitialFormValues] = React.useState({
    name: '',
    email: '',
    cnic: '',
    mobileNumber: '',
    EventDate: '',
    EventShift: ''
  })
  // const [EventDate, setEventDate] = React.useState('')
  const [venueID, setVenueID] = React.useState(route.params.venueID)
  const globalPayload = useStoreState((state) => state.payload);


  useEffect(() => {
    getReservedDates(route.params.venueID)
  }, [route.params.venueID])



  const getReservedDates = async (venueID) => {
    let payload = {
      venueID: venueID
    }

    let configurationObject = {
      url: `${BASE_URL}getReservedDates`,
      method: "POST",
      cancelToken: source.token,
      data: payload,
    }
    try {
      const response = await axios(
        configurationObject,
      );
      if (response.data.ResponseCode === "00") {
        //  setShiftList(response.data.Result_DTO)
        return;
      } else {
      }
    } catch (error) {
    }
  };

  const getTimesDropdown = async (data) => {
    let formData = Object.assign({}, data)

    console.log(formData)
    formData.venueID = route.params.venueID

    let configurationObject = {
      url: `${BASE_URL}getTimesDropdown`,
      method: "POST",
      cancelToken: source.token,
      data: formData,
    }
    try {
      const response = await axios(
        configurationObject,
      );
      if (response.data.ResponseCode === "00") {
        //  setShiftList(response.data.Result_DTO)
        return;
      } else {
      }
    } catch (error) {
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
    formData.venueID = route.params.venueID

    console.log(globalPayload)
    console.log(formData)

    let configurationObject = {
      url: `${BASE_URL}VenueBooking`,
      method: "POST",
      cancelToken: source.token,
      data: { ...formData, ...globalPayload },
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

  const setEventDateMethod = (formValues) => {
    console.log(formValues)
    // setEventDate(formValues.EventDate)
    setInitialFormValues({ ...initialFormValues, EventDate: formValues.EventDate });
    setShowCalendar(false)
  }

  const CalendarComponent = (props) => {
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
          markedDates={{
            '2022-01-20': { customStyles: styles.stylesReserved, disableTouchEvent: true },
            '2021-01-22': { startingDay: true, color: 'green', disableTouchEvent: true, customStyles: styles.stylesReserved },
            '2021-12-31': { selected: true, endingDay: true, customStyles: styles.stylesReserved, disableTouchEvent: true },
            '2021-12-28': { disabled: true, startingDay: true, customStyles: styles.stylesReserved, disableTouchEvent: true },
            '2021-12-12': { disabled: true, startingDay: true, customStyles: styles.stylesReserved, disableTouchEvent: true }
          }}
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
          <Text style={styles.title}>Enter Booking Details</Text>
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
                    placeholder="Name" style={styles.labelText}
                    keyboardType='default'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="user"
                    maxLength={80}
                    onChangeText={(e) => { myChangeFunc('name', e) }}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    error={[errors.name]}
                  />
                  <TextField
                    placeholder="Email" style={styles.labelText}
                    keyboardType='email-address'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="envelope"
                    maxLength={50}
                    onChangeText={(e) => { myChangeFunc('email', e) }}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    error={[errors.email]}
                  />
                  <TextField
                    placeholder="CNIC" style={styles.labelText}
                    keyboardType='number'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="credit-card"
                    maxLength={13}
                    onChangeText={(e) => { myChangeFunc('cnic', e) }}
                    onBlur={handleBlur('cnic')}
                    value={values.cnic}
                    error={[errors.cnic]}
                  />
                  <TextField
                    placeholder="Mobile Number" style={styles.labelText}
                    keyboardType='phone-pad'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="bell"
                    maxLength={11}
                    onChangeText={(e) => { myChangeFunc('mobileNumber', e) }}
                    onBlur={handleBlur('mobileNumber')}
                    value={values.mobileNumber}
                    error={[errors.mobileNumber]}
                  />

                  {showCalendar ? <CalendarComponent parentCallback={setEventDateMethod} /> : null}



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
                  {initialFormValues.EventDate ? <SelectField items={shiftList} value={values.EventShift} onChangeText={handleChange('EventShift')} error={[errors.EventShift]} nameOfIcon="clock" mode="dialog" /> : null}

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
                    <Text style={styles.submitButtonText}>SEND BOOK REQUEST</Text>
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

})

export default CustomerBookingPage;


