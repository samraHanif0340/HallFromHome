
import React from "react";
import { View, Text, StyleSheet, StatusBar, ImageBackground, TextInput } from "react-native";
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import TextField from '../../../components/customComponents/customComponents'
import validate from '../../../shared-services/validationFunctions'
import { styles } from './RegistrationPage.component.style'

const RegistrationPage = ({ navigation }) => {
    return (

        <View style={styles.parentContainer}>
            <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
            <ImageBackground
                style={styles.rect1}
                imageStyle={styles.rect1_imageStyle}
                source={require("../../../assets/images/Gradient_MI39RPu.png")}
            >
                <View style={styles.logo1}>
                    <View style={styles.hallFromHome2Column}>
                        <Text style={styles.createAccount1}>CREATE ACCOUNT</Text>
                    </View>
                </View>
                <View style={styles.body}>

                    <TextField
                        placeholder="Name"
                        keyboardType='default'
                        placeholderTextColor="rgba(255,255,255,1)"
                        nameOfIcon="user"
                        // defaultValue={this.state.userEmail}
                        maxLength={50}
                    />
                     <TextField
                        placeholder="Username"
                        keyboardType='default'
                        placeholderTextColor="rgba(255,255,255,1)"
                        nameOfIcon="user"
                        // defaultValue={this.state.userEmail}
                        maxLength={50}
                    />
                     <TextField
                        placeholder="Email"
                        keyboardType='email-address'
                        placeholderTextColor="rgba(255,255,255,1)"
                        nameOfIcon="user"
                        // defaultValue={this.state.userEmail}
                        maxLength={50}
                    />
                    <TextField
                        placeholder='Password'
                        placeholderTextColor='rgba(255,255,255,1)'
                        nameOfIcon="lock"
                        maxLength={50}
                    />
                   
                    <TextField
                        placeholder="Mobile Number"
                        keyboardType='email-address'
                        placeholderTextColor="rgba(255,255,255,1)"
                        nameOfIcon="user"
                        // defaultValue={this.state.userEmail}
                        maxLength={50}
                    />     
                    <View style={styles.button1Column}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Login")
                    }
                    style={styles.button1}
                  >
                    <Text style={styles.text5}>Continue</Text>
                  </TouchableOpacity>
                  <Text style={styles.termsConditions}>
                    Terms &amp; Conditions
                  </Text>
                </View>       
                    {/* <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={styles.button2}
                    >
                        <Text style={styles.text5}>Continue</Text>
                    </TouchableOpacity> */}
                </View>
            </ImageBackground>
        </View>

    );
};

export default RegistrationPage;