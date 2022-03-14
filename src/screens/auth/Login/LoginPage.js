
import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, ImageBackground, Alert, ActivityIndicator } from "react-native";
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { TextField, Loader } from '../../../components/customComponents/customComponents'
import validate from '../../../shared-services/validationFunctions'
import { styles } from './LoginPage.component.style.js'
import { Image } from "react-native-elements";
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import { BASE_URL } from '../../../constants/constants'
import Toaster, { ToastStyles } from 'react-native-toaster'
import Snackbar from 'react-native-snackbar';
import { useStoreActions } from 'easy-peasy';


const LoginPage = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('hallowner@gmail.com');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [userPassword, setUserPassword] = useState('testpassword');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState(null);
    const [hasError, setErrorFlag] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const appendPayload = useStoreActions((actions) => actions.appendPayload);

    const source = axios.CancelToken.source();
    const configurationObject = {
        url: `${BASE_URL}Login`,
        method: "POST",
        cancelToken: source.token,
        data: { EmailAddress: userEmail, Password: userPassword },
    };

    const handleSubmitPress = () => {
        // navigation.replace('OwnerTabs')

        setEmailError(validate('userEmail', userEmail, 'email'))
        setPasswordError(validate('userPassword', userPassword, 'password'))
        let dataToSend = { EmailAddress: userEmail, Password: userPassword };
        // let formBody = [];
        // for (let key in dataToSend) {
        //   let encodedKey = encodeURIComponent(key);
        //   let encodedValue = encodeURIComponent(dataToSend[key]);
        //   formBody.push(encodedKey + '=' + encodedValue);
        // }
        // formBody = formBody.join('&');
        console.log(dataToSend)

        saveData(dataToSend)

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

            );
            console.log(response)
            if (response.data.ResponseCode === "00") {
                appendPayload({ userId: response.data.Result_DTO.ID, isVenueOwner: response.data.Result_DTO.IsVenueOwner  });
                setIsLoading(false);
                // setErrortext({text:'Success',styles:ToastStyles.success})
                Snackbar.show({
                    text: 'Success',
                    backgroundColor: 'black',
                    textColor: 'white',

                    duration: Snackbar.LENGTH_LONG,
                });
                //   AsyncStorage.setItem('user_id', response.data.Username);
                //   console.log(response.data.Username);
                if(response.data.Result_DTO.IsVenueOwner == true){
                    navigation.replace('OwnerTabs')
                }
                else{
                    navigation.replace('CustomerDrawerNavigation');
                }
                return;
            } else {
                setIsLoading(false);
                // setErrortext({text:response.data.ResponseDesc,styles:ToastStyles.error})
                Snackbar.show({
                    text: response.data.ResponseDesc,
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'black',
                    textColor: 'white',
                    action: {
                        text: 'OK',
                        textColor: 'white',
                        onPress: () => { /* Do something. */ },
                    },
                });
                // throw new Error("Failed to fetch users");
            }
        } catch (error) {
            setIsLoading(false);
            Snackbar.show({
                text: 'Something Went Wrong',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'black',
                textColor: 'white',
                action: {
                    text: 'OK',
                    textColor: 'white',
                    onPress: () => { /* Do something. */ },
                },
            });

        }
    };



    return (

        <View style={styles.parentContainer}>
            <Loader isLoading={isLoading} />

            <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
            <ImageBackground
                style={styles.rect1}
                imageStyle={styles.rect1_imageStyle}
                source={require("../../../assets/images/Gradient_MI39RPu.png")}
            >
                <View style={styles.logo1}>
                    <Text style={styles.hallFromHome2}>Hall From Home</Text>
                </View>
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
                    <Text style={styles.linksStyle} onPress={() => navigation.navigate('ForgotPassword')} >Forgot Your Login Details?</Text>

                    <Text style={styles.linksStyle} onPress={() => navigation.navigate('CustomerRegistration')}>Create an account?</Text>
                    {/* {errortext != null ?  <Toaster message={errortext}  /> : null} */}
                </View>
            </ImageBackground>
        </View>

    );
};

export default LoginPage;