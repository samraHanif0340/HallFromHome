import React, { Component,useEffect } from "react";
import { StyleSheet, View, Text,  StatusBar, ImageBackground,Image } from "react-native";
import { Divider } from 'react-native-paper';
import axios from 'axios';
import { BASE_URL } from '../../constants/constants'
import ParallaxScrollView from 'react-native-parallax-scroll-view';




// import SearchBar from "react-native-dynamic-search-bar";

function DetailOfHallPage(props) {
  console.log(props)
  const [detail, setDetail] = React.useState({});
  const [hasError, setErrorFlag] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);



  const source = axios.CancelToken.source();
  const configurationObject = {
    url: `${BASE_URL}GetVenueInfo`,
    method: "POST",
    cancelToken: source.token,
    data: { venueID:props.venueID },
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await axios(
        configurationObject
      );
      if (response.data.ResponseCode === "00") {
        setIsLoading(false);
        setDetail(response.data.Result_DTO)

        // setDetail({
        //   hallId: 1,
        //   hallName: "Saima Banquet Hall",
        //   VenueTypeDesc: 'Banquet Hall',
        //   Address:"Level 2, Saima Shopping Mall ,Shaheed Sibghatullah Shah Pagara Rd,  opposite Askari IV  Gulistan-e-Johar ,Karachi City, Sindh",
        //   CityDesc: "Karachi",
        //   MaxCapacity: 550,
        //   Lighting: "Yes",
        //   Catering: "No",
        //   Stage_Decoration: "Yes",
        //   Waitress: "Yes",
        //   Music_System: "Yes",
        //   Lights: "Yes",
        //   Air_Condition: "Yes",
        //   Parking: "Yes",
        //   Website: "https://saimabanquethall.com",
        //   Budget: "100000",
        //   Rating: "4.9",
        // }
        // )
        return;
      } else {
        // throw new Error("Failed to fetch users");
      }
    } catch (error) {
      // handle error
      if (axios.isCancel(error)) {
        // console.log('Data fetching cancelled');
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
        
    <ParallaxScrollView
      backgroundColor="orange"
      contentBackgroundColor="red"
      parallaxHeaderHeight={200}
      backgroundScrollSpeed={8}
      fadeOutForeground={true}
      contentContainerStyle={styles.parallaxStyle}
      renderForeground={() => (
       <View style={{ height: 200, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.hallFromHome2Column}>
          <Text style={styles.title}>BOOKING DETAILS</Text>
        </View>
        <Image
          source={{ uri: '../../assets/images/background-image.jpg'}}
          resizeMode="cover"
          style={styles.image2}
        >
        </Image>
        </View>
      )}
      renderContentBackground={() => (
        <View style={styles.eachItem}>
  
  <View style={styles.centeredAlign}>
    <Text style={styles.centeredAlign.content}>Hall Name: {detail.VenueName}</Text>
    <Divider style={styles.DividerColor} />
    <Text style={styles.centeredAlign.content}>Venue Type: {detail.VenueTypeDesc}</Text>
    <Divider style={styles.DividerColor} />
    <Text style={styles.centeredAlign.content}>Address: {detail.Address}</Text>
    <Divider style={styles.DividerColor} />
    <Text style={styles.centeredAlign.content}>Accommodation: {detail.MaxCapacity}</Text>
    <Divider style={styles.DividerColor} />
    <Text style={styles.centeredAlign.content}>Price : PKR ({detail.Budget})</Text>
    <Text style={styles.centeredAlign.content}>Rating : ({detail.Rating})</Text>
  
    <Text style={styles.centeredAlign.content}>Provides Catering : ({detail.Catering})</Text>
    <Text style={styles.centeredAlign.content}>Provides Lightening : {detail.Lights}</Text>
    <Text style={styles.centeredAlign.content}>Provides Waiters : {detail.Waitress}</Text>
    <Text style={styles.centeredAlign.content}>Website: {detail.Website}</Text>
  
  
  </View>
  
  </View>)}
      >     
    </ParallaxScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rect1: {
    flex: 1
  },
  DividerColor: {
    backgroundColor: 'white',
  },
  title:{
    color:'black',
    fontFamily:'cursive'
  },
  parallaxStyle:{
    color:"#800000",
  },
  eachItem:
  {
    flex: 1,
    height:500,
    color: 'black',
    margin: 15
    // backgroundColor:'yellow'
  },
  leftAlign: {
    marginLeft: 14,
    flex: 2,
    icon: {
      fontSize: 35,
      color: 'black',
    }
  },
  centeredAlign: {
    content: {
      color: 'black',
      fontSize: 18,
      margin: 10,
    },
    flex: 6,
  },
  rightAligned: {
    flex: 2,
    // flexDirection:'row',
    content: {
      color: 'black',
      fontSize: 24,

      margin: 10,
    },
    // icon:{
    //   fontSize:10,
    //   color:'yellow',
    // },
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
    // width: 335,
    // height: 175,
    // borderRadius: 16,
    // marginLeft: 2138,
    // marginTop: 117
  },
  rectRow: {
    height: 760,
    flexDirection: "row",
    flex: 1,
    marginRight: -2473
  }
});

export default DetailOfHallPage;


