import React, { Component } from "react";
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
import MaterialButtonViolet2 from "../../components/MaterialButtonViolet2";
import MaterialButtonWithShadow from "../../components/MaterialButtonWithShadow";
import MaterialButtonWithShadow1 from "../../components/MaterialButtonWithShadow1";
import MaterialButtonViolet4 from "../../components/MaterialButtonViolet4";
import MaterialButtonWithVioletText1 from "../../components/MaterialButtonWithVioletText1";
import { HallDetailTabs } from '../../components/navigations/Navigations';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import {LocaleConfig} from 'react-native-calendars';

// LocaleConfig.locales['fr'] = {
//   monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
//   monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
//   dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
//   dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
//   today: 'Aujourd\'hui'
// };
// LocaleConfig.defaultLocale = 'pak';

function HallDetailPage(props) {
  const { data, setData } = React.useState({
    hallName: "Majestic Banquet",
    seatingCapacity: 700,
    price: "150,000 PKR",
    rating: 4.5,
    imgURL: "../../assets/images/download2.jpg"
  });

  function openCalender(){
    console.log('inside calendar'
    )
    return (
     <Calendar
      />
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
        <View style={styles.hallFromHome2Column}>
          <Text style={styles.bookingDetail}>BOOKING DETAILS</Text>
        </View>
        <Image
          source={require("../../assets/images/download2.jpg")}
          // source={{ uri: item.imgURL }}
          resizeMode="contain"
          style={styles.image2}
        ></Image>
        <HallDetailTabs />
        <Calendar
      />
        <TouchableOpacity style={styles.bookHall} onPress={openCalender}><Text style={styles.bookHall.content}>CHECK AVAILABILITY</Text></TouchableOpacity>

        <TouchableOpacity style={styles.bookHall} onPress={() => props.navigation.navigate('Booking Confirmed')}><Text style={styles.bookHall.content}>BOOK</Text></TouchableOpacity>
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
    textAlign: "center",

  },
  image2: {
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    textAlign: "center",
  },
  bookHall: {
    backgroundColor: "rgba(142,7,27,1)",
    marginLeft: 15,
    marginTop: 15,
    marginRight: 15,
    marginBottom: 15,
    content: {
      fontFamily: "roboto-regular",
      fontSize: 24,
      color: 'rgba(255,255,255,1)',
      textAlign: "center",

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
  materialButtonViolet4Stack: {
    width: 177,
    height: 55,
    marginTop: 34,
    marginLeft: 92
  },
  materialButtonWithVioletText1: {
    height: 48,
    width: 177,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    marginTop: 20,
    marginLeft: 92
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
