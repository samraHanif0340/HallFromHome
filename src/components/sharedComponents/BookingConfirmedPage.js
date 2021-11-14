import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text,
  TextInput,TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function BookingConfirmedPage(props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />

        <ImageBackground
          style={styles.rect1}
          imageStyle={styles.rect1_imageStyle}
          source={require("../../assets/images/Gradient_MI39RPu.png")}
        >
          <Text style={styles.bookingConfirmed}>BOOKING CONFIRMED</Text>
          <Icon name="check-circle-o" style={styles.icon}></Icon>
          <TextInput
            placeholder="Venue owner will get back to you soon"
            placeholderTextColor="rgba(255,255,255,1)"
            selectionColor="rgba(255,255,255,1)"
            style={styles.textInput2}
          ></TextInput>
        </ImageBackground>
        <TextInput
          placeholder="Your booking has been confirmed successfully"
          placeholderTextColor="rgba(255,255,255,1)"
          selectionColor="rgba(255,255,255,1)"
          style={styles.textInput}
        ></TextInput>
        <TouchableOpacity style={styles.okHall} onPress={()=>props.navigation.navigate('Home')}><Text style={styles.okHall.content}>OK</Text></TouchableOpacity>

      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect1: {
 
flex:1
   
  },
  okHall:{ 
    backgroundColor: "rgba(142,7,27,1)",
    marginLeft:15,
    marginTop:15,
    marginRight:15,
    marginBottom:15,
    content:{
      fontFamily: "roboto-regular",
      fontSize:24,
      color:'rgba(255,255,255,1)',
      textAlign: "center",
     
    }
    },
  rect1_imageStyle: {},
  bookingConfirmed: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    textAlign: "left",
    width: 283,
    height: 34,
    marginTop: 60,
    marginLeft: 39
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 160,
    height: 160,
    width: 137,
    marginTop: 47,
    marginLeft: 112
  },
  textInput2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: 272,
    height: 40,
    fontSize: 15,
    marginTop: 82,
    marginLeft: 39
  },
  textInput: {
    top: 347,
    left: 39,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    width: 324,
    height: 46,
    fontSize: 15
  },
  rect1Stack: {
    width: 363,
    height: 740
  }
});

export default BookingConfirmedPage;
