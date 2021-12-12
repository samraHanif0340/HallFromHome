
import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, ImageBackground } from "react-native";
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { TextField } from '../../../components/customComponents/customComponents'
import validate from '../../../shared-services/validationFunctions'
import { styles } from './LoginPage.component.style.js'
import { Image } from "react-native-elements";
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import { BASE_URL } from '../../../constants/constatnts'

const LoginPage = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [hasError, setErrorFlag] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false)
    const source = axios.CancelToken.source();
    const configurationObject = {
        url: `${BASE_URL}posts`,
        method: "POST",
        cancelToken: source.token
        // data: { fullName, email },
    };

    const handleSubmitPress = () => {
        setEmailError(validate('userEmail', userEmail, 'email'))
        setPasswordError(validate('userPassword', userPassword, 'password'))
        let dataToSend = { Username: userEmail, Password: userPassword };
        // let formBody = [];
        // for (let key in dataToSend) {
        //   let encodedKey = encodeURIComponent(key);
        //   let encodedValue = encodeURIComponent(dataToSend[key]);
        //   formBody.push(encodedKey + '=' + encodedValue);
        // }
        // formBody = formBody.join('&');
        console.log(dataToSend)
        navigation.replace('Home');

        if (dataToSend.Username == 'samra.hanif@yahoo.com' && dataToSend.Password == 'admin12345') {
            alert('LOGIN SUCCESSFUL')
            saveData(dataToSend)
        }
        else {
            alert('INCORRECT EMAIL OR PASSWORD')
        }



        // fetch('http://localhost:3000/api/user/login', {
        //   method: 'POST',
        //   body: formBody,
        //   headers: {
        //     'Content-Type':
        //     'application/x-www-form-urlencoded;charset=UTF-8',
        //   },
        // })
        //   .then((response) => response.json())
        //   .then((responseJson) => {
        //     setLoading(false);
        //     console.log(responseJson);
        //     if (responseJson.status === 'success') {
        //       AsyncStorage.setItem('user_id', responseJson.data.email);
        //       console.log(responseJson.data.email);
        //       navigation.replace('DrawerNavigationRoutes');
        //     } else {
        //       setErrortext(responseJson.msg);
        //       console.log('Please check your email id or password');
        //     }
        //   })
        //   .catch((error) => {
        //     setLoading(false);
        //     console.error(error);
        //   });
    };

    const saveData = async (data) => {
        try {
            setIsLoading(true);
            const response = await axios(
                configurationObject,
                data
            );
            if (response.status === 200) {
                setIsLoading(false);
                //   AsyncStorage.setItem('user_id', response.data.Username);
                //   console.log(response.data.Username);
                navigation.replace('Home');
                return;
            } else {
                throw new Error("Failed to fetch users");
            }
        } catch (error) {
            // handle error
            if (axios.isCancel(error)) {
                console.log('Data fetching cancelled');
            } else {
                setErrorFlag(true);
                setIsLoading(false);
            }
            alert(error.message);
        }
    };



    return (

        <View style={styles.parentContainer}>

            <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
            <ImageBackground
                style={styles.rect1}
                imageStyle={styles.rect1_imageStyle}
                source={require("../../../assets/images/Gradient_MI39RPu.png")}
            >
                <View style={styles.logo1}>
                    {/* <View style={styles.endWrapperFiller}></View> */}
                    {/* <View style={styles.hallFromHome2Column}> */}
                    <Text style={styles.hallFromHome2}>Hall From Home</Text>

                    {/* <View style={styles.rect4}></View> */}
                    {/* </View> */}
                </View>
                {/* <Image
                    source={{ uri: "../../../assets/images/download2.jpg" }}
                    // source={require("../../assets/hallFromHomeLogo.png")}
                    style={styles.logo}
                    resizeMode="stretch"
                />  */}

                <View style={styles.body}>
                    <TextField
                        placeholder="Username/Email" style={styles.labelText}
                        keyboardType='email-address'
                        mode="outlined"
                        placeholderTextColor="#800000"
                        //left={<TextInput.Icon nameOfIcon="user" />}
                        nameOfIcon="user"
                        defaultValue={userEmail}
                        maxLength={50}
                        // onSubmitEditing={() =>
                        //     passwordInputRef.current &&
                        //     passwordInputRef.current.focus()
                        //   }
                        onChangeText={value => {
                            setUserEmail(value.trim()),
                                setEmailError(validate('userEmail', userEmail, 'email'))
                        }}
                        error={emailError}
                    />
                    <TextField
                        placeholder='Password' style={styles.labelText}
                        placeholderTextColor="#800000"
                        secureTextEntry
                        nameOfIcon="lock"
                        defaultValue={userPassword}
                        maxLength={50}
                        onChangeText={value => {
                            setUserPassword(value.trim()),
                                setPasswordError(validate('userPassword', userPassword, 'password'))
                        }}
                        error={passwordError}
                        // ref={passwordInputRef}
                        // onSubmitEditing={Keyboard.dismiss}
                        returnKeyType="next"
                    />
                    <TouchableOpacity
                        onPress={handleSubmitPress}
                        style={styles.button2}
                    >
                        <Text style={styles.text5}>LOGIN</Text>
                    </TouchableOpacity>
                    <Text style={styles.linksStyle} onPress={() => navigation.navigate('Customer Registration')} >Forgot Your Login Details?</Text>

                    <Text style={styles.linksStyle} onPress={() => navigation.navigate('Customer Registration')}>Create an account?</Text>
                </View>
            </ImageBackground>
        </View>

    );
};

export default LoginPage;