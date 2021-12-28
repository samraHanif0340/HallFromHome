import React, { Component,useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableHighlight,StatusBar,ImageBackground ,ScrollView} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { SearchBar, Rating } from 'react-native-elements';
import { TouchableOpacity } from "react-native";
import { Avatar } from 'react-native-paper';
import {Divider,Card} from 'react-native-elements'
import axios from 'axios';
import { BASE_URL } from '../../constants/constants'


const LeftContent = props => <Avatar.Icon {...props} icon="account-circle-outline" />



function HallReviewsPage(props) {
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
  const [hasError, setErrorFlag] = React.useState(false);

  const searchFilterFunction = (searchText) => {
    if (searchText) {

      const newData = masterData.filter(
        function (item) {
          const itemData = item.venueName
            ? item.venueName.toUpperCase()
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

  
  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await axios(
        configurationObject
      );

      if (response.data.ResponseCode == "00") {
        setIsLoading(false);
        setmasterData(response.data.Result_DTO)
        setfilteredData(response.data.Result_DTO)
        
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
            <ImageBackground
                style={styles.rect1}
                imageStyle={styles.rect1_imageStyle}
                source={require("../../assets/images/Gradient_MI39RPu.png")}
            >
        
        <SearchBar
          lightTheme
          searchIcon={{ size: 25, color: 'white'}}
          placeholder="Search for halls reviews..."
          value={searchText}
          onChangeText={text => searchFilterFunction(text)}
          containerStyle={styles.searchBar}
          placeholderTextColor="white"
          leftIconContainerStyle={styles.searchBar.icon}
          // showLoading="true"
          inputStyle={styles.searchBar.inputStyle}
        />
     
      <FlatList
        data={filteredData}
       //horizontal
        renderItem={({ item }) => (
           <View>
             <Card containerStyle={styles.cardStyle}>
              <View style={styles.leftAlign}>
              <FontAwesomeIcon style={styles.leftAlign.icon} name="user" ></FontAwesomeIcon>
              
              </View>
               <View style={styles.centeredAlign}>
             <Card.Title style = {styles.HallNameStyle.Hallnamecontent}> {item.VenueName}</Card.Title>
             <Text style={styles.UserNameStyle.Usernamecontent}>{item.UserName}</Text>
             <Text style={styles.ReviewStyle.Reviewcontent}>{item.ReviewText}</Text>
             </View>
            

              {/* <View style={styles.leftAlign}>
              <FontAwesomeIcon style={styles.leftAlign.icon} name="user" ></FontAwesomeIcon>
              
              </View>
               <View style={styles.centeredAlign}>
               <Text style={styles.HallNameStyle.Hallnamecontent}>{item.VenueName} </Text>
              <Text style={styles.UserNameStyle.Usernamecontent}>{item.UserName}</Text>
              <Text style={styles.centeredAlign.content}>{item.ReviewText}</Text>
              
              <Divider  color="white" style={styles.DividerColor} />
               </View> */}
               
               
              
              {/* <View style={styles.rightAligned}>
              <FontAwesomeIcon style={styles.rightAligned.icon} name="star" ></FontAwesomeIcon>
              <Text style={styles.rightAligned.content}>({item.rating})</Text>
          
              </View> */}
       
              {/* <Divider  color="white" style={styles.DividerColor} /> */}
              
              </Card>
       </View>
      

      
    // {/* //   <Card style={styles.card}>
    // //   <Card.Title titleStyle={styles.cardTitle} title={item.userName} subtitle={item.review} left={LeftContent} />
    // //   {/* <Card.Content>
    // //     <Title>{item.hallName}</Title>
    // //     <Paragraph>{item.review}</Paragraph>
    // //   </Card.Content> */}
    // //   {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
    // //   {/* <Card.Actions>
    // //     <Button>Cancel</Button>
    // //     <Button>Ok</Button>
    // //   </Card.Actions> */}
    // //    <Divider /> */}

    
   
  
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
  card:{
backgroundColor: 'white'
  },
  cardTitle : {
    color: 'black',
    fontSize:20,
  },
  cardStyle:{
    // borderColor:'#800000',
    // borderWidth:3,
    borderRadius:10,
    backgroundColor:'rgba(222,206,206,1)',
    flexDirection: "row",
    shadowColor: '#000',
    height:150,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  eachItem: 
  {
    flex:1,
    flexDirection:'row',
    color:'rgba(222,206,206,1)',
    marginBottom : 10,
    marginTop:10,
    width:320,
    height:140,
    // backgroundColor:'yellow'
  },
  leftAlign:{
    marginLeft:-2,
    flex:2,
    icon:{
      fontSize:30,
      //color:'rgba(255,255,255,1)',
      color:'maroon',
      bottom:5,
    }
  },
  centeredAlign:{
    marginLeft:10,
    //marginRight:40,
    bottom:10,
    content:{
      color:'rgba(255,255,255,1)', 
    },
    flex:6,
  },
  ReviewStyle:{
    Reviewcontent:{
      //color:'rgba(255,255,255,1)', 
      color:'black',
      bottom:40,
      textAlign:'left',
      left:40,
      width:200,
      fontWeight: 'normal', 
      fontStyle: 'italic',
      fontSize: 14,
    },
    flex:6,
  },
  UserNameStyle:{
    Usernamecontent:{
      //color:'rgba(255,255,255,1)', 
      color:'black',
      bottom:40,
      textAlign:'left',
      left:40,
      fontWeight: 'normal', 
      fontStyle: 'italic',
      fontSize: 14,
    },
    flex:6,
  },
  HallNameStyle:{
    Hallnamecontent:{
      // color:'rgba(255,255,255,1)', 
      color:'black',
      fontWeight: 'bold', 
      fontSize: 17,
      left:5,
      bottom:25,
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
  DividerColor: {
    color: "white",
    borderBottomWidth: 2,
    left: -95,
    alignItems: "center",
    right: 5,
    width:390,
    bottom:20,
    top:20,
    // marginTop: 10,
    // marginBottom: 10,


  },
  searchBar:{
    backgroundColor:'rgba(142,7,27,1)',
    opacity:0.5,
    icon:{
    color:'Blue',
    },
    inputStyle:{
      color:'white',
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
  icon3: {
    color: "rgba(116,98,98,1)",
    fontSize: 23,
    height: 23,
    width: 21
  },
  loremIpsum: {
    fontFamily: "roboto-100italic",
    color: "rgba(76,70,70,1)",
    marginLeft: 13,
    marginTop: 8
  },
  icon3Row: {
    height: 24,
    flexDirection: "row",
    flex: 1,
    marginRight: 86,
    marginLeft: 8,
    marginTop: 13
  },
  icon2: {
    color: "rgba(182,10,10,1)",
    fontSize: 32,
    height: 32,
    width: 27,
    marginLeft: 14,
    marginTop: 8
  },
  rect4Row: {
    height: 48,
    flexDirection: "row",
    flex: 1,
    marginRight: 22,
    marginLeft: 12,
    marginTop: 13
  },
  rect2: {
    top: 0,
    left: 0,
    width: 360,
    height: 88,
    position: "absolute",
    backgroundColor: "rgba(136,19,19,1)",
    borderWidth: 1,
    flexDirection: "row"
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 56,
    height: 56,
    position: "absolute"
  },
  icon: {
    top: 6,
    left: 7,
    position: "absolute",
    color: "rgba(120,10,10,1)",
    fontSize: 40,
    height: 44,
    width: 40
  },
  ellipseStack: {
    width: 56,
    height: 56
  },
  home: {
    fontFamily: "roboto-700",
    color: "rgba(249,242,242,1)",
    fontSize: 24,
    marginLeft: 25,
    marginTop: 10
  },
  icon4: {
    color: "rgba(248,238,238,1)",
    fontSize: 32,
    height: 32,
    width: 32,
    marginLeft: 100,
    marginTop: 10
  },
  icon5: {
    color: "rgba(242,235,235,1)",
    fontSize: 32,
    height: 35,
    width: 32,
    marginLeft: 12,
    marginTop: 8
  },
  ellipseStackRow: {
    height: 56,
    flexDirection: "row",
    flex: 1,
    marginRight: 14,
    marginLeft: 21,
    marginTop: 15
  },
  rect3Stack: {
    height: 161,
    marginTop: 23
  },
  image: {
    top: 0,
    left: 0,
    width: 335,
    height: 175,
    position: "absolute",
    borderRadius: 16
  },
  majesticBanquet: {
    top: 173,
    left: 11,
    position: "absolute",
    fontFamily: "georgia-regular",
    color: "rgba(66,62,62,1)"
  },
  limit700Persons: {
    top: 191,
    left: 11,
    position: "absolute",
    fontFamily: "roboto-italic",
    color: "rgba(0,0,0,1)",
    fontSize: 12
  },
  imageStack: {
    top: 0,
    left: 0,
    width: 335,
    height: 207,
    position: "absolute"
  },
  loremIpsum2: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    height: 14,
    width: 119,
    textAlign: "left",
    fontSize: 11
  },
  icon6: {
    top: 11,
    left: 66,
    position: "absolute",
    color: "rgba(248,179,28,1)",
    fontSize: 20,
    height: 20,
    width: 19
  },
  loremIpsum2Stack: {
    top: 178,
    left: 210,
    width: 119,
    height: 31,
    position: "absolute"
  },
  loremIpsum3: {
    top: 192,
    left: 295,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(0,0,0,1)",
    fontSize: 12
  },
  imageStackStack: {
    width: 335,
    height: 209,
    marginTop: 11,
    marginLeft: 9
  },
  image1: {
    width: 335,
    height: 175,
    borderRadius: 16,
    marginTop: 18,
    marginLeft: 12
  },
  ayanHall: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "georgia-regular",
    color: "rgba(66,62,62,1)"
  },
  limit500Persons: {
    top: 18,
    left: 1,
    position: "absolute",
    fontFamily: "roboto-italic",
    color: "rgba(0,0,0,1)",
    fontSize: 12
  },
  ayanHallStack: {
    width: 84,
    height: 34,
    marginTop: 5
  },
  loremIpsum4: {
    fontFamily: "roboto-700",
    color: "#121212",
    height: 14,
    width: 119,
    textAlign: "left",
    fontSize: 11
  },
  icon7: {
    color: "rgba(248,179,28,1)",
    fontSize: 20,
    height: 20,
    width: 19
  },
  loremIpsum5: {
    fontFamily: "roboto-700",
    color: "rgba(0,0,0,1)",
    fontSize: 12,
    marginTop: 3
  },
  icon7Row: {
    height: 20,
    flexDirection: "row",
    marginLeft: 66,
    marginRight: 8
  },
  loremIpsum4Column: {
    width: 119,
    marginLeft: 125,
    marginBottom: 5
  },
  ayanHallStackRow: {
    height: 39,
    flexDirection: "row",
    marginTop: 6,
    marginLeft: 17,
    marginRight: 15
  },
  image2: {
    width: 335,
    height: 175,
    borderRadius: 16,
    marginLeft: 2138,
    marginTop: 117
  },
  rectRow: {
    height: 760,
    flexDirection: "row",
    flex: 1,
    marginRight: -2473
  }
});

export default HallReviewsPage;


