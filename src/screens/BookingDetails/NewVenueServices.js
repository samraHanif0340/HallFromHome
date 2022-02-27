import React, { Component, useState ,useEffect} from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, ImageBackground, SafeAreaView, ScrollView, Image, FlatList } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { MultiLineTextInput, CheckboxField,Loader } from '../../components/customComponents/customComponents'
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
import { Checkbox } from 'react-native-paper';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const source = axios.CancelToken.source();


const NewVenueServicesPage = (props) => {

    const [additionalServices, setAdditionalServices] = React.useState({ foodService: false, CateringID: null })
    const appendPayload = useStoreActions((actions) => actions.appendPayload);
    const globalPayload = useStoreState((state) => state.payload);
    const [isLoading, setIsLoading] = React.useState(false);
      const [check1, setCheck1] = useState(false);
      const [check2, setCheck2] = useState(false);
      const [check3, setCheck3] = useState(false);
      const [check4, setCheck4] = useState(false);
      const [check5, setCheck5] = useState(false);
      const [check6, setCheck6] = useState(false);
      const [check7, setCheck7] = useState(false);
      const [check8, setCheck8] = useState(false);
      const [check9, setCheck9] = useState(false);
      const [check10, setCheck10] = useState(false);
    
     
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

    const getCateringDeals = async () => {
        console.log(globalPayload)
        let configurationObject = {
            url: `${BASE_URL}GetCateringList`,
            method: "POST",
            cancelToken: source.token,
            data: {  VenueID: globalPayload.venueId  },
          }
      try {
        setIsLoading(true);
        const response = await axios(
          configurationObject
        );
  
        if (response.data.ResponseCode == "00") {
          setIsLoading(false);
          setFoodDeals(response.data.Result_DTO)

          return;
        } else {
          setIsLoading(false);

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
        //   console.log(response)
        //   throw new Error("Failed to fetch records");
        }
      } catch (error) {
      
          setIsLoading(false);
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
      }
    };

    const onFoodServiceSelection = () => {

            const addonObject = { ...additionalServices, foodService: !additionalServices.foodService };
            setAdditionalServices(addonObject);
            appendPayload({ addons: addonObject });
            console.log(addonObject.foodService)
            if(addonObject.foodService == true || addonObject.foodService == "true"){
                getCateringDeals()

            }
            else{
                setFoodDeals([])
            }
        
    }
 
    // const _renderItemFoodService = ({ item, index }) => {
    //     return (

    //         <Card containerStyle={[styles.eachCarousalItem]}>
    //         <TouchableOpacity  onPress={() => {
    //            const addonObject = { ...additionalServices, CateringID: item.CateringID };
    //            setAdditionalServices(addonObject);
    //            appendPayload({ addons: addonObject });
    //        }}> 
    //         <View style={styles.mainView}>
    //         <Image style={styles.image} resizeMode="cover" style={{ width: 80, height: 80 }} source={{uri: item.CateringImage}} />
                  
    //               <View style={styles.middleView}>
    //               <Text style={styles.dealType}>{item.CateringName}</Text>        
    //               <FlatList scrollEnabled={false}
		// 					nestedScrollEnabled={true}
    //                         keyExtractor={item => item.ItemID}
    //                         data={item.ItemList} numColumns={2}
    //                         renderItem={({ item }) => <Text style={styles.content}>{item.ItemName} | </Text>} />
    //               </View>

    //               <Text style={styles.name}>{item.PricePerPerson} /Person</Text>

    //             </View>
                
      
    //        </TouchableOpacity> 
    //     </Card> 

           



    //     );
    // }
    return (
      
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
            <ImageBackground style={styles.container}
                source={require("../../assets/images/Gradient_MI39RPu.png")}

            >
              <View style={styles.titleWrapper}>
            <Text style={styles.title}>Venue Services</Text>
            
          </View>
        
         
          <CheckBox containerStyle = {styles.CheckboxWrapper}
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
         
          />
          <CheckBox containerStyle = {styles.CheckboxWrapper}
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
         
          />
              
              
                {/* <CheckboxField center={true} checked={additionalServices.foodService}
                    onChangeText={onFoodServiceSelection}
                    label="We have tremendous catering services available, Do you want additional food services?" /> */}


<Loader isLoading={isLoading} />

                {additionalServices.foodService ?
                    <View style={styles.headingWrapper}><Text style={styles.heading}>Please select one from the below deals</Text></View> : null}
                {additionalServices.foodService ?
                  
                        <ScrollView >
                            <FlatList

                                data={foodDeals}
                                keyExtractor={item => item.CateringID}
                                renderItem={_renderItemFoodService}

                            />
                        </ScrollView>
                    : null}
                {/* <TouchableOpacity style={styles.checkAvailability} onPress={submitAddonDetails()}><Text style={styles.checkAvailability.Availabilitycontent}>Save Add ons</Text></TouchableOpacity> */}

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        
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


