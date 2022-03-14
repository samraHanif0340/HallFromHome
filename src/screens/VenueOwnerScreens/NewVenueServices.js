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
import { BASE_URL } from '../../constants/constants'
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
        data: { ...formData, UserID: globalPayload.userId , ...globalPayload.venueAdditionPayload, ImageURL:globalPayload.ImageURL}
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
            text: response.data.ResponseDesc,
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
        
          navigation.navigate('VenueList')
          return;
        } else {
          setIsLoading(false);
          Snackbar.show({
            text: response.data.ResponseDesc,
            duration: Snackbar.LENGTH_LONG,
            action: {
              text: 'OK',
              textColor: 'white',
              onPress: () => { /* Do something. */ },
            },
          });
        }
      } catch (error) {
        setIsLoading(false);
        Snackbar.show({
          text: 'Something Went Wrong',
          duration: Snackbar.LENGTH_LONG,
          action: {
            text: 'OK',
            textColor: 'white',
            onPress: () => { /* Do something. */ },
          },
        });
  
      }
    };
    return (
      
        <View style={styles.container}>
<Loader isLoading={isLoading} />
            <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
            <ImageBackground style={styles.container}
                source={require("../../assets/images/Gradient_MI39RPu.png")}

            >
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
            textStyle = {{fontSize: 20}}
            checked={initialFormValues.Segregation}
            checkedColor="red"
            onPress={(e) => myCheckBoxFunc('Segregation', !initialFormValues.Segregation)}
         
          />

<CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Projector"
            textStyle = {{fontSize: 20}}
            checked={initialFormValues.Projector}
            checkedColor="red"
            onPress={(e) => myCheckBoxFunc('Projector', !initialFormValues.Projector)}
         
          />

<CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Stage Decoration"
            textStyle = {{fontSize: 20}}
            checked={initialFormValues.Stage_Decoration}
            checkedColor="red"
            onPress={(e) => myCheckBoxFunc('Stage_Decoration', !initialFormValues.Stage_Decoration)}
         
          />


<CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Waitress"
            textStyle = {{fontSize: 20}}
            checked={initialFormValues.Waitress}
            checkedColor="red"
            onPress={(e) => myCheckBoxFunc('Waitress', !initialFormValues.Waitress)}
         
          />

<CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Wifi"
            textStyle = {{fontSize: 20}}
            checked={initialFormValues.Wifi}
            checkedColor="red"
            onPress={(e) => myCheckBoxFunc('Wifi', !initialFormValues.Wifi)}
         
          />

<CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Music System"
            textStyle = {{fontSize: 20}}
            checked={initialFormValues.Music_System}
            checkedColor="red"
            onPress={(e) => myCheckBoxFunc('Music_System', !initialFormValues.Music_System)}
         
          />

<CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Special Lights"
            textStyle = {{fontSize: 20}}
            checked={initialFormValues.SpecialLights}
            checkedColor="red"
            onPress={(e) => myCheckBoxFunc('SpecialLights', !initialFormValues.SpecialLights)}
         
          />

<CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Air Condition"
            textStyle = {{fontSize: 20}}
            checked={initialFormValues.Air_Condition}
            checkedColor="red"
            onPress={(e) => myCheckBoxFunc('Air_Condition', !initialFormValues.Air_Condition)}
         
          />

<CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="DJ"
            textStyle = {{fontSize: 20}}
            checked={initialFormValues.DJ}
            checkedColor="red"
            onPress={(e) => myCheckBoxFunc('DJ', !initialFormValues.DJ)}
         
          />

<TextField
                    placeholder="Website URL (If any)" style={styles.labelText}
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
                    placeholder="Facebook Page URL (If any)" style={styles.labelText}
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
         
          {/* <CheckBox containerStyle = {styles.CheckboxWrapper}
            left         
            title="Catering"
            textStyle = {{fontSize: 20 , color: 'black'}}
            // checkedIcon={
            //   <FontAwesomeIcon icon={ faCheckSquare } color="red" opacity = {0.9} size ={ 20 } />
            // }       
            checked={check1}   
            checkedColor="red"
            onPress={() => setCheck1(!check1)}
          //  iconStyle={{ marginRight: 20 }}
         
          /> */}
          {/* <CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Stage Decoration"
            textStyle = {{fontSize: 20}}
            checked={check2}
            checkedColor="red"
            onPress={() => setCheck2(!check2)}
         
          />
           <CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Segregation"
            textStyle = {{fontSize: 20}}
            checked={check3}
            checkedColor="red"
            onPress={() => setCheck3(!check3)}
         
          />
           <CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Music System"
            textStyle = {{fontSize: 20}}
            checked={check4}
            checkedColor="red"
            onPress={() => setCheck4(!check4)}
         
          />
             <CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Valet Service"
            textStyle = {{fontSize: 20}}
            checked={check5}
            checkedColor="red"
            onPress={() => setCheck5(!check5)}
         
          />
             <CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Projector"
            textStyle = {{fontSize: 20}}
            checked={check6}
            checkedColor="red"
            onPress={() => setCheck6(!check6)}
         
          />
            <CheckBox containerStyle = {styles.CheckboxWrapper}
            left
            title="Special Lights"
            textStyle = {{fontSize: 20}}
            checked={check7}
            checkedColor="red"
            onPress={() => setCheck7(!check7)}
         
          /> */}

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        
    },
    titleWrapper: {
      width: 278,
      height: 111,
      alignContent: "center",
      textAlign: "center"
    },
    title: {
      color: "rgba(248,231,28,1)",
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
    title: {
        fontSize: 24,
        fontFamily: 'cursive',
        color: 'rgba(157,24,24,0.8)',
        alignItems: 'center',
        alignSelf: 'center'
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
        //color:'floralwhite',
        color: 'black',
        backgroundColor:'black',
        fontSize: 16
    },
    titleWrapper: {
      width: 278,
      height: 111
    },
    CheckboxWrapper: {
      width: 350,
     
      backgroundColor:'floralwhite',
      borderRadius: 5,
      alignItems:'flex-start',
      alignSelf: 'center',
      height: 50,
      
    
    },
    title: {
      color: "rgba(248,231,28,1)",
      fontSize: 40,
      width: 335,
      height: 70,
      flex: 1,
      fontFamily: "cursive",
      marginLeft: 10,
      marginTop: 30,
      alignContent: "center",
      textAlign: "center",
      //fontFamily: "dancing-script-regular",
      marginBottom: 28
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


