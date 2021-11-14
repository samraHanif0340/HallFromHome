import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput
} from "react-native";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import { Center } from "@builderx/utils";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

function Login(props) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.background}>
        <ImageBackground
          style={styles.rect2}
          imageStyle={styles.rect2_imageStyle}
          source={require("../assets/images/Gradient_HnOify1.png")}
        >
          <View style={styles.buttonStackStack}>
            <View style={styles.buttonStack}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Timeline")}
                style={styles.button}
              >
                <Text style={styles.text2}>Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("SearchScreenPage")}
                style={styles.button3}
              >
                <ImageBackground
                  style={styles.rect3}
                  imageStyle={styles.rect3_imageStyle}
                  source={require("../assets/images/Gradient_MI39RPu.png")}
                >
                  <View style={styles.logo1Column}>
                    <View style={styles.logo1}>
                      <View style={styles.endWrapperFiller}></View>
                      <View style={styles.hallFromHome2Column}>
                        <Text style={styles.hallFromHome2}>Hall From Home</Text>
                        <View style={styles.rect4}></View>
                      </View>
                    </View>
                    <View style={styles.form1}>
                      <View style={styles.username1Column}>
                        <View style={styles.username1}>
                          <EvilIconsIcon
                            name="user"
                            style={styles.icon2}
                          ></EvilIconsIcon>
                          <TextInput
                            placeholder="Username"
                            placeholderTextColor="rgba(255,255,255,1)"
                            secureTextEntry={false}
                            style={styles.usernameInput1}
                          ></TextInput>
                        </View>
                        <View style={styles.password1}>
                          <EvilIconsIcon
                            name="lock"
                            style={styles.icon1}
                          ></EvilIconsIcon>
                          <TextInput
                            placeholder="Password"
                            placeholderTextColor="rgba(255,255,255,1)"
                            secureTextEntry={false}
                            style={styles.passwordInput1}
                          ></TextInput>
                        </View>
                      </View>
                      <View style={styles.username1ColumnFiller}></View>
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate("Channels")}
                        style={styles.button2}
                      >
                        <Text style={styles.text5}>Login</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.logo1ColumnFiller}></View>
                  <View style={styles.footerTexts1}>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate("SignUp")}
                      style={styles.button1}
                    >
                      <View style={styles.createAccount1Filler}></View>
                      <Text style={styles.createAccount1}>Create Account</Text>
                    </TouchableOpacity>
                    <View style={styles.button1Filler}></View>
                    <Text style={styles.needHelp2}>Need Help?</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <Center horizontal>
              <Text style={styles.text4}>Terms &amp; Conditions</Text>
            </Center>
            <Center horizontal>
              <Text style={styles.success}>SUCCESS</Text>
            </Center>
            <Center horizontal>
              <FontAwesomeIcon
                name="check-circle-o"
                style={styles.icon}
              ></FontAwesomeIcon>
            </Center>
            <Text style={styles.congratulations}>
              Congratulations, your account{"\n"}has been succesfully created.
            </Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  background: {
    flex: 1
  },
  rect2: {
    flex: 1
  },
  rect2_imageStyle: {},
  button: {
    left: 40,
    height: 55,
    backgroundColor: "rgba(74,144,226,1)",
    position: "absolute",
    right: 42,
    bottom: 233,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    justifyContent: "center"
  },
  text2: {
    width: 83,
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center"
  },
  button3: {
    top: 0,
    left: 0,
    width: 360,
    height: 740,
    position: "absolute"
  },
  rect3: {
    width: 360,
    height: 740
  },
  rect3_imageStyle: {},
  logo1: {
    width: 278,
    height: 111
  },
  endWrapperFiller: {
    flex: 1
  },
  hallFromHome2: {
    color: "rgba(248,231,28,1)",
    fontSize: 50,
    width: 315,
    height: 70,
    textAlign: "center",
    fontFamily: "dancing-script-regular",
    marginBottom: 28
  },
  rect4: {
    height: 8,
    backgroundColor: "rgba(236,241,243,1)",
    marginLeft: 21,
    marginRight: 21
  },
  hallFromHome2Column: {
    marginBottom: 20,
    marginLeft: -19,
    marginRight: -18
  },
  form1: {
    height: 230,
    marginTop: 33
  },
  username1: {
    height: 59,
    backgroundColor: "rgba(251,247,247,0.25)",
    borderRadius: 5,
    flexDirection: "row"
  },
  icon2: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    marginLeft: 20,
    alignSelf: "center"
  },
  usernameInput1: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 11,
    marginLeft: 11,
    marginTop: 14
  },
  password1: {
    height: 59,
    backgroundColor: "rgba(253,251,251,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 27
  },
  icon1: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 20,
    alignSelf: "center"
  },
  passwordInput1: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 8,
    marginTop: 14
  },
  username1Column: {},
  username1ColumnFiller: {
    flex: 1
  },
  button2: {
    height: 59,
    backgroundColor: "rgba(31,178,204,1)",
    borderRadius: 5,
    justifyContent: "center"
  },
  text5: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 20,
    alignSelf: "center"
  },
  logo1Column: {
    marginTop: 130,
    marginLeft: 41,
    marginRight: 41
  },
  logo1ColumnFiller: {
    flex: 1
  },
  footerTexts1: {
    height: 14,
    flexDirection: "row",
    marginBottom: 36,
    marginLeft: 37,
    marginRight: 36
  },
  button1: {
    width: 104,
    height: 14,
    alignSelf: "flex-end"
  },
  createAccount1Filler: {
    flex: 1
  },
  createAccount1: {
    color: "rgba(0,0,0,1)"
  },
  button1Filler: {
    flex: 1,
    flexDirection: "row"
  },
  needHelp2: {
    color: "rgba(0,0,0,1)",
    alignSelf: "flex-end",
    marginRight: -1
  },
  buttonStack: {
    top: 0,
    left: 0,
    height: 740,
    position: "absolute",
    right: 0
  },
  text4: {
    color: "rgba(255,255,255,0.5)",
    position: "absolute",
    bottom: 31
  },
  success: {
    top: 244,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 30
  },
  icon: {
    top: 75,
    position: "absolute",
    color: "rgba(85,156,8,1)",
    fontSize: 160,
    height: 160,
    width: 138
  },
  congratulations: {
    left: 47,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 20,
    top: 305
  },
  buttonStackStack: {
    height: 740
  }
});

export default Login;
