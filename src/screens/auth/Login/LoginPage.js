
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import TextField from '../../../components/customComponents/customComponents'
import validate from '../../../shared-services/validationFunctions'
import {styles} from './LoginPage.component.style.js'

const LoginPage = ({ navigation }) => {
    return (
     
        <View style={styles.parentContainer}>
            <View style={styles.header}>
            <Text style={styles.headText}>Welcome To Hall from Home</Text>
            </View>
            <View style={styles.body}>
            <TextField 
                placeholder="Email"
                keyboardType='email-address'
                placeholderTextColor ='black'
                // defaultValue={this.state.userEmail}
                maxLength={50}
                // onChangeText={value => this.setState({
                //     userEmail: value.trim(),
                //     emailError: validate('userEmail', this.state.userEmail, 'email')
                // })}
                // error={this.state.emailError}
            />
            <TextField 
                // labelName='Password'
                placeholder='Password'
                placeholderTextColor ='black'
                secureTextEntry
                // defaultValue={this.state.userPassword}
                maxLength={50}
                // onChangeText={value => this.setState({
                //     userPassword: value.trim(),
                //     passwordError: validate('userPassword', this.state.userPassword, 'password')
                // })}
                // error={this.state.passwordError}
            />
        
            <TouchableHighlight style={styles.buttonField}   onPress={()=> navigation.navigate('Home')}    ><Text style={styles.buttonTextStyle}>LOGIN</Text></TouchableHighlight>

            <Text style={styles.linksStyle} onPress={() => navigation.navigate('SearchPage')} >Forgot Your Login Details?</Text>

            <Text style={styles.linksStyle} onPress={() => navigation.navigate('SignUp')}>Create an account?</Text>
            </View>
        </View>
    
    );
  };
  
  // const styles = StyleSheet.create({
  //   center: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     textAlign: "center",
  //   },
  // });
export default LoginPage;