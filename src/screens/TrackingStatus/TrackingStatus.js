import React, { Component } from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableHighlight,StatusBar,ImageBackground } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { SearchBar, Rating } from 'react-native-elements';
import { TouchableOpacity } from "react-native";
import {  Button, Card, Title, Paragraph,Divider } from 'react-native-paper';
// import SearchBar from "react-native-dynamic-search-bar";
import {ListItem, Icon } from 'react-native-elements'

const  TrackingStatusPage = (props) => {
  const [filteredData, setfilteredData] = React.useState([{
    hallName: "Majestic Banquet",
    userName: 'Samra Hanif',
    pricePaid: "PKR 150000",
    status: 'Approved',
    setReservation: "Reserved",
    comments: 'Your venue has been booked under name Samra Hanif for 24 October 2021 timing should be 6pm - 10pm'
  },
  {
    hallName: "Modern Banquet",
    userName: 'Samra Hanif',
    pricePaid: "PKR 150000",
    status: 'Approved',
    setReservation: "Reserved",
    comments: 'Your venue has been booked under name Samra Hanif for 24 December 2021 timing should be 6pm - 10pm'
  },
  {
    hallName: "Ayan Banquet",
    userName: 'Samra Hanif',
    pricePaid: "PKR 150000",
    status: 'Approved',
    setReservation: "Reserved",
    comments: 'Your venue has been booked under name Samra Hanif for 24 October 2021 timing should be 6pm - 10pm'
  },
  {
    hallName: "Diamond Palace",
    userName: 'Samra Hanif',
    pricePaid: "PKR 150000",
    status: 'Approved',
    setReservation: "Reserved",
    comments: 'Your venue has been booked under name Samra Hanif for 24 October 2021 timing should be 6pm - 10pm'
  },
  {
    hallName: "Majestic Banquet",
    userName: 'Samra Hanif',
    pricePaid: "PKR 150000",
    status: 'Approved',
    setReservation: "Reserved",
    comments: 'Your venue has been booked under name Samra Hanif for 24 October 2021 timing should be 6pm - 10pm'
  }]);
  const [masterData, setmasterData] = React.useState([{
    hallName: "Majestic Banquet",
    userName: 'Samra Hanif',
    pricePaid: "PKR 150000",
    status: 'Approved',
    setReservation: "Reserved",
    comments: 'Your venue has been booked under name Samra Hanif for 24 October 2021 timing should be 6pm - 10pm'
  },
  {
    hallName: "Modern Banquet",
    userName: 'Samra Hanif',
    pricePaid: "PKR 150000",
    status: 'Approved',
    setReservation: "Reserved",
    comments: 'Your venue has been booked under name Samra Hanif for 24 December 2021 timing should be 6pm - 10pm'
  },
  {
    hallName: "Ayan Banquet",
    userName: 'Samra Hanif',
    pricePaid: "PKR 150000",
    status: 'Approved',
    setReservation: "Reserved",
    comments: 'Your venue has been booked under name Samra Hanif for 24 October 2021 timing should be 6pm - 10pm'
  },
  {
    hallName: "Diamond Palace",
    userName: 'Samra Hanif',
    pricePaid: "PKR 150000",
    status: 'Approved',
    setReservation: "Reserved",
    comments: 'Your venue has been booked under name Samra Hanif for 24 October 2021 timing should be 6pm - 10pm'
  },
  {
    hallName: "Majestic Banquet",
    userName: 'Samra Hanif',
    pricePaid: "PKR 150000",
    status: 'Approved',
    setReservation: "Reserved",
    comments: 'Your venue has been booked under name Samra Hanif for 24 October 2021 timing should be 6pm - 10pm'
  }]);
  let [searchText, setSearchText] = React.useState('')

  const searchFilterFunction = (searchText) => {
    if (searchText) {

      const newData = masterData.filter(
        function (item) {
          const itemData = item.hallName
            ? item.hallName.toUpperCase()
            : ''.toUpperCase();
          const textData = searchText.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setfilteredData(newData);
      setSearchText(searchText);
    } else {
      setfilteredData(masterData);
      setSearchText(searchText);
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
        data={filteredData}
        renderItem={({ item }) => (
          // <View style={styles.eachItem}>
          //     <View style={styles.leftAlign}>
          //     <FontAwesomeIcon style={styles.leftAlign.icon} name="user" ></FontAwesomeIcon>
          //     </View>
          //      <View style={styles.centeredAlign}>
          //      <Text style={styles.centeredAlign.content}>{item.hallName}</Text>
          //     <Text style={styles.centeredAlign.content}>{item.userName}</Text>
          //     <Text style={styles.centeredAlign.content}>{item.status}</Text>
          //      </View>
              
          //     <View style={styles.rightAligned}>
              
          //     <Text style={styles.rightAligned.content}>({item.pricePaid})</Text>
          //     </View>

          //     <View >
          //         <Text style={styles.comments}>{item.comments}</Text>
          //     </View>
    
          // </View>
          <Card>
    <Card.Title titleStyle={styles.cardTitle} title={item.hallName} subtitle={item.status}/>
    <Card.Content >
      <Title style={styles.cardPricePaid}>{item.pricePaid} </Title>
      <Paragraph style={styles.commentStyle}>{item.comments}</Paragraph>
    </Card.Content>
    <Divider style={styles.DividerColor} />
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
  eachItem: 
  {
    flex:1,
    // flexDirection:'row',
    color:'rgba(0,0,0,1)',
    marginBottom : 10
    // backgroundColor:'yellow'
  },
  cardTitle : {
    color: 'black'
  },
  DividerColor: {
    backgroundColor: 'black' ,
    borderBottomWidth: 1,
  },
  commentStyle : {
    color: 'black',
    fontSize: 14,
    top: -5,
  },
  cardPricePaid : {
    color: 'black',
    fontSize: 13,
    left: 260,
    fontStyle: 'italic',
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


