import React from "react";
import { Button, TextInput, View, StatusBar, ImageBackground, StyleSheet, Text,ActivityIndicator,ScrollView,Field } from "react-native";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

import { Formik} from "formik";
import * as Yup from "yup";

import { TextField,SelectField } from '../../components/customComponents/customComponents'
import axios from 'axios';
import { BASE_URL } from '../../constants/constants'
import Snackbar from 'react-native-snackbar';
import { Avatar } from "react-native-elements";
import moment from 'moment';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

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
    .matches(/^[0][3][\d]{9}$/,'Mobile Number should be in format 03xxxxxxxxx')
    .required('Required'),
    EventDate: Yup.string()
    .required('Required'),
    EventShift: Yup.string()
    .required('Required'),
});


const CustomerBookingPage = (props) => {
  const shiftList = [
    { label: 'Day', value: 1, enable: true },
    { label: 'Night', value: 2, enable: false },
  ];
  const [isLoading, setIsLoading] = React.useState(false)

  const submitForm = (formData) => {
    console.log(formData)
    if(formData != null || formData != {}){
      saveData(formData)
    }
  }

  const saveData = async (data) => {
    let formData = Object.assign({},data)
    formData.EventDate = '12-14-2021'
    formData.EventTime = '7PM - 11PM'
    formData.AdvancePayment = '30,000 PKR'
  
    console.log(formData)
  
    let configurationObject = {
      url: `${BASE_URL}VenueBooking`,
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

  const CalendarComponent = (props) => {

    const changeSelection = (day) => {
      alert('in day',day)
      // let markedDates = {};
      // markedDates[date] = { selected: true, color: '#00B0BF', textColor: '#FFFFFF' };
      let selectedDate = moment(day);
      selectedDate = selectedDate.format("YYYY-MM-DD");
      // this.setState({
      //     selectedDate: serviceDate,
      //     markedDates: markedDates
      // });
      console.log(selectedDate)
      alert(selectedDate)
      // props.parentCallback(selectedDate);
      setPageState('child-page-2')

    }
  
    return (
      <View>
        <Avatar
          rounded
          icon={{ name: 'arrow-left', type: 'font-awesome' }}
          onPress={() => { setPageState('parent-page') }}
          activeOpacity={0.7}
          size={50}
        // containerStyle={{flex: 2, alignSelf:'flex-end'}}

        />
        <Calendar
        hideExtraDays={true}
          markedDates={{
            '2022-01-20': { customStyles: styles.stylesReserved, disableTouchEvent: true },
            '2021-12-22': { startingDay: true, color: 'green', disableTouchEvent: true, customStyles: styles.stylesReserved },
            '2021-12-23': { selected: true, endingDay: true, customStyles: styles.stylesReserved, disableTouchEvent: true },
            '2021-12-04': { disabled: true, startingDay: true, customStyles: styles.stylesReserved, disableTouchEvent: true },
            '2021-12-06': { disabled: true, startingDay: true, customStyles: styles.stylesReserved, disableTouchEvent: true }
          }}
          current={new Date()}
          minDate={new Date()}
          onDayPress={day => changeSelection(day.dateString)}
          markingType={'custom'}
          // dayComponent={({date, state}) => {
          //   return (
          //     <View>
          //       <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>
          //         {date.day}
          //       </Text>
          //     </View>
          //   );
          // }}
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
     
        {isLoading ? <ActivityIndicator  size="large"  color="red"/> : null}
     
      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <ImageBackground style={styles.container}
        source={require("../../assets/images/Gradient_MI39RPu.png")}
      >
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Enter Booking Details</Text>
        </View>
        <ScrollView>
        <Formik
          initialValues={{
            name: '',
            email: '',
            cnic: '',
            mobileNumber: '',
            EventDate:'',
            EventShift:''
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
                onChangeText={handleChange('name')}
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
                onChangeText={handleChange('email')}
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
                onChangeText={handleChange('cnic')}
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
                onChangeText={handleChange('mobileNumber')}
                onBlur={handleBlur('mobileNumber')}
                value={values.mobileNumber}
                error={[errors.mobileNumber]}
              />

              <TextField
                placeholder="Event Date" style={styles.labelText}
                keyboardType='default'
                mode="outlined"
                placeholderTextColor="#800000"
                nameOfIcon="clock"
                maxLength={11}
                onChangeText={handleChange('EventDate')}
                onBlur={handleBlur('EventDate')}
                value={values.EventDate}
                error={[errors.EventDate]}
              />

              <CalendarComponent/>
              <SelectField items={shiftList} value={values.EventShift}  onChangeText={handleChange('EventShift')} error={[errors.EventShift]} nameOfIcon="clock" mode="dialog" />

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
  eventDetails:{
    marginRight: 20,
    marginLeft: 20,
    marginTop: 14,
    marginBottom: 14,
    flexDirection:'row',
    
  },
  eventChilds:{  
    flex:6,
    content:{
      viewTypeLeft:{
      color:'white',
        alignSelf:'flex-start',
        alignContent:'space-around'
      },
      viewTypeRight:{
      color:'white',
        alignSelf:'flex-end',
        alignContent:'space-around'
      }
    }
  }

})

export default CustomerBookingPage;


