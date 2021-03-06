import React, { Component,useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableHighlight,StatusBar,ImageBackground ,ScrollView} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { SearchBar, Rating } from 'react-native-elements';
import { TouchableOpacity } from "react-native";
import { Avatar, Card } from 'react-native-paper';
import {Divider} from 'react-native-elements'
import axios from 'axios';
import { BASE_URL } from '../../constants/constants'
import {
  SafeAreaView
} from 'react-native';
import Carousel from 'react-native-snap-carousel';


const LeftContent = props => <Avatar.Icon {...props} icon="account-circle-outline" />



function LodgeCamplaintListPage(props) {
  const source = axios.CancelToken.source();
const configurationObject = {
  url: `${BASE_URL}GetVenueReviews`,
  method: "POST",
  cancelToken: source.token,
  data: { venueID:props.venueID },
};
  const [filteredData, setfilteredData] = React.useState([{
    hallName: "Majestic Banquet",
    userName: 'Samra Hanif',
    review: "Nice serving as well as in budget",
    rating: 4.5,
    imgURL: "../../assets/images/download2.jpg"
  },
  {
    hallName: "Ayan Hall",
    userName: 'Muzna Akhter',
    review: "Nice serving as well as in budget, have great lightening",
    rating: 4.8,
    imgURL: "../../assets/images/download2.jpg"
  },
  {
    hallName: "Modern Banquet",
    userName: 'Muzna Akhter',
    review: "Nice serving as well as in budget, have great lightening",
    rating: 4.8,
    imgURL: "../../assets/images/download2.jpg"
  },
  {
    hallName: "Magnolia Banquet",
    userName: 'Ali Khan',
    review: "Nice serving as well as in budget, have great lightening",
    rating: 4.8,
    imgURL: "../../assets/images/download2.jpg"
  },
  {
    hallName: "Diamond Palace",
    userName: 'Humayun Mukhtar',
    review: "Nice serving as well as in budget, have great lightening",
    rating: 3.6,
    imgURL: "../../assets/images/download2.jpg"
  }]);
  const [masterData, setmasterData] = React.useState([{
    hallName: "Majestic Banquet",
    userName: 'Samra Hanif',
    review: "Nice serving as well as in budget",
    rating: 4.5,
    imgURL: "../../assets/images/download2.jpg"
  },
  {
    hallName: "Ayan Hall",
    userName: 'Muzna Akhter',
    review: "Nice serving as well as in budget, have great lightening",
    rating: 4.8,
    imgURL: "../../assets/images/download2.jpg"
  },
  {
    hallName: "Modern Banquet",
    userName: 'Muzna Akhter',
    review: "Nice serving as well as in budget, have great lightening",
    rating: 4.8,
    imgURL: "../../assets/images/download2.jpg"
  },
  {
    hallName: "Magnolia Banquet",
    userName: 'Ali Khan',
    review: "Nice serving as well as in budget, have great lightening",
    rating: 4.8,
    imgURL: "../../assets/images/download2.jpg"
  },
  {
    hallName: "Diamond Palace",
    userName: 'Humayun Mukhtar',
    review: "Nice serving as well as in budget, have great lightening",
    rating: 3.6,
    imgURL: "../../assets/images/download2.jpg"
  }]);
  let [searchText, setSearchText] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false);

  
  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await axios(
        configurationObject
      );

      if (response.data.ResponseCode == "00") {
        setIsLoading(false);
        // setmasterData(response.data.Result_DTO)
        // setfilteredData(response.data.Result_DTO)
        
        // setmasterData([{
        //   hallId:1,
        //   hallName: "Majestic Banquet",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // },
        // {
        //   hallId:2,
        //   hallName: "Ayan Banquet",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // },
        // {
        //   hallId:3,
        //   hallName: "Modern Banquet",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // },
        // {
        //   hallId:4,
        //   hallName: "Magnolia Banquet",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // },
        // {
        //   hallId:5,
        //   hallName: "Diamond Palace",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // }])
        // setfilteredData([{
        //   hallId:1,
        //   hallName: "Majestic Banquet",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // },
        // {
        //   hallId:2,
        //   hallName: "Ayan Banquet",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // },
        // {
        //   hallId:3,
        //   hallName: "Modern Banquet",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // },
        // {
        //   hallId:4,
        //   hallName: "Magnolia Banquet",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // },
        // {
        //   hallId:5,
        //   hallName: "Diamond Palace",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // }])
        return;
      } else {
        console.log(response)
        throw new Error("Failed to fetch records");
      }
    } catch (error) {
      // handle error
      if (axios.isCancel(error)) {
        console.log('Data fetching cancelled');
      } else {
        setErrorFlag(true);
        setIsLoading(false);
      }
      // alert(error.message);
    }
  };

  
useEffect(() => {
  getData();

  return () => source.cancel("Data fetching cancelled");
}, []);

  return (
    <View style={styles.container}>
       <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
            <ImageBackground style={styles.container}
                source={require("../../assets/images/Gradient_MI39RPu.png")}
            >
                
     
      <FlatList
        data={filteredData}
       horizontal
        renderItem={({ item }) => (


      
      <Card style={styles.eachCarousalItem}>
      <Card.Title titleStyle={styles.cardTitle} title={item.userName} subtitleStyle={styles.subTitle} subtitle={item.review} left={LeftContent} />
      {/* <Card.Content>
        <Title>{item.hallName}</Title>
        <Paragraph>{item.review}</Paragraph>
      </Card.Content> */}
      {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
      {/* <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions> */}
       {/* <Divider /> */}
    </Card>
   
  
        )}
        
      />
 


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
      backgroundColor: 'floralwhite',
      borderRadius: 10,
      height: 205,
      padding: 25,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 120,
  },
  subTitle: {
    fontSize: 15,
    fontStyle:'italic',
    color: 'rgba(157,24,24,0.8)'
},
  cardTitle : {
    color: 'black',
    marginLeft: -10,
    flexDirection: 'row',
    bottom:-4,
  },
  title: {
      fontSize: 12,
      fontFamily: 'cursive',
      color: 'rgba(157,24,24,0.8)'
  },
  badgeTitle: {
      paddingVertical : 5,
      height:10,
      width:100,
      left:140,
      top: -20,
    },
  subTitle: {
      fontSize: 15,
      fontStyle:'italic',
      color: 'rgba(157,24,24,0.8)'
  },
  content: {
      fontSize: 16,
      fontFamily: 'dancing-script',
  },
ComplaintStyling: 
{
  fontSize: 16,
  fontFamily: 'dancing-script',
  top:20,
},
  headingWrapper:{
      fontSize:20,
      marginTop:5,
      padding: 25,
  },
  heading:{
      fontSize:20,
      bottom: 10,
      color: 'white',
      fontWeight: 'bold',
  }

});
export default LodgeCamplaintListPage;


