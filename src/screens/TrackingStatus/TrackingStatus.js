import React, { Component } from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableHighlight,StatusBar,ImageBackground } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { SearchBar, Rating } from 'react-native-elements';
import { TouchableOpacity } from "react-native";
import {  Button, Title, Paragraph} from 'react-native-paper';
import { Divider, Card } from "react-native-elements";
import { Avatar, Badge, withBadge } from 'react-native-elements';
// import SearchBar from "react-native-dynamic-search-bar";
import {ListItem, Icon } from 'react-native-elements'
import { BASE_URL } from '../../constants/constants'
import axios from 'axios';
import { useStoreState } from 'easy-peasy';
import Snackbar from 'react-native-snackbar';



const  TrackingStatusPage = (props) => {
  const source = axios.CancelToken.source();
  const globalPayload = useStoreState((state) => state.payload);
  const [isLoading, setIsLoading] = React.useState(false)
  const [masterData, setmasterData] = React.useState([{
    hallName: "Majestic Banquet",
    userName: 'Samra Hanif',
    pricePaid: "PKR 150000",
    status: 'Approved',
    TrackingStatus: 'success',
    setReservation: "Reserved",
    comments: 'Your venue has been booked under name Samra Hanif for 24 October 2021 timing should be 6pm - 10pm'
  },
  {
    hallName: "Modern Banquet",
    userName: 'Samra Hanif',
    pricePaid: "PKR 150000",
    status: 'Approved',
    TrackingStatus: 'success',
    setReservation: "Reserved",
    comments: 'Your venue has been booked under name\n Samra Hanif for 24 December 2021 timing should be 6pm - 10pm'
  },
  {
    hallName: "Ayan Banquet",
    userName: 'Samra Hanif',
    pricePaid: "PKR 150000",
    status: 'Approved',
    TrackingStatus: 'success',
    setReservation: "Reserved",
    comments: 'Your venue has been booked under name Samra Hanif for 24 October 2021 timing should be 6pm - 10pm'
  },
  {
    hallName: "Diamond Palace",
    userName: 'Samra Hanif',
    pricePaid: "PKR 150000",
    TrackingStatus: 'success',
    status: 'Approved',
    setReservation: "Reserved",
    comments: 'Your venue has been booked under name Samra Hanif for 24 October 2021 timing should be 6pm - 10pm'
  },
  {
    hallName: "Majestic Banquet",
    userName: 'Samra Hanif',
    pricePaid: "PKR 150000",
    TrackingStatus: 'success',
    status: 'Approved',
    setReservation: "Reserved",
    comments: 'Your venue has been booked under name Samra Hanif for 24 October 2021 timing should be 6pm - 10pm'
  }]);

  React.useEffect(() => {
    getData();

    return () => source.cancel("Data fetching cancelled");
  }, []);

  const getData = async () => {
    const configurationObject = {
      url: `${BASE_URL}GetBookingDetails`,
      method: "POST",
      cancelToken: source.token,
      data: { UserID: globalPayload.userId },
    };
    try {
      setIsLoading(true);
      const response = await axios(
        configurationObject
      );

      if (response.data.ResponseCode == "00") {
        setIsLoading(false);
        if (response.data.Result_DTO) {
          // setmasterData(response.data.Result_DTO)
        }
        return;
      } else {
        setIsLoading(false);
        // setmasterData([])
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
      console.log(error)
      // setmasterData([])
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
       <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
            <ImageBackground
                style={styles.rect1}
                imageStyle={styles.rect1_imageStyle}
                source={require("../../assets/images/Gradient_MI39RPu.png")}
            >
      
      <FlatList
        data={masterData}
        renderItem={({ item }) => (
          <Card containerStyle={styles.cardStyle}>
            <View style={styles.imageStackStack}>
            <View style={styles.imageStack}>
            <Image
                  source={require("../../assets/images/download2.jpg")}
                  style={styles.image}
                ></Image>
            <Card.Title style = {styles.cardTitle}> {item.hallName}</Card.Title>
            </View>
            <View>
            <Badge containerStyle={styles.badgeTitle} value ={item.status} status ={item.TrackingStatus}/>
            {/* <Text style={styles.statusStyle} h4>{item.status}</Text> */}
            </View>
            <View style={styles.loremIpsum2Stack}>
              <Text style={styles.cardPricePaid} h4>{item.pricePaid}</Text>
            </View>
            <View>
              <Text style={styles.commentStyle} h4>{item.comments}</Text>
            </View>
           
          </View>
          
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
    flexDirection: "column",
  },
  image: {
    // top: 0,
    right: 9,
    left: -2,
    flex: 1,
     width: 100,
    flexDirection: "column",
    height: 140,
    marginTop:-65,
    marginBottom: 3,
    borderRadius: 5,
    // marginRigth:8, 
  },
  loremIpsum2Stack: {
    top: -205,
    position: "absolute"
  },
  imageStack: {
    top: 0,
    left: -20,
    width: 310,
    height: 90,
    position: "absolute",

  },
  badgeTitle: {
    paddingVertical : 5,
    height:10,
    width:100,
    right:-70,
    top: -45,
  },
  imageStackStack: {
    width: 199,
    height: 9,
    marginTop: 60,
    marginLeft: 20,
    // marginRight: 20,

  },
  cardStyle:{
    // borderColor:'#800000',
    // borderWidth:3,
    borderRadius:10,
    flexDirection: "row",
    shadowColor: '#000',
    height:160,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  eachItem: 
  {
    flex:1,
    // flexDirection:'row',
    color:'rgba(0,0,0,1)',
    marginBottom : 10
    // backgroundColor:'yellow'
  },
  cardTitle : {
    color: 'black',
    marginLeft: 10,
    flexDirection: 'row',
    bottom: 135,
    marginBottom: -2,
    marginRight:8,
  },
  statusStyle : {
    color: 'black',
    textAlign:"left",
    marginLeft: 90,
    bottom: 45,
    width: 70,
    height:20,
  },
  DividerColor: {
    backgroundColor: 'black' ,
    borderBottomWidth: 3,
    borderRadius:10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  commentStyle : {
    color: 'black',
    fontSize: 11,
    bottom:15,
    right: -90,
    height:190,
    width:195,
    letterSpacing: 1,
    textAlign: "left",
  },
  cardPricePaid : {
    left: 220,
    color: 'black',
    fontStyle: 'italic',
    position: "absolute",
    fontFamily: "roboto-700",
    color: "black",
    height: 14,
    width: 139,
    textAlign: "left",
    fontSize: 11
  },
  leftAlign:{
    marginLeft:14,
    flex:2,
    icon:{
      fontSize:45,
      color:'rgba(255,255,255,1)',
    }
  },
  centeredAlign:{
    content:{
      color:'rgba(255,255,255,1)',   
    },
    flex:6,
  },
  rightAligned:{
    flex:2,
    flexDirection:'row',
    alignItems:'center',
    content:{
      color:'rgba(255,255,255,1)',   
    },   
    icon:{
      fontSize:10,
      color:'yellow',
    },
  },
  comments:{
      color:'rgba(255,255,255,1)'
  },
  searchBar:{
    backgroundColor:'rgba(142,7,27,1)',
    opacity:0.7,
    icon:{
      color:'black'
    },
    inputStyle:{
      color:'white'
    }
  },
  rect: {
    width: 360,
    height: 760,
    backgroundColor: "rgba(222,206,206,1)"
  },
  rect3: {
    height: 80,
    position: "absolute",
    backgroundColor: "rgba(230,230, 230,1)",
    borderRadius: 12,
    overflow: "visible",
    borderWidth: 1,
    borderColor: "rgba(87,34,34,1)",
    shadowColor: "rgba(193,166,166,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row"
  },
  rect4: {
    width: 285,
    height: 48,
    backgroundColor: "rgba(249,246,246,1)",
    borderRadius: 15,
    flexDirection: "row"
  },

 

 
});

export default TrackingStatusPage;


