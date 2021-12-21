import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  TextInput
} from "react-native";
import { HallDetailTabs } from '../../components/navigations/Navigations';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { TouchableHighlight } from "react-native";
import { Avatar } from "react-native-elements";
import moment from 'moment';
import { DropdownField, SelectField } from '../../components/customComponents/customComponents'


const HallDetailPage = ({ route,navigation }) => {
  const [venueId,setVenueId] = useState(route.params.VenueID)
  const [pageState, setPageState] = useState('parent-page');
  const [bookingDetail, setBookingDetail] = useState({ selectedDate: null, selectedTime: null});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [data, setData] = useState({
    hallName: "Majestic Banquet",
    seatingCapacity: 700,
    price: "150,000 PKR",
    rating: 4.5,
    imgURL: "../../assets/images/download2.jpg"
  });

  const changeSelectedDetails = (item, key) => {
    setBookingDetail({
      ...bookingDetail,
      [key]: item
    })
    console.log(item)
    console.log(bookingDetail)

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

  const TimeComponent = (props) => {
    const [selectedTime, setSelectedTime] = useState(null)
    const timeList = [
      { label: '07:00 AM - 10:00 AM', value: 1, enable: true },
      { label: '12:00 PM - 04:00 PM', value: 2, enable: true },
      { label: '6:00 PM - 11:00 PM', value: 3, enable: false },

    ];
    return (
      <View>
        <Avatar
          rounded
          icon={{ name: 'arrow-left', type: 'font-awesome' }}
          onPress={() => { setPageState('child-page-1') }}
          activeOpacity={0.7}
          size={50}
        // containerStyle={{flex: 2, alignSelf:'flex-end'}}
        />
        <Text style={styles.textEvent}>Select Time for the Event</Text>
        {/* <DropdownField
          dropdownList={timeList}
          search="true"
          searchPlaceholder="Search"
          labelField="label"
          labelValue="value"
          labelTitle="Time"
          dropdownPlaceholder="Select Time"
          formValue={selectedTime}
          onChange={(time) => setSelectedTime(time.value)}
          iconRight={() =>
            <Avatar
              rounded
              icon={{ name: 'close', color: 'red', type: 'font-awesome' }}
              activeOpacity={0.7}
              size={50}
            />
          }
        /> */}
        <SelectField items={timeList} selectedValue={selectedTime} nameOfIcon="clock" mode="dialog" />
        <TouchableOpacity style={styles.bookHall} onPress={() => {
          setPageState('parent-page')
          navigation.navigate('Booking Confirmed')
        }
        }><Text style={styles.bookHall.content}>BOOK</Text></TouchableOpacity>

      </View>

    )
  }
  return (

    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <ImageBackground
        style={styles.rect1}
        imageStyle={styles.rect1_imageStyle}
        source={require("../../assets/images/Gradient_MI39RPu.png")}
      >
        {/* <View style={styles.hallFromHome2Column}>
          <Text style={styles.bookingDetail}>BOOKING DETAILS</Text>
          <Text>{hallId}</Text>
        </View> */}
        {/* <Image
          source={require("../../assets/images/download2.jpg")}
          // source={{ uri: item.imgURL }}
          resizeMode="cover"
          style={styles.image2}
        ></Image> */}
        
        <HallDetailTabs venueID={route.params.VenueID}/>
{/* 
        {pageState === 'parent-page' ? <TouchableOpacity style={styles.checkAvailability} onPress={() => setPageState('child-page-1')}><Text style={styles.checkAvailability.Availabilitycontent}>BOOK</Text></TouchableOpacity> : null}
        {pageState === 'child-page-1' ? <CalendarComponent /> : null}
        {pageState === 'child-page-2' ? <TimeComponent /> : null} */}
        <TouchableOpacity style={styles.checkAvailability} onPress={()=> navigation.navigate('BookingConfirmStack')}><Text style={styles.checkAvailability.Availabilitycontent}>BOOK</Text></TouchableOpacity>

        {/* <TouchableOpacity style={styles.bookHall} onPress={() => navigation.navigate('Booking Confirmed')}><Text style={styles.bookHall.content}>BOOK</Text></TouchableOpacity> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  rect1: {
    flex: 1
  },
  bookingDetail: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    marginTop: 10,
    textAlign: "center",

  },
  textEvent:{
    fontFamily: "roboto-regular",
    fontSize: 24,
    color: 'rgba(255,255,255,1)',
    textAlign: "center",
  },
  image2: {
    marginLeft: 15,
    marginBottom: 20,
    marginTop: 10,
    width: 360,
    height: 175,
    borderRadius: 10,
    alignItems: "center",
    textAlign: "center",
  },
  bookHall: {
    backgroundColor: "rgba(142,7,27,1)",
    marginLeft: 45,
    marginTop: 5,
    marginRight: 40,
    marginBottom: 20,
    width: 288,
    height: 42,
    Bookingcontent: {
      fontFamily: "roboto-regular",
      fontSize: 20,
      flex: 1,
      marginHorizontal: 6,
      marginVertical: 6,
      color: 'rgba(255,255,255,1)',
      textAlign: "center",

    }
  },
  checkAvailability: {
    backgroundColor: "rgba(142,7,27,1)",
    marginLeft: 45,
    marginTop: 20,
    marginRight: 40,
    marginBottom: 15,
    width: 288,
    height: 45,
    Availabilitycontent: {
      fontFamily: "roboto-regular",
      fontSize: 20,
      flex: 1,
      marginHorizontal: 6,
      marginVertical: 6,
      color: 'rgba(255,255,255,1)',
      textAlign: "center",

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

  button2: {
    flex: 1,
    top: 557,
    left: 92,
    width: 177,
    height: 55,
    position: "absolute",
    backgroundColor: "#E6E6E6"
  },
  rect: {
    width: 360,
    height: 740,
    position: "absolute",
    left: 0,
    top: 0
  },
  rect_imageStyle: {},

  image1: {
    width: 335,
    height: 175,
    borderRadius: 16,
    marginTop: 28,
    marginLeft: 13,
    overflow: "hidden"
  },
  image1_imageStyle: {},

  materialButtonViolet2: {
    height: 41,
    width: 100,
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "rgba(142,7,27,1)"
  },
  materialButtonViolet4: {
    height: 55,
    width: 177,
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "rgba(142,7,27,1)"
  },
  loremIpsum: {
    top: 19,
    left: 38,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  materialButtonViolet2Stack: {
    width: 100,
    height: 41
  },
  materialButtonWithShadow: {
    height: 41,
    width: 100,
    position: "absolute",
    left: 0,
    top: 0
  },
  button4: {
    top: 0,
    left: 0,
    width: 100,
    height: 47,
    position: "absolute"
  },
  materialButtonWithShadowStack: {
    width: 100,
    height: 47,
    marginLeft: 17
  },
  materialButtonWithShadow1: {
    height: 41,
    width: 100,
    marginLeft: 18
  },
  materialButtonViolet2StackRow: {
    height: 47,
    flexDirection: "row",
    marginTop: 17,
    marginLeft: 13,
    marginRight: 12
  },
  textInput: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 17,
    width: 234,
    height: 34,
    textAlign: "left",
    marginTop: 31,
    marginLeft: 25
  },
  textInput2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 31,
    width: 149,
    fontSize: 17,
    marginLeft: 25
  },
  textInput3: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: 223,
    height: 37,
    fontSize: 17,
    marginLeft: 25
  },
  textInput4: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: 191,
    height: 34,
    fontSize: 17,
    marginLeft: 25
  },
  button3: {
    top: 0,
    left: 0,
    width: 177,
    height: 55,
    position: "absolute"
  },

  button2Stack: {
    width: 360,
    height: 740
  },
  bookingDetail2: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    marginLeft: 559,
    marginTop: 56
  },
  button2StackRow: {
    height: 740,
    flexDirection: "row",
    flex: 1,
    marginRight: -765
  }
});

export default HallDetailPage;
