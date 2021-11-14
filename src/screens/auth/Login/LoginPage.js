
import React from "react";
import { View, Text, StyleSheet, StatusBar, ImageBackground, TextInput } from "react-native";
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import TextField from '../../../components/customComponents/customComponents'
import validate from '../../../shared-services/validationFunctions'
import { styles } from './LoginPage.component.style.js'

const LoginPage = ({ navigation }) => {
    return (

        <View style={styles.parentContainer}>

            <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
            <ImageBackground
                style={styles.rect1}
                imageStyle={styles.rect1_imageStyle}
                source={require("../../../assets/images/Gradient_MI39RPu.png")}
            >
                <View style={styles.logo1}>
                    <View style={styles.endWrapperFiller}></View>
                    <View style={styles.hallFromHome2Column}>
                        <Text style={styles.hallFromHome2}>Hall From Home</Text>
                        <View style={styles.rect4}></View>
                    </View>
                </View>
                <View style={styles.body}>

                    <TextField
                        placeholder="Username/Email"
                        keyboardType='email-address'
                        placeholderTextColor="rgba(255,255,255,1)"
                        nameOfIcon="user"
                        // defaultValue={this.state.userEmail}
                        maxLength={50}
                    // onChangeText={value => this.setState({
                    //     userEmail: value.trim(),
                    //     emailError: validate('userEmail', this.state.userEmail, 'email')
                    // })}
                    // error={this.state.emailError}
                    />
                    <TextField
                        placeholder='Password'
                        placeholderTextColor='rgba(255,255,255,1)'
                        secureTextEntry
                        nameOfIcon="lock"
                        // defaultValue={this.state.userPassword}
                        maxLength={50}
                    // onChangeText={value => this.setState({
                    //     userPassword: value.trim(),
                    //     passwordError: validate('userPassword', this.state.userPassword, 'password')
                    // })}
                    // error={this.state.passwordError}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                        style={styles.button2}
                    >
                        <Text style={styles.text5}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.linksStyle} onPress={() => navigation.navigate('SearchPage')} >Forgot Your Login Details?</Text>

                    <Text style={styles.linksStyle} onPress={() => navigation.navigate('Customer Registration')}>Create an account?</Text>
                </View>
            </ImageBackground>
        </View>

    );
};

export default LoginPage;