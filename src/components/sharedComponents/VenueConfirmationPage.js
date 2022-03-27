import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text,
  TextInput, TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function VenueConfirmationPage(props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />

      <ImageBackground
        style={styles.rect1}
        imageStyle={styles.rect1_imageStyle}
        source={require("../../assets/images/Gradient_MI39RPu.png")}
      >
        <Text style={styles.bookingConfirmed}>VENUE REQUEST SENT SUCCESSFULLY</Text>
        <Icon name="check-circle-o" style={styles.icon}></Icon>
     

      <TextInput
        placeholder="Your venue addition request has been lodged successfully"
        placeholderTextColor="rgba(255,255,255,1)"
        selectionColor="rgba(255,255,255,1)"
        style={styles.textInput}
      ></TextInput>

<TextInput
          placeholder="Admin will get back to you soon"
          placeholderTextColor="rgba(255,255,255,1)"
          selectionColor="rgba(255,255,255,1)"
          style={styles.textInput2}
        ></TextInput>
      <TouchableOpacity style={styles.submitButtonWrapper} onPress={() => props.navigation.popToTop()}><Text style={styles.submitButtonText}>OK</Text></TouchableOpacity>
      </ImageBackground>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect1: {
    flex: 1
  },
  okHall: {
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
  rect1_imageStyle: {},
  bookingConfirmed: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    textAlign: "center",
    width: 283,
    height: 100,
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
  ,
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
});

export default VenueConfirmationPage;
