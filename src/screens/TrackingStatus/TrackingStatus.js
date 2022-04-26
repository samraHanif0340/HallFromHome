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
      data: { UserID: 0 , OwnerID:8},
    };
    try {
      setIsLoading(true);
      const response = await axios(
        configurationObject
      );

      if (response.data.ResponseCode == "00") {
        setIsLoading(false);
        if (response.data.Result_DTO) {
          setmasterData(response.data.Result_DTO)
        }
        return;
      } else {
        setIsLoading(false);
        setmasterData([])
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
      setmasterData([])
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

  const renderBookings = ({ item }) =>
  <Card containerStyle={styles.cardStyle}>
    {item.RequestStatus ? <Avatar
      size={32}
      rounded
      title={item.RequestStatus.substr(0, 1).toUpperCase()}
      containerStyle={{ backgroundColor: 'blue', alignSelf: 'flex-start' }} /> : null }
    <Text style={styles.venueName}> {item.VenueName}</Text>
    {item.RequestStatus == 'Approved' ? 
    <View>
    <Text style={styles.eventTypesLabel}>(Advance Payment | Deadline)</Text>

    <Text style={styles.bookingUser}>{item.AdvancePaymentDeadlineDate} - ({item.AdvancePaymentDeadlineTime})</Text>
    </View> : null }
    <View>
      <Text style={styles.requestStatus}>({item.RequestStatus})</Text>
      <Text style={styles.eventTypesLabel}>(Date | Day | Shift)</Text>
    </View>

    <Text style={styles.eventTypes}>{item.EventDate} | {item.EventDay} | {item.EventTime}</Text>

    <View>
      <Text>{item.Comment}</Text>
    </View>

    {/* <View style={styles.approvRejButton}>
      {!item.RequestStatus || item.RequestStatus == 'Pending' ? <TouchableOpacity style={{ marginRight: 4 }} onPress={() => confirmApproveRejectBooking(item, 'A')}><FontAwesomeIcon icon={faShare} size={20} color='black' /></TouchableOpacity> : null}
      {!item.RequestStatus || item.RequestStatus == 'Pending' ? <TouchableOpacity style={{ marginRight: 4 }} onPress={() => confirmPayment(item, 'C')} ><FontAwesomeIcon icon={faCircleCheck} size={20} color='black' /></TouchableOpacity> : null}
      {!item.RequestStatus || item.RequestStatus == 'Pending' ? <TouchableOpacity style={{ marginRight: 4 }} onPress={() => confirmApproveRejectBooking(item, 'R')} ><FontAwesomeIcon icon={faBan} size={20} color='black' /></TouchableOpacity> : null}

    </View> */}
  </Card>
 
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
        keyExtractor={item => item.BookingID}
        renderItem={renderBookings}
        // renderItem={({ item }) => (
        //   <Card containerStyle={styles.cardStyle}>
        //     <View style={styles.imageStackStack}>
        //     <View style={styles.imageStack}>
        //     <Card.Title style = {styles.cardTitle}> {item.VenueName}</Card.Title>
        //     </View>
        //     <View>
        //     <Badge containerStyle={styles.badgeTitle} value ={item.RequestStatus} status ='primary'/>
        //     </View>
        //     <View style={styles.loremIpsum2Stack}>
        //       <Text style={styles.cardPricePaid} h4>{item.AdvancePayment}</Text>
        //       <Text>{item.AdvancePaymentDeadlineDate} | {item.AdvancePaymentDeadlineTime}</Text>
        //     </View>
        //     <View>
        //       <Text style={styles.commentStyle} h4>{item.Comment}</Text>
        //     </View>
           
        //   </View>
          
        // </Card>
        // )}
      />

</ImageBackground>
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
    shadowColor: 'black',
    height: 160,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#EADEDB'

  },
  approvRejButton: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'flex-end',
  },
  venueName: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold'
  },

  bookingUser: {
    color: 'grey',
    fontStyle: 'italic',
    fontSize: 16

  },
  requestStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'orange'
  },
  eventTypes: {
    alignSelf: 'flex-end'
  },
  eventTypesLabel: {
    alignSelf: 'flex-end',
    color: 'black',
    fontWeight: 'bold'
  },

 

 
});

export default TrackingStatusPage;


