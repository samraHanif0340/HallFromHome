import React, { Component, useEffect } from "react";
import { StyleSheet, View, Text, StatusBar, ImageBackground, Image,Dimensions, ScrollView ,TouchableOpacity} from "react-native";
import { Divider } from 'react-native-paper';
import axios from 'axios';
import { BASE_URL } from '../../constants/constants'
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Carousel, { Pagination,ParallaxImage } from 'react-native-snap-carousel';


const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height



// import SearchBar from "react-native-dynamic-search-bar";

function DetailOfHallPage(props) {
  console.log(props)
  const [sliderActive, setSliderActive] = React.useState(SLIDER_1_FIRST_ITEM)
  const [showDetails, setShowDetails] = React.useState(false)

  const [detail, setDetail] = React.useState({});
  const [hasError, setErrorFlag] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);


const [pictures,setPictures] = React.useState([
{

"ImageURL":"https://profiles.sulekha.com/mstore/40410510/albums/default/thumbnailfull/shutterstock-1450052012-1-2.jpg",
title: 'Back View'

},
{
"ImageURL":"https://www.pchotels.com/uploads/wed-and-cel/c9a5690c1e23f1248e628bbfcabec7211564221003.jpg",
title: 'Forward View'


},
{
"ImageURL":"https://lh5.googleusercontent.com/p/AF1QipO7vBvmWcmop3O1FIdO14Y53hOovYm-JubMVQpX=w1080-k-no",
title: 'Stage Decoration'

},
{
"ImageURL":"https://www.pchotels.com/uploads/wed-and-cel/c9a5690c1e23f1248e628bbfcabec7211564221003.jpg",
title:'Tables View'
}

  ])
  const source = axios.CancelToken.source();
  const configurationObject = {
    url: `${BASE_URL}GetVenueInfo`,
    method: "POST",
    cancelToken: source.token,
    data: { venueID: props.venueID },
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

 const  _renderItemWithParallax = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
      <ParallaxImage
          source={{ uri: item.ImageURL }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.6}
          {...parallaxProps}
      />
      <Text style={styles.title} numberOfLines={2}>
          { item.title }
      </Text>
  </View>
    );
}

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <ImageBackground
        style={styles.rect1}
        imageStyle={styles.rect1_imageStyle}
        source={require("../../assets/images/Gradient_MI39RPu.png")}
      >
 <View style={styles.container}>
     <TouchableOpacity style={styles.viewWrapper} onPress={()=> setShowDetails(!showDetails)}>
       {showDetails ? <Text style={styles.viewWrapper.content}>Hide Details</Text> : <Text style={styles.viewWrapper.content}>View Details</Text>}
     </TouchableOpacity>
      <Carousel
        // ref={carouselRef}
        sliderWidth={SCREEN_WIDTH}
        sliderHeight={SCREEN_HEIGHT}
        itemWidth={SCREEN_WIDTH - 20}
        data={pictures}
        renderItem={_renderItemWithParallax}
        hasParallaxImages={true}
        onSnapToItem={(index) => setSliderActive(index)}
        
      />

      <Pagination
              dotsLength={pictures.length}
              activeDotIndex={sliderActive}
              // containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'black',
              }}
              inactiveDotStyle={
                {
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'white'
              
              }}
              inactiveDotOpacity={0.5}
              inactiveDotScale={0.7}
            />
    </View>
       { showDetails ?
      

       <View style={styles.eachItem}>
 <ScrollView >
          <View style={styles.centeredAlign}>
            <Icon style= {styles.icon} name="home" size={20}></Icon>
            <Text style={styles.centeredAlign.content}>{detail.VenueName}</Text>
            <Divider style={styles.DividerColor} />
            <Icon style= {styles.Hallicon} name="home" size={20}></Icon>
            <Text style={styles.centeredAlign.content}>{detail.VenueTypeDesc}</Text>
            <Divider style={styles.DividerColor} />
            <Icon name="map-marker-atl" size={20} color={"white"} style= {styles.mapicon}></Icon>
            <Text style={styles.centeredAlign.content}>{detail.Address}</Text>
            <Divider style={styles.DividerColor} />
            <Icon name="walking" size={20}color={"white"} style= {styles.capacityicon}></Icon> 
            <Text style={styles.centeredAlign.content}>{detail.MaxCapacity}</Text>
            <Divider style={styles.DividerColor} />
            <Text style={styles.centeredAlign.content}>Price : PKR ({detail.RentPrice})</Text>
            <Divider style={styles.DividerColor} />
            <Text style={styles.centeredAlign.content}>Rating : ({detail.Rating})</Text>
            <FontAwesomeIcon
                name="star"
                style={styles.icon6}
              ></FontAwesomeIcon>
            <Divider style={styles.DividerColor} />
            <Text style={styles.centeredAlign.content}>Provides  Catering : {detail.Catering}</Text>
            <Divider style={styles.DividerColor} />
            <Text style={styles.centeredAlign.content}>Provides Lightening : {detail.Lights}</Text>
            <Divider style={styles.DividerColor} />
            <Text style={styles.centeredAlign.content}>Provides Waiters : {detail.Waitress}</Text>
            <Divider style={styles.DividerColor} />
            <Text style={styles.centeredAlign.content}>Website: {detail.Website}</Text>
            <Divider style={styles.DividerColor} />

          </View>
          </ScrollView> 
        </View>
       
        : null }
        {/* <ParallaxScrollView
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
      )}
      >     
    </ParallaxScrollView> */}
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
  title: {
    color: 'black',
    fontFamily: 'cursive'
  },
  parallaxStyle: {
    color: "#800000",
  },
  eachItem:
  {
    flex: 1,
    height: 500,
    color: 'white',
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
      color: 'white',
      fontSize: 18,
      margin: 10,
      right:-30,
      top:-5,
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
      alignSelf:'auto',
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
  },
  icon6: {
    top: 275,
    left: 128,
    position: "absolute",
    color: "yellow",
    fontSize: 15,
    height: 20,
    width: 19
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
  capacityicon: {
    top: 185,
    left: 12,
    position: "absolute",
    color: "white",
    //fontSize: 40,
    height: 44,
    width: 40
  },
  mapicon: {
    top: 98,
    left: 12,
    position: "absolute",
    color: "white",
    //fontSize: 40,
    height: 44,
    width: 40
  },
  Hallicon: {
    top: 52,
    left: 7,
    position: "absolute",
    color: "white",
    //fontSize: 40,
    height: 44,
    width: 40
  },
  icon: {
    top: 6,
    left: 7,
    position: "absolute",
    color: "white",
    //fontSize: 40,
    height: 44,
    width: 40
  },
 
  home: {
    fontFamily: "roboto-700",
    color: "rgba(249,242,242,1)",
    fontSize: 24,
    marginLeft: 25,
    marginTop: 10
  },


  image: {
    top: 0,
    left: 0,
    width: 335,
    height: 175,
    position: "absolute",
    borderRadius: 16
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
  },
  item: {
    height: SCREEN_WIDTH - 80,
    width :SCREEN_WIDTH - 60,
    margin : 10,
    overflow: "visible",
    shadowColor: "rgba(193,166,166,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 1,
    bottom: 0,
    left: 0,
    right: 0,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
    // height: SCREEN_WIDTH - 60,
    // width: SCREEN_WIDTH - 60,
    // height: 
    // width :200,
    // heigth: 500
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'stretch',

  },
  title:{
    fontSize:24,
    fontStyle:'italic',
    color:'floralwhite',
    justifyContent:'space-around',
    alignSelf:'center',
    shadowColor: 'black',
    marginRight:20,
    marginTop: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 6,

  },
  viewWrapper:{
    backgroundColor:'floralwhite',
    borderRadius:5,
    justifyContent:'space-around',
    alignSelf:'flex-end',
    shadowColor: 'white',
    marginRight:20,
    marginTop: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 6,
    content:{
      fontSize:15,
      color: 'rgba(157,24,24,0.8)'
    }
  }
});

export default DetailOfHallPage;


