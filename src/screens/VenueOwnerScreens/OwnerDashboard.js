import React, { Component, useEffect } from "react";
import { StyleSheet, View, Dimensions, Text, Image, FlatList, SafeAreaView, TouchableOpacity, VirtualizedList, TouchableHighlight, StatusBar, ImageBackground, ScrollView } from "react-native";
import { Loader } from '../../components/customComponents/customComponents'
import { Divider, Card, Avatar, Badge } from 'react-native-elements'
import axios from 'axios';
import { BASE_URL } from '../../constants/constants'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { NavigationContainer } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Snackbar from 'react-native-snackbar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons";



export const SCREEN_WIDTH = Dimensions.get('window').width;
export const CAROUSEL_VERTICAL_OUTPUT = 56;
export const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - CAROUSEL_VERTICAL_OUTPUT;

const OwnerDashboard = (props) => {
  // const appendPayload = useStoreActions((actions) => actions.appendPayload);
  console.log('dashboard', props)
  const source = axios.CancelToken.source();
  const globalPayload = useStoreState((state) => state.payload);
  const setPayload = useStoreActions((actions) => actions.setPayload);
  const [activeTab, setActiveTab] = React.useState(0)
  const [pendingData, setpendingData] = React.useState([]);
  const [dashboardStats, setDashboardStats] = React.useState([{ id: 1, name: 'Pending', count: 0, icon: "list" }, { id: 2, name: 'Approved', count: 0, icon: "check" }, { id: 3, name: 'Rejected', count: 0, icon: "ban" }]);

  const [isLoading, setIsLoading] = React.useState(false);



  React.useEffect(() => {

    getDashboardStats()
    getData();

  }, []);

  const getData = async () => {
    const configurationObject = {
      url: `${BASE_URL}GetVenueBookingRequests`,
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
          let newArray = []
          if (response.data.Result_DTO.length > 3) {
            newArray = JSON.parse(JSON.stringify(response.data.Result_DTO.slice(0, 3)))
          }
          else {
            newArray = JSON.parse(JSON.stringify(response.data.Result_DTO))
          }
          setpendingData(newArray)

        }

      } else {
        setIsLoading(false);

        setpendingData([])
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
      console.log(error)
      setpendingData([])
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

  const getDashboardStats = async () => {
    const configurationObject = {
      url: `${BASE_URL}GetRequestStatistics`,
      method: "POST",
      cancelToken: source.token,
      data: { OwnerID: globalPayload.userId },
    };
    try {
      const response = await axios(
        configurationObject
      );
      if (response.data.ResponseCode == "00") {
        if (response.data.Result_DTO) {
          setDashboardStats(response.data.Result_DTO)

        }

      } else {
        setDashboardStats([])
      }
    } catch (error) {
      console.log(error)
      setDashboardStats([])
    }
  };


  const goToVenueListPage = () => {
    props.navigation.navigate('OwnerVenues')
  }

  const goToOwnerBookingPage = () => {
    props.navigation.navigate('OwnerBookings')
  }


  const getStatusDescription = (status) => {
    let statusDesc = 'Pending'
    let statusColor = 'primary'
    if (status == 'P') {
      statusDesc = 'Pending'
      statusColor = 'primary'
    }
    else if (status == 'A') {
      statusDesc = 'Approved'
      statusColor = 'success'

    }
    else {
      statusDesc = 'Rejected'
      statusColor = 'error'

    }

    let obj = {
      statusDecription: statusDesc,
      color: statusColor

    }

    return obj
  }

  const renderDashboardItem = ({ item }) => (
    <Card containerStyle={styles.cardChildStyle}>
      <View style={styles.requestsIcon}>
        <Icon name={item.icon} size={30} color='black' />
      </View>
      <View style={styles.requestsContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCount}>{item.count}</Text>
      </View>
    </Card>
  );


  const renderRecentBookings = ({ item }) => (
    <Card containerStyle={styles.cardStyle}>   
        <Avatar
          size={32}
          rounded
          title={item.RequestStatus.substr(0, 1).toUpperCase()}
          containerStyle={{ backgroundColor: 'coral',alignSelf:'flex-end' }} />
        <Text style={styles.venueName}> {item.VenueName}</Text>
        <Text style={styles.bookingUser}>{item.BookedByUsername} - ({item.ContactNumber})</Text>    
          <Text style={styles.eventTypesLabel}>(Date | Day | Shift)</Text>
        <Text style={styles.eventTypes}>{item.EventDate} | {item.EventDay} | {item.EventTime}</Text>
    </Card>

  )

  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading} />

      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />



      <View>
        <Card.Title style={styles.TitleStyling}> Requests And Approvals </Card.Title>
        <Card.Divider color='black' />

        <FlatList
          data={dashboardStats}
          renderItem={renderDashboardItem}
          keyExtractor={item => item.id}
          numColumns={2}

        />
      </View>
      <View>
        <Text style={styles.TitleStyling}>Recent Bookings</Text>
        <Card.Divider color='black' />
        <TouchableOpacity style={styles.viewMoreButton} onPress={() => goToOwnerBookingPage()}>
          <View style={styles.viewMoreWrapper}>
          <FontAwesomeIcon  icon={ faEye } size={ 20 } color='black' />
          <Text style={styles.viewMore} >View More</Text>
          </View>
          </TouchableOpacity>
        

        <FlatList
          keyExtractor={item => item.BookingID}
          data={pendingData}
          renderItem={renderRecentBookings}
          horizontal

        />
      </View>



      {/* <Card containerStyle={styles.cardParentStyle}>
            <Card.Title style={styles.TitleStyling}> Your Venues </Card.Title>
            <TouchableHighlight style={styles.viewMoreButton} onPress={() => goToVenueListPage()}><Text >View More</Text></TouchableHighlight>

            <Card.Divider />
            <FlatList
             key={'@'}
             keyExtractor={item => "@" + item.id}
              data={pendingData}
              renderItem={renderRecentBookings}
             horizontal
           
            />
          </Card> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardStyle: {
    flex: 1,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: 'space-between',
    shadowColor: '#000',
    height: 150,
    width: 300,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 7,
    backgroundColor: '#F5B9AF'
  },
 
  venueName:{
    fontSize:20,
    color:'black',
    fontWeight: 'bold'
  },

  bookingUser:{
    color:'black',
    fontStyle:'italic',
    fontSize:16
  },
  requestStatus:{
    fontSize:16,
    fontWeight:'bold',
    fontStyle:'italic',
    color: 'coral'
  },
  eventTypes:{
    alignSelf:'flex-end'
  },
  eventTypesLabel:{
    alignSelf:'flex-end',
    color:'black',
    fontWeight:'bold'
  },
  viewMoreWrapper:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  viewMore:{
    fontSize:16,
    marginLeft:3,
    marginRight:3,
    color:'black'

  },
  childParents: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardParentStyle: {

    justifyContent: 'space-between',
    borderRadius: 16,
    shadowColor: '#000',
    backgroundColor: '#FDE1C9',
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 7,
  },
  cardChildStyle: {
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: 9,
    borderColor: '#DD928E',
    backgroundColor: '#F5B9AF',
    shadowColor: 'rgba(157,24,24,0.8)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 7,
  },
  itemName: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',

  },
  TitleStyling: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginTop:20,
    marginBottom:4,
    alignSelf:'center',
  },
  eventDateTime: {
    fontSize: 16,
    color: '#FDE1C9',
    fontWeight: 'bold',
  },

  itemCount: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    borderRadius: 7,

  },
  requestsIcon: {
    alignSelf: 'center'
  },
  requestsContent: {
    alignItems: 'center'
  },
  viewMoreButton: {
    alignSelf: 'flex-end',
    borderColor: 'red',
    fontStyle: 'italic',
    color: 'black',
    fontWeight: 'bold'
  },
  flatListView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainView: {



  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  venueName: {
    fontSize: 12,
    fontStyle: 'italic'

  },
  middleView: {
    // flexDirection: 'row',
    // justifyContent:'space-between',
    // alignContent:'space-between'

  },
});

export default OwnerDashboard;


