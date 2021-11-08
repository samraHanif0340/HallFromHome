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

function HallDetailPage(props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <View style={styles.button2StackRow}>
        <View style={styles.button2Stack}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Hall Details")
            }
            style={styles.button2}
          ></TouchableOpacity>
          <ImageBackground
            style={styles.rect}
            imageStyle={styles.rect_imageStyle}
            source={require("../../assets/images/Gradient_MI39RPu.png")}
          >
            <Text style={styles.bookingDetail}>BOOKING DETAIL</Text>
            <ImageBackground
              source={require("../../assets/images/download2.jpg")}
              resizeMode="contain"
              style={styles.image1}
              imageStyle={styles.image1_imageStyle}
            >
              <Image
                source={require("../../assets/images/download2.jpg")}
                resizeMode="contain"
                style={styles.image2}
              ></Image>
            </ImageBackground>
            <View style={styles.materialButtonViolet2StackRow}>
              <View style={styles.materialButtonViolet2Stack}>
                <MaterialButtonViolet2
                  style={styles.materialButtonViolet2}
                ></MaterialButtonViolet2>
                <MaterialButtonViolet2
                  style={styles.materialButtonViolet4}
                ></MaterialButtonViolet2>
                <Text style={styles.loremIpsum}></Text>
              </View>
              <View style={styles.materialButtonWithShadowStack}>
                <MaterialButtonWithShadow
                  style={styles.materialButtonWithShadow}
                ></MaterialButtonWithShadow>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Hall Details")}
                  style={styles.button4}
                ></TouchableOpacity>
              </View>
              <MaterialButtonWithShadow1
                style={styles.materialButtonWithShadow1}
              ></MaterialButtonWithShadow1>
            </View>
            <TextInput
              placeholder="Name:   ABC Lawn"
              placeholderTextColor="rgba(255,255,255,1)"
              selectionColor="rgba(255,255,255,1)"
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Capacity:  500"
              placeholderTextColor="rgba(255,255,255,1)"
              selectionColor="rgba(255,255,255,1)"
              style={styles.textInput2}
            ></TextInput>
            <TextInput
              placeholder="Budget:  1Lakh 50 Thousand"
              placeholderTextColor="rgba(255,255,255,1)"
              selectionColor="rgba(255,255,255,1)"
              style={styles.textInput3}
            ></TextInput>
            <TextInput
              placeholder="Lightening:  Available"
              placeholderTextColor="rgba(255,255,255,1)"
              selectionColor="rgba(255,255,255,1)"
              style={styles.textInput4}
            ></TextInput>
            <View style={styles.materialButtonViolet4Stack}>
              <MaterialButtonViolet4
                style={styles.materialButtonViolet4}
              ></MaterialButtonViolet4>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Hall Details")
                }
                style={styles.button3}
              ></TouchableOpacity>
            </View>
            <MaterialButtonWithVioletText1
              style={styles.materialButtonWithVioletText1}
            ></MaterialButtonWithVioletText1>
          </ImageBackground>
        </View>
        <Text style={styles.bookingDetail2}>BOOKING DETAIL</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column"
  },
  button2: {
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
  bookingDetail: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    marginTop: 56,
    marginLeft: 77
  },
  image1: {
    width: 335,
    height: 175,
    borderRadius: 16,
    marginTop: 28,
    marginLeft: 13,
    overflow: "hidden"
  },
  image1_imageStyle: {},
  image2: {
    width: 335,
    height: 175,
    borderRadius: 16
  },
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
