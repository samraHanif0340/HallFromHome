import React, { Component, useState ,useEffect} from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, ImageBackground, SafeAreaView, ScrollView, Image, FlatList } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { Loader,TextField } from '../../components/customComponents/customComponents'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TouchableHighlight } from "react-native-gesture-handler";
import Carousel from 'react-native-snap-carousel';
import { Card } from 'react-native-elements'
import { useStoreActions, useStoreState } from 'easy-peasy';
import axios from 'axios';
import { BASE_URL,ERROR_MESSAGES } from '../../constants/constants'
import Snackbar from 'react-native-snackbar';
import { CheckBox, Icon } from 'react-native-elements';
// import { Checkbox } from 'react-native-paper';
// import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const source = axios.CancelToken.source();

const validationSchema = Yup.object().shape({
  Segregation: Yup.boolean(),
    Projector: Yup.boolean(),
    Stage_Decoration: Yup.boolean(),
    Waitress: Yup.boolean(),
    Wifi:Yup.boolean(),
    Music_System: Yup.boolean(),
    SpecialLights: Yup.boolean(),
    Air_Condition: Yup.boolean(),
    DJ: Yup.boolean(),
    Facebook_Page:Yup.string(),
    Website:Yup.string(),
});
const NewVenueServicesPage = (props) => {

    const globalPayload = useStoreState((state) => state.payload);
    const [isLoading, setIsLoading] = React.useState(false);
     
      
  const [initialFormValues, setInitialFormValues] = React.useState({
    Segregation: false,
    Projector:false,
    Stage_Decoration:false,
    Waitress: false,
    Wifi: false,
    Music_System: false,
    SpecialLights: false,
    Air_Condition: false,
    DJ: false,
    Website:'',
    Facebook_Page:''

  })
    
     
    console.log('Global payload was ', globalPayload);

    const [foodDeals, setFoodDeals] = React.useState([{
        CateringID: 1,
        dealType: 'Wedding Food Service',
        totalCost: 'PKR 75,000',
        url: 'https://image.freepik.com/free-photo/top-view-vegetable-soup-with-meat-inside-plate-grey_140725-36040.jpg',
        menuItems: [
            'Chicken Biryani',
            'Beef Karahi',
            'One bite Samosas',
            'Salad'
        ]
    }, {
        CateringID: 2,
        dealType: 'Engagement Food Service',
        totalCost: 'PKR 75,000',
        uri: '../../assets/images/download2.jpg',
        menuItems: [
            'Chicken Biryani',
            'Chicken Karahi',
            'One bite Samosas',
            'Salad'
        ]
    },
    {
        CateringID: 3,
        dealType: 'Mayo Food Service',
        totalCost: 'PKR 75,000',
        uri: '../../assets/images/Gradient_MI39RPu.png',
        menuItems: [
            'Haleem',
            'Beef Karahi',
            'One bite Samosas',
            'Salad'
        ]
    }])

  

    const submitForm = (formData) => {
      console.log(formData)
      if (formData != null || formData != {}) {
        saveData(formData)
        // appendPayload({ venueAdditionPayload: formData });
        // console.log('global payload in venue addition', globalPayload)
        console.log('internal Services called',formData)
      }
    }

    const saveData = async (data) => {
      let formData = Object.assign({}, data)
      console.log(globalPayload)
      console.log(formData)
  
      let configurationObject = {
        url: `${BASE_URL}AddNewVenue`,
        method: "POST",
        cancelToken: source.token,
        data: { ...formData, UserID: globalPayload.userId , ...globalPayload.venueAdditionPayload, ImageList:globalPayload.ImageList}
      }
      // navigation.navigate('BookingConfirm')
  
      console.log('in save data')
      try {
        setIsLoading(true);
        const response = await axios(
          configurationObject,
        );
        if (response.data.ResponseCode === "00") {
          setIsLoading(false);
          Snackbar.show({
            text: response.data.Messages[0] ?  response.data.Messages[0] : 'Venue Request Submitted Successfully',
            duration: Snackbar.LENGTH_LONG,
          });
          setInitialFormValues({ Segregation: false,
            Projector:false,
            Stage_Decoration:false,
            Waitress: false,
            Wifi: false,
            Music_System: false,
            SpecialLights: false,
            Air_Condition: false,
            DJ: false,
            Website:'',
            Facebook_Page:''})
            
            props.navigation.push('VenueConfirmation')
          return;
        } else {
          setIsLoading(false);
          Snackbar.show({
            text: response.data.ResponseDesc,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#B53849',
            textColor: 'black',
            action: {
              text: 'OK',
              textColor: 'black',
              onPress: () => { /* Do something. */ },
            },
          });
        }
      } catch (error) {
        setIsLoading(false);
        Snackbar.show({
          text: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#B53849',
        textColor: 'black',
        action: {
          text: 'OK',
          textColor: 'black',
          onPress: () => { /* Do something. */ },
        },
        });
  
      }
    };
    return (
      
        <View style={styles.container}>
<Loader isLoading={isLoading} />
            <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
            {/* <ImageBackground style={styles.container}
                source={require("../../assets/images/Gradient_MI39RPu.png")}

            > */}
              <View style={styles.titleWrapper}>
            <Text style={styles.title}>Venue Services</Text>
            
          </View>
          <ScrollView>
          <Formik
            initialValues={initialFormValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values, errors) => submitForm(values)}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValidating }) => {

              const myChangeFunc = (key, val) => {
                setInitialFormValues({ ...initialFormValues, [key]: val });
                return handleChange(val)
              }

              const myCheckBoxFunc = (key,val) =>{
                console.log(key,val)
                setInitialFormValues({ ...initialFormValues, [key]: val });
              }

              return (
                <View>
            
             <CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Segregation"
            textStyle = {styles.CheckBoxTextStyle}
            checked={initialFormValues.Segregation}
            checkedColor="black"
            onPress={(e) => myCheckBoxFunc('Segregation', !initialFormValues.Segregation)}
         
          />

<CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Projector"
            textStyle = {styles.CheckBoxTextStyle}
            checked={initialFormValues.Projector}
            checkedColor="black"
            onPress={(e) => myCheckBoxFunc('Projector', !initialFormValues.Projector)}
         
          />

<CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Stage Decoration"
            textStyle = {styles.CheckBoxTextStyle}
            checked={initialFormValues.Stage_Decoration}
            checkedColor="black"
            onPress={(e) => myCheckBoxFunc('Stage_Decoration', !initialFormValues.Stage_Decoration)}
         
          />


<CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Waitress"
            textStyle = {styles.CheckBoxTextStyle}
            checked={initialFormValues.Waitress}
            checkedColor="black"
            onPress={(e) => myCheckBoxFunc('Waitress', !initialFormValues.Waitress)}
         
          />

<CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Wifi"
            textStyle = {styles.CheckBoxTextStyle}
            checked={initialFormValues.Wifi}
            checkedColor="black"
            onPress={(e) => myCheckBoxFunc('Wifi', !initialFormValues.Wifi)}
         
          />

<CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Music System"
            textStyle = {styles.CheckBoxTextStyle}
            checked={initialFormValues.Music_System}
            checkedColor="black"
            onPress={(e) => myCheckBoxFunc('Music_System', !initialFormValues.Music_System)}
         
          />

<CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Special Lights"
            textStyle = {styles.CheckBoxTextStyle}
            checked={initialFormValues.SpecialLights}
            checkedColor="black"
            onPress={(e) => myCheckBoxFunc('SpecialLights', !initialFormValues.SpecialLights)}
         
          />

<CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Air Condition"
            textStyle = {styles.CheckBoxTextStyle}
            checked={initialFormValues.Air_Condition}
            checkedColor="black"
            onPress={(e) => myCheckBoxFunc('Air_Condition', !initialFormValues.Air_Condition)}
         
          />

          <CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="DJ"
            textStyle = {styles.CheckBoxTextStyle}
            checked={initialFormValues.DJ}
            checkedColor="black"
            onPress={(e) => myCheckBoxFunc('DJ', !initialFormValues.DJ)}
         
          />

                <TextField
                    placeholder="Website URL (If any)"  
                    textFieldWrapperStyle={styles.textFieldWrapper}
                    textFieldStyle={styles.textField}
                    keyboardType='default'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="credit-card"
                    maxLength={50}
                    onChangeText={(e) => { myChangeFunc('Website', e) }}
                    onBlur={handleBlur('Website')}
                    value={values.Website}
                    error={[errors.Website]}
                  />

                <TextField
                textFieldWrapperStyle={styles.textFieldWrapper}
                textFieldStyle={styles.textField}
                    placeholder="Facebook Page URL (If any)" 
                    keyboardType='default'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="credit-card"
                    maxLength={50}
                    onChangeText={(e) => { myChangeFunc('Facebook_Page', e) }}
                    onBlur={handleBlur('Facebook_Page')}
                    value={values.Facebook_Page}
                    error={[errors.Facebook_Page]}
                  />
                

          


                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.submitButtonWrapper}

                  >
                    <Text style={styles.submitButtonText} >SUBMIT</Text>
                  </TouchableOpacity>
                
                </View>
              )
            }}

          </Formik>
            </ScrollView>
   

            {/* </ImageBackground> */}
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        
    },
    titleWrapper: {
      width: 278,
      height: 111,
      alignContent: "center",
      textAlign: "center"
    },
    title: {
      color: "black",
      fontSize: 40,
      width: 335,
      height: 70,
      flex: 1,
      fontFamily: "cursive",
      marginLeft: 30,
      marginTop: 30,
      marginRight: 30,
      alignContent: "center",
      textAlign: "center",
      //fontFamily: "dancing-script-regular",
      marginBottom: 28
    },
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
    mainView: {
        flexDirection: 'row',
        marginBottom: 6,
        justifyContent:'space-between',
        
      },
      image: {
        width: 30,
        height: 30,
        marginRight: 10,
      },
      dealType: {
        fontSize: 16,
        marginTop: 5,
        color:'#800000',
        fontFamily:'cursive'

      },
      middleView:{
          flexDirection:'column'
      },
    eachCarousalItem: {
        backgroundColor: 'floralwhite',
        borderRadius: 5,
        height: 22,
        width: -20,
        padding: 25,
        marginLeft: 10,
        marginRight: 10,
        shadowColor: 'black',
       // shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 10,
        content: {
            fontSize: 20,
           // color: 'rgba(157,24,24,0.8)',
           color: 'black'         
        }       
    },
    leftAlign: {      
        backgroundColor:'purple',
        borderRadius: 7,
            shadowColor: 'black',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
            elevation: 10,
           
    },
    rightAlign: {   
      backgroundColor:'green'
    },

    subTitle: {
        fontSize: 14,
        fontStyle: 'italic',
        color: 'rgba(157,24,24,0.8)'
    },
    content: {
        fontSize: 12,
        fontFamily: 'dancing-script',
    },
    headingWrapper: {
        fontSize: 16,
        marginTop: 5,
        padding: 10,
    },
    heading: {
        color: 'black',
        backgroundColor:'black',
        fontSize: 16
    },
    CheckboxWrapper: {
      width: 350,
      borderColor:'rgba(157,24,24,0.8)',
    borderWidth:2,
      backgroundColor:'white',
      borderRadius: 5,
      alignSelf: 'flex-start',
      height: 60,
      marginRight: 20,
      marginLeft:20
    },
    CheckBoxTextStyle : {
      fontSize: 15,
      color:'#800000',
      marginLeft : 20
    },
    textFieldWrapper: {
      height: 59,
      backgroundColor: "rgba(255,255,255,1)",
      Opacity: 0.2,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: "rgba(157,24,24,0.8)",
      flexDirection: "row",
      marginRight: 22,
      marginLeft: 22,
      marginTop:5
    
  },
  textField: {
      flex: 8,
      height: 50,
      fontSize: 15,
      color: "#800000",
      marginTop: 4,
  },

    checkAvailability: {
        backgroundColor: "rgba(142,7,27,1)",
        marginLeft: 45,
        marginTop: 20,
        marginRight: 40,
        marginBottom: 15,
        width: 288,
        height: 45,
        Availabilitycontent: {
            fontFamily: "roboto-regular",
            fontSize: 20,
            flex: 1,
            marginHorizontal: 6,
            marginVertical: 6,
            color: 'rgba(255,255,255,1)',
            textAlign: "center",

        }
    },
});

export default NewVenueServicesPage;


