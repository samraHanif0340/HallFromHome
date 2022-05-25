import React, { Component, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, ImageBackground, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import { Loader } from '../../components/customComponents/customComponents'
import { SearchBar, Rating, Card, Overlay } from 'react-native-elements';
import { RadioButton } from "react-native-paper";
import { BASE_URL } from '../../constants/constants'
import axios from 'axios';
import { useStoreActions } from 'easy-peasy';
import Snackbar from 'react-native-snackbar';
import { CalendarComponent } from "../../components/customComponents/customComponents";
import ImagedCardView from "react-native-imaged-card-view";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarDays, faFilter ,faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  Type: Yup.string('default'),
  PriceType: Yup.string('default')
  
});

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
  const [showFilterModal,setShowFilterModal] = React.useState(false)
  const [initialFormValues, setInitialFormValues] = React.useState({})
  const [paymentPayload, setPaymentPayload] = React.useState(null);

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
        setGlobalStack({ level: 0, type: 'stack', title: 'Home', navigation: props.navigation })
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
        if (response.data.Result_DTO) {
          for (let i = 0; i < response.data.Result_DTO.length; i++) {
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
        borderRadius={35}
        source={item.imageMimeType ? { uri: 'data:' + item.imageMimeType + ';base64,' + item.Image } : { uri: item.Image }}

      />
       <TouchableOpacity style={styles.setActionsStyles} onPress={() => { openCalendar(item.VenueID) }}><FontAwesomeIcon icon={faCalendarDays} size={25} color='black' /></TouchableOpacity>
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
          const textData = hasNumber.test(searchText) ? searchText : searchText.toUpperCase();
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

  const openFilters = () => {
    setShowFilterModal(true)
  }

  const applyFilters = (formData) => {
    console.log(formData)
    if (formData != null || formData != {}) {
      // saveData(formData)
      console.log('Filter Values',formData)
    }
  }

  const clearFilters = () => {
    setInitialFormValues({
      Type:'default',
      PriceType:''
    })
  }

  const applyFiltersService = async (data) => {
    let formData = Object.assign({}, data)
    let configurationObject = {
      url: `${BASE_URL}AddNewVenue`,
      method: "POST",
      cancelToken: source.token,
      // data: { ...formData, UserID: globalPayload.userId , ...globalPayload.venueAdditionPayload, ImageList:globalPayload.ImageList}
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
          text: response.data.Messages[0] ?  response.data.Messages[0] : 'Venue Request Submitted Successfully',
          duration: Snackbar.LENGTH_LONG,
        });
        
        return;
      } else {
        setIsLoading(false);
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
        if (response.data.Result_DTO) {
          let obj = {}
          // let dateArray = ['2022-05-05', '2022-05-10', '2022-05-26', '2022-05-25','2022-05-06','2022-05-10']
          let dateArray = response.data.Result_DTO
          for (let i = 0; i < dateArray.length; i++) {
            obj[dateArray[i]] = {
              disabled: true, color: 'white', disableTouchEvent: true, backgroundColor: 'red', customStyles: styles.stylesReserved
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
      <View style={styles.filters}>
        <SearchBar
          round
          lightTheme
          searchIcon={{ size: 25 }}
          placeholder="Search by venue, capacity, price..."
          value={searchText}
          onChangeText={text => searchFilterFunction(text)}
          containerStyle={styles.searchBar.container}
          placeholderTextColor="black"
          inputContainerStyle={styles.searchBar.inputContainer}
        inputStyle={styles.searchBar.input}
        leftIconContainerStyle={styles.searchBar.leftIcon}
        />
        <TouchableOpacity style={styles.searchFilterButton} onPress={() => openFilters() }><FontAwesomeIcon icon={faFilter} size={25} color='#800000' /></TouchableOpacity>
        
        {showFilterModal ? 
        <ConfirmDialog
        title="Filters"
        visible={showFilterModal}
        onTouchOutside={() => setShowFilterModal(false)}
        >
        <View>
          <ScrollView>
      
            <Formik
              initialValues={initialFormValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={(values, errors) => applyFilters(values)}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValidating }) => {

                const myChangeFunc = (key, val) => {
                  setInitialFormValues({ ...initialFormValues, [key]: val });
                  return handleChange(val)
                }

                return (
                  <View>
                    <RadioButton.Group onValueChange={value => myChangeFunc('Type',value)} value={values.Type}>
                      <RadioButton.Item label="Default (Recommended)" value="default"  color="#800000"/>
                      <RadioButton.Item label="Top Rated" value="topRated" color="#800000"/>
                      <RadioButton.Item label="Price" value="price" color="#800000"/>
                    </RadioButton.Group>
    

                   { values.Type === 'price' ? <View style={styles.priceFilterWrapper}>
                     <RadioButton.Group onValueChange={value => myChangeFunc('PriceType',value)} value={values.PriceType}>
                      <RadioButton.Item label="Default (Recommended)" value="default"  labelStyle={styles.priceFilter} color="#800000"/>
                      <RadioButton.Item label="Low to High" value="lowToHigh" labelStyle={styles.priceFilter} color="#800000"/>
                      <RadioButton.Item label="High to Low" value="highToLow"  labelStyle={styles.priceFilter} color="#800000"/>
                    </RadioButton.Group>
                    </View>
                    : null}

                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={styles.submitButtonWrapper}

                    >
                      <Text style={styles.submitButtonText}>APPLY FILTER</Text>
                      
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={clearFilters}
                      style={styles.submitButtonWrapper}

                    >
                      <Text style={styles.submitButtonText}>CLEAR FILTER</Text>
                      
                    </TouchableOpacity>

                  </View>
                )
              }}

            </Formik>
          </ScrollView>
        </View>

      </ConfirmDialog> 
      : null}   
      </View>
              <View style={styles.mapContainer}>
        <Text style={styles.mapText}>Explore Venues around you</Text>

        <Image  style={styles.mapImage} source={require('../../assets/images/maps.png')}/>
        <TouchableOpacity style={styles.mapButton}><Text style={styles.mapButton.buttonText}>Show Map<FontAwesomeIcon style={styles.mapButton.buttonIcon} icon={faArrowRight} size={20} color='#800000' /></Text></TouchableOpacity>
      
              </View>
      
      {showCalendar ? <CalendarComponent markedDates={markedDates} parentCallback={() => setShowCalendar(false)} /> : null}

      <ScrollView>
        <FlatList
          data={filteredData}
          keyExtractor={item => item.VenueID}
          renderItem={renderHallListing}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor:'white',
  },
  filters: {
    flexDirection: 'row',
    backgroundColor:'white',
    justifyContent:'space-around',
  },
  searchBar:{
    container:{
      flex: 10,
      alignSelf:'flex-start',
      alignItems:'center',
      backgroundColor:'white',
      borderColor:'white'
    },
    inputContainer:{
      backgroundColor:'#DEDDDD',
     
    },
    input:{
      fontFamily:'times new roman',
      fontSize:13,
      opacity:0.5,
      color:'black',
      fontStyle:'italic'
    },
    leftIcon:{
      color:'black',
    }
  },
  searchFilterButton: {
    flex: 2,
    textAlign:'center', 
    position:'absolute',
    top:20,
    right:20,
    borderShadow: 'white',
    elevation:7,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  priceFilterWrapper:{
   marginHorizontal:10,
   backgroundColor:'floralwhite'
  },
  priceFilter:{
    fontSize:12,
    fontFamily:'times new roman',
    fontStyle:'italic'
  },
    mapContainer:{
      flexDirection:'column',
      margin:20,
    },
    mapImage:{
      opacity:0.7,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'floralwhite',
    height: 150,
    width:350, 
    },  
    mapButton:{
      position:'absolute',
      marginVertical:125,
      marginHorizontal:10,
      alignSelf:'flex-start',
      textAlign:'center',
      borderStyle:'solid',
      borderWidth:0.5,
      borderColor:'#800000',
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
      backgroundColor: 'floralwhite',
    buttonText:{
      margin:10,
      color:'black',
      alignItems:'center',
      fontSize:16
    },
    buttonIcon:{
      textAlign:'center',
      alignItems:'center',
      color:'#800000'
    }
    // position:'absolute',
    // top:20,
    // left:22,
  },
  mapText:{
    marginHorizontal:15,
    marginVertical:5,
    color:'black',
    fontWeight:'bold',
    fontFamily:'calibiri',
  
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
  setImageStyles: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal:10,
    // backgroundColor:'floralwhite',
    // borderShadow: 'white',
    // elevation:7,
    // shadowColor: '#000',
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.5,
    // shadowRadius: 4,
    // elevation: 5,
    // height:250
  },
  setActionsStyles: {
    alignSelf: 'flex-end',
    marginRight: 22,
    marginBottom: 8 ,
    position:'absolute',
    top:15,
    right:2
  },
  cardStyle: {
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
    justifyContent: "space-between",
    backgroundColor: 'floralwhite',
  },

  contentView: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  eachRowContentOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    contentRight: {
      alignSelf: 'flex-end'
    },
    contentLeft: {
      alignSelf: 'flex-start',
      fontSize: 12,
      fontWeight: 'bold',
      color: 'black'
    }
  },

  eachRowContentTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    contentRight: {
      alignSelf: 'flex-end'
    },
    contentLeft: {
      alignSelf: 'flex-start',
      fontSize: 12,
      fontWeight: 'bold',
      color: 'black'
    }
  },

  // searchBar: {

  //   borderRadius: 6,
  //   shadowColor: '#8E4141',
  //   shadowOffset: { width: 1, height: 1 },
  //   shadowOpacity: 0.5,
  //   shadowRadius: 4,
  //   elevation: 7,
  //   icon: {
  //     color: '#726F6F'
  //   },
  //   inputStyle: {
  //     color: '#726F6F',
  //     fontWeight: 'italic'
  //   }
  // },
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


