import React, { Component, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, ImageBackground, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import {  Loader } from '../../components/customComponents/customComponents'
import { SearchBar, Rating, Card } from 'react-native-elements';
import { BASE_URL } from '../../constants/constants'
import axios from 'axios';
import { useStoreActions } from 'easy-peasy';
import Snackbar from 'react-native-snackbar';
import { CalendarComponent } from "../../components/customComponents/customComponents";
import ImagedCardView from "react-native-imaged-card-view";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'



var signatures = {
  JVBERi0: "application/pdf",
  R0lGODdh: "image/gif",
  R0lGODlh: "image/gif",
  iVBORw0KGgo: "image/png",
  "/9j/": "image/jpg"
};

function detectMimeType(b64) {
  for (var s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}


function SearchPage(props) {
  const setGlobalStack = useStoreActions((actions) => actions.setStackDetails);
  const appendPayload = useStoreActions((actions) => actions.appendPayload);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setErrorFlag] = React.useState(false);
  let [searchText, setSearchText] = React.useState('')
  const [filteredData, setfilteredData] = React.useState([]);
  const [masterData, setmasterData] = React.useState([]);
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [markedDates, setMarkedDates] = React.useState({})
  // setGlobalStack({level:0,type:'stack',title:'Home',navigation:props.navigation})


  const source = axios.CancelToken.source();
  const configurationObject = {
    url: `${BASE_URL}GetVenueList`,
    method: "GET",
    cancelToken: source.token
    // data: { fullName, email },
  };


  useEffect(() => {
    props.navigation.addListener('focus',
      () => {
        console.log('focus is called from SEARCH');
        setGlobalStack({level:0,type:'stack',title:'Home',navigation:props.navigation})
        //your logic here.
      }
    );
  }, [])

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await axios(
        configurationObject
      );

      if (response.data.ResponseCode == "00") {
        setIsLoading(false);
        if(response.data.Result_DTO){
          for(let i=0;i<response.data.Result_DTO.length;i++){
            let mimeType = detectMimeType(response.data.Result_DTO[i].Image)
            response.data.Result_DTO[i].imageMimeType = mimeType
          }

          setmasterData(response.data.Result_DTO)
          setfilteredData(response.data.Result_DTO)
        }
        return;
      } else {
        setmasterData([])
        setfilteredData([])
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
    } catch (error) {
      setmasterData([])
      setfilteredData([])
        setIsLoading(false);
        Snackbar.show({
          text: 'Something Went Wrong',
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

  // function User({ userObject }) {
  //   return (
  //     <View>
  //       <Image
  //         source={{ uri: userObject.avatar }}
  //         style={{ width: 128, height: 128, borderRadius: 64 }}
  //       />
  //       <Text style={{ textAlign: "center", color: "white" }}>
  //         {`${userObject.first_name} ${userObject.last_name}`}
  //       </Text>
  //     </View>
  //   );
  // }


  useEffect(() => {
    getData();

    return () => source.cancel("Data fetching cancelled");
  }, []);

  const renderHallListing = ({ item }) =>
    <View style={styles.setImageStyles}>
      <TouchableOpacity style={styles.setActionsStyles} onPress={()=>{ openCalendar(item.VenueID)}}><FontAwesomeIcon icon={faCalendarDays} size={25} color='black' /></TouchableOpacity>
      <ImagedCardView
      onPress={() => {
        appendPayload({ venueId: item.VenueID });
        props.navigation.navigate('HallDetails', { VenueID: item.VenueID })
      }}
        stars={Number(item.Rating)}
        ratings={Number(item.Rating)}
        title={item.VenueName}
        reviews={item.ReviewCount}
        titleColor='black'
        subtitleColor='grey'
        dividerColor='black'
        leftSideColor='black'
        leftSideValueColor='grey'
        rightSideColor='black'
        rightSideValueColor='grey'
        starColor='yellow'
        rightSideTitle='Price'
        rightSideValue={Number(item.RentPrice)}
        subtitle={item.VenueTypeDesc}
        leftSideTitle='Max Persons'
        leftSideValue={item.MaxCapacity}
        backgroundColor="#EADEDB"
        borderRadius={45}
        source={item.imageMimeType ? {uri:'data:' + item.imageMimeType + ';base64,'+item.Image} : {uri:item.Image}}
        
      />
    </View> 

  const searchFilterFunction = (searchText) => {
    if (searchText) {
      let hasNumber = /\d/;
      const newData = masterData.filter(
        function (item) {
          const vName = item.VenueName
            ? item.VenueName.toUpperCase()
            : ''.toUpperCase();
            const vType = item.VenueTypeDesc
            ? item.VenueTypeDesc.toUpperCase()
            : ''.toUpperCase();
            const vRent = item.RentPrice
            ? item.RentPrice
            : 0
            // const vMaxCap = item.MaxCapacity
            // ? item.MaxCapacity.toString() : "0"
            const vRating = item.Rating
            ? item.Rating
            : 0
          const textData =  hasNumber.test(searchText) ? searchText :  searchText.toUpperCase();
          return (vName.indexOf(textData) > -1 
          || vType.indexOf(textData) > -1 || 
          vRent.indexOf(textData) > -1
          )
        });
      setfilteredData(newData);
      setSearchText(searchText);
    } else {
      setfilteredData(masterData);
      setSearchText(searchText);
    }
  };

  const openCalendar = (venueId) => {
    console.log(venueId)
    setShowCalendar(true)
    getReservedDates(venueId)
  }

  const getReservedDates = async (venueID) => {
    let payload = {
      VenueID: venueID
    }
    let configurationObject = {
      url: `${BASE_URL}GetEventBookedDatesByVenue`,
      method: "POST",
      cancelToken: source.token,
      data: payload,
    }
    try {
      const response = await axios(
        configurationObject,
      );
      if (response.data.ResponseCode === "00") {
        if(response.data.Result_DTO){
          let obj = {}
          // let dateArray = ['2022-05-05', '2022-05-10', '2022-05-26', '2022-05-25','2022-05-06','2022-05-10']
          let dateArray = response.data.Result_DTO
          for(let i=0;i<dateArray.length;i++){
            obj[dateArray[i]] = {
              disabled: true, color: 'white', disableTouchEvent: true,backgroundColor:'red' ,customStyles:styles.stylesReserved
            }
          }
          setMarkedDates(obj)
        }
        return;
      } else {
        setMarkedDates([])
      }
    } catch (error) {
      setMarkedDates([])
    }
  };

  return (
    <View style={styles.container}>
     <Loader isLoading={isLoading} />

      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />


        <SearchBar
          darkTheme
          searchIcon={{ size: 25 }}
          placeholder="Search by venue, capacity, price..."
          value={searchText}
          onChangeText={text => searchFilterFunction(text)}
          // containerStyle={styles.searchBar}
          placeholderTextColor="#726F6F"
          // leftIconContainerStyle={styles.searchBar.icon}
          // showLoading="true"
          // inputStyle={styles.searchBar.inputStyle}
        />
              {showCalendar ? <CalendarComponent markedDates={markedDates} parentCallback={()=>setShowCalendar(false)} /> : null}

        <ScrollView>
        <FlatList

          data={filteredData}
          keyExtractor={item => item.VenueID}
          renderItem={renderHallListing}
        />
{/* {({ item }) => (
            <Card containerStyle={styles.cardStyle}>
              <TouchableHighlight onPress={()=>{ openCalendar(item.VenueID)}}><Text>View Calendar</Text></TouchableHighlight>

              <TouchableOpacity activeOpacity={0.2} onPress={() => {
                appendPayload({ venueId: item.VenueID });
                props.navigation.navigate('HallDetails', { VenueID: item.VenueID })
              }}>
                <Image
                source={item.imageMimeType ? {uri:'data:' + item.imageMimeType + ';base64,'+item.Image} : {uri:item.Image}}
                  resizeMode="stretch"
                  style={styles.image}
                ></Image>
              <View style={styles.contentView}>
                <View style={styles.eachRowContentOne}>
                <Text style={styles.eachRowContentOne.contentLeft}>{item.VenueName} ({item.VenueTypeDesc})</Text>
                </View>            
                <View style={styles.eachRowContentTwo}>
                <Text >Limit {item.MaxCapacity} Persons</Text>
                <Text >PKR {item.RentPrice}</Text>
               <Rating style={styles.eachRowContentTwo.contentRight}
            type="star"
            fractions={1}
            startingValue={item.Rating}         
            imageSize={12}        
          />
                </View>
              </View>
              </TouchableOpacity>
            </Card>
          )} */}
</ScrollView>
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent:'space-between'

  },
  setImageStyles:{
    marginTop:10,
    marginBottom:10,
  },
  setActionsStyles:{
    alignSelf:'flex-end',
    marginRight:22,
    marginBottom:8
  },
  cardStyle: {
    // borderColor:'#800000',
    // borderWidth:3,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    flexDirection:'column',
    justifyContent:"space-between",
    backgroundColor:'rgba(222,206,206,1)', 
  },

  contentView:{
    flexDirection:'column',
    justifyContent:'space-around'
  },
  eachRowContentOne:{
    flexDirection:'row',
    justifyContent:'space-between',  
    contentRight:{
      alignSelf:'flex-end'
    },
    contentLeft:{
      alignSelf:'flex-start',
      fontSize:12,
      fontWeight:'bold',
      color:'black'
    }
  },

  eachRowContentTwo:{
    flexDirection:'row',
    justifyContent:'space-between',  
    contentRight:{
      alignSelf:'flex-end'
    },
    contentLeft:{
      alignSelf:'flex-start',
      fontSize:12,
      fontWeight:'bold',
      color:'black'
    }
  },

  searchBar: {
    // backgroundColor: '#800000',
    // opacity: 1,
    // borderColor: '#800000',
    // borderWidth: 3,
    borderRadius: 6,
    shadowColor: '#8E4141',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 7,
    icon: {
      color: '#726F6F'
    },
    inputStyle: {
      color: '#726F6F',
      fontWeight:'italic'
    }
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
  stylesReserved: {
    container: {
      backgroundColor: 'red'
    },
    text: {
      color: 'black',
      fontWeight: 'bold'
    }
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
    width: 350,
    height: 200,
    borderRadius: 5
  },
  majesticBanquet: {
    top: 173,
    // left: -11,
    fontSize: 15,
    fontWeight: 'bold',
    position: "absolute",
    fontFamily: "georgia-regular",
    color: "black"
  },
  limit700Persons: {
    top: 191,
    // left: -11,
    position: "absolute",
    fontFamily: "roboto-italic",
    color: "black",
    fontSize: 11
  },
  imageStack: {
    top: 0,
    // left: 0,
    width: 344,
    height: 207,
    position: "absolute",

  },
  loremIpsum2: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "black",
    height: 14,
    width: 139,
    textAlign: "left",
    fontSize: 11
  },
  icon6: {
    top: 15,
    // left: 18,
    position: "absolute",
    color: "rgba(248,179,28,1)",
    fontSize: 15,
    height: 20,
    width: 19
  },
  loremIpsum2Stack: {
    top: 178,
    left: 260,
    width: 109,
    height: 20,
    position: "absolute"
  },
  loremIpsum3: {
    top: 192,
    left: 297,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "black",
    fontSize: 11
  },
  imageStackStack: {
    width: 499,
    height: 209,
    // marginTop: 11,
    // marginLeft: 20,
    // marginRight: 20,

  },
 
  limit500Persons: {
    top: 18,
    left: 1,
    position: "absolute",
    fontFamily: "roboto-italic",
    color: "rgba(0,0,0,1)",
    fontSize: 12
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

export default SearchPage;


