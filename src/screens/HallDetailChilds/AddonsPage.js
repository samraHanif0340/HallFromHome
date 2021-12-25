import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, ImageBackground,SafeAreaView,Image } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { MultiLineTextInput, CheckboxField,Toaster } from '../../components/customComponents/customComponents'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import Carousel from 'react-native-snap-carousel';


const AddonsPage = (props) => {

    const [additionalServices,setAdditionalServices] = React.useState({foodService:false, foodServiceDeals:{}})
    const [foodDeals,setFoodDeals] = React.useState([{
        foodServiceId:1,
        dealType: 'Wedding Food Service',
        totalCost: 'PKR 75,000',
        uri: '../../assets/images/download2.jpg',
        menuItems: [
            'Chicken Biryani',
            'Beef Karahi',
            'One bite Samosas',
            'Salad'
        ]
    }, {
        foodServiceId:2,
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
        foodServiceId:3,
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

    const submitAddonDetails = () =>{
        console.log(additionalServices)
    }


    const _renderItemFoodService = ({ item, index }) => {
        return (
           
 <TouchableOpacity styles={styles.eachCarousalItem}  onPress={()=>setAdditionalServices({...additionalServices, foodServiceDeals: item})}>
                <Text style={styles.title}>{item.dealType}</Text>
                <FlatList
                data={item.menuItems}
                renderItem={({ item }) => <Text styles={styles.content}>{item}</Text>}/>
                <Image source={{ uri: item.uri}} />
                <Text style={styles.content}>{item.totalCost}</Text>

            </TouchableOpacity>
           
           
        );
    }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <ImageBackground style={styles.container}
        source={require("../../assets/images/Gradient_MI39RPu.png")}
      >
                        <CheckboxField center={true} checked={additionalServices.foodService} 
                        onChangeText={()=>setAdditionalServices({...additionalServices, foodService:!additionalServices.foodService})}
                        label="We have tremendous catering services available, Do you want additional food services?"/>

           {additionalServices.foodService ?     
           <View style={styles.headingWrapper}><Text style={styles.heading}>Please select atleast one</Text></View> : null}
                {additionalServices.foodService ?   
                 <SafeAreaView style={{ flex: 1, paddingTop: 10, }}>
                    <View style={styles.carouselView}>
                        <Carousel
                           layout={'stack'} layoutCardOffset={`18`}
                            //   ref={ref => carousel = ref}
                            useScrollView={true}  
                            data={foodDeals}
                            sliderWidth={300}
                            itemWidth={300}
                            renderItem={_renderItemFoodService} />
                    </View>
                </SafeAreaView> : null}
                <TouchableOpacity style={styles.checkAvailability} onPress={submitAddonDetails()}><Text style={styles.checkAvailability.Availabilitycontent}>Save Add ons</Text></TouchableOpacity>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({

 container: {
    flex: 1,
},
carouselView: {
    flex: 1, flexDirection: 'row', justifyContent: 'center',
},
eachCarousalItem: {
    backgroundColor: 'orange',
    borderRadius: 5,
    height: 225,
    padding: 25,
    marginLeft: 10,
    marginRight: 10,
},
title: {
    fontSize: 24,
    fontFamily: 'cursive',
    color: 'rgba(157,24,24,0.8)'
},
subTitle: {
    fontSize: 20,
    fontStyle:'italic',
    color: 'rgba(157,24,24,0.8)'
},
content: {
    fontSize: 16,
    fontFamily: 'dancing-script',
},
headingWrapper:{
    fontSize:20,
    marginTop:5,
    padding: 25,
},
heading:{
    fontSize:20
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

export default AddonsPage;


