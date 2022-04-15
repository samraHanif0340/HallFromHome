import React, { Component } from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableHighlight,StatusBar,ImageBackground } from "react-native";
import { SearchBar, Rating } from 'react-native-elements';
import { TouchableOpacity } from "react-native";
import {  Button, Title, Paragraph} from 'react-native-paper';
import { Divider, Card } from "react-native-elements";
import { Avatar, Badge, withBadge } from 'react-native-elements';
import { Loader } from '../../components/customComponents/customComponents'
// import SearchBar from "react-native-dynamic-search-bar";
import {ListItem, Icon } from 'react-native-elements'
import { BASE_URL } from '../../constants/constants'
import axios from 'axios';
import { useStoreState } from 'easy-peasy';
import Snackbar from 'react-native-snackbar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckSquare,faCircleCheck,faCircleStop,faBan, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { ConfirmDialog } from 'react-native-simple-dialogs';
import validate from '../../shared-services/validationFunctions'
import { TextField } from '../../components/customComponents/customComponents'





const  OwnerBookingPage = (props) => {
  const source = axios.CancelToken.source();
  const [masterData, setmasterData] = React.useState([]);
  const globalPayload = useStoreState((state) => state.payload);
  const [bookingPayload, setBookingPayload] = React.useState({});
  const [rejectionCommentError, setRejectionCommentError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false)
  const [showApproveModal, setShowApproveModal] = React.useState(false)
  const [showRejectModal, setShowRejectModal] = React.useState(false)

  React.useEffect(() => {
    getData();

    return () => source.cancel("Data fetching cancelled");
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
          setmasterData(response.data.Result_DTO)
        }
        return;
      } else {
        setIsLoading(false);
        setmasterData([])
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
      setmasterData([])
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

  const approveRejectBookingService = async (payload) => {  
    const configurationObject = {
      url: `${BASE_URL}ApproveRejectBookingRequest`,
      method: "POST",
      cancelToken: source.token,
      data: { ...payload  },
    };
      try {
        setIsLoading(true);
        const response = await axios(
          configurationObject
        );
  
        if (response.data.ResponseCode == "00") {
          setIsLoading(false);
          Snackbar.show({
            text: response.data.Messages[0] ?  response.data.Messages[0] : 'Venue Status Submitted Successfully',
            duration: Snackbar.LENGTH_LONG,
            // color:'green'
          });
          getData()
         
        } else {
        setIsLoading(false);
          // setmasterData([])
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
        // setmasterData([])
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

  const confirmApproveRejectBooking = (item,status) => {
    setBookingPayload({})
    console.log(item)
    let payload = {
      BookingID:item.BookingID,
      ReqStatus: status,
      RejectionComment:rejectionComment
    }
    if(status){
      if(status == 'A'){
        setShowApproveModal(true)
        setShowRejectModal(false)
        setBookingPayload(payload)
  
      }
      else if(status == 'R'){
        setShowRejectModal(true)
        setShowApproveModal(false)  
        setBookingPayload(payload)
      }
    }
  }

  const approveRejectBooking = (payload) => {
    console.log(payload)
    if(payload){
      if(payload.ReqStatus == 'R'){
        if(!rejectionCommentError){
          Snackbar.show({
            text: 'Please Add the Rejection Comments',
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
        // approveRejectBookingService(payload)
      }
      else{
        // approveRejectBookingService(payload)
      }  
    }
  
  }

  const renderBookings = ({ item }) =>
    <Card containerStyle={styles.cardStyle}>
      <Avatar
          size={32}
          rounded
          title={item.RequestStatus.substr(0, 1).toUpperCase()}
          containerStyle={{ backgroundColor: 'coral',alignSelf:'flex-start' }} />
      <Text style={styles.venueName}> {item.VenueName}</Text>
      <Text style={styles.bookingUser}>{item.BookedByUsername} - ({item.ContactNumber})</Text>
      <View>
      {/* <Text style={styles.requestStatus}>({item.RequestStatus})</Text> */}
      <Text style={styles.eventTypesLabel}>(Date | Day | Shift)</Text>
      </View>
     
      <Text style={styles.eventTypes}>{item.EventDate} | {item.EventDay} | {item.EventTime}</Text>

      <View style={styles.approvRejButton}>
     {!item.RequestStatus || item.RequestStatus == 'Pending' ? <TouchableOpacity style={{marginRight:4}}onPress={() => confirmApproveRejectBooking(item, 'A')}><FontAwesomeIcon  icon={ faCircleCheck } size={ 20 } color='green' /></TouchableOpacity> : null}
     {!item.RequestStatus || item.RequestStatus == 'Pending' ?  <TouchableOpacity onPress={() => confirmApproveRejectBooking(item, 'R')} ><FontAwesomeIcon  icon={ faBan } size={ 20 } color='red' /></TouchableOpacity> : null}
      </View>
    </Card>
  
  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading} />

      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      {(showApproveModal || showRejectModal) ? <ConfirmDialog
        title="CONFIRMATION"
        message="Are you sure you want to approve this customer booking request?"
        visible={showApproveModal || showRejectModal}
        onTouchOutside={() =>{showApproveModal ? setShowApproveModal(false): setShowRejectModal(false)}}
        positiveButton={{
          title: "YES",
          onPress: () => approveRejectBooking(bookingPayload)
        }}
        negativeButton={{
          title: "NO",
          onPress: () => {showApproveModal ? setShowApproveModal(false) : setShowRejectModal(false)}
        }}>
           {showRejectModal ?
           <View>
             <Text>Are you sure you want to Reject this customer booking request? For rejecting this you need to add rejection comments as well.</Text>
                <TextField
                        placeholder="Rejection Comments" style={styles.labelText}
                        keyboardType='default'
                        mode="outlined"
                        placeholderTextColor="black"
                        nameOfIcon="envelope"
                        defaultValue={rejectionComment}
                        maxLength={50}
                        onChangeText={value => {
                            setBookingPayload((bookingPayload) => ({...bookingPayload,...{RejectionComment:value.trim()}})),
                            setRejectionCommentError(validate('RejectionComment', bookingPayload.RejectionComment, 'textField'))
                        }}
                        error={rejectionCommentError}
                    />
          </View> : null }
          {showApproveModal ?
           <View>
             <Text>Are you sure you want to Approve this customer booking request? Please fill the following details to be notified to the customer</Text>
              
          </View> : null }
        </ConfirmDialog>: null}
      <FlatList
        data={masterData}
        keyExtractor={item => item.VenueID}
        renderItem={renderBookings}
      />

      {
}
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardStyle:{
    flex:1,
    borderRadius:10,
    flexDirection: "column",
    justifyContent:'space-between',
    shadowColor: 'black',
    height:160,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor:'#EADEDB'

  },
  approvRejButton:{
    marginTop:2,
    flexDirection:'row',
    justifyContent:'space-around',
    alignSelf:'flex-end',
  },
  venueName:{
    fontSize:18,
    color:'black',
    fontWeight: 'bold'
  },

  bookingUser:{
    color:'grey',
    fontStyle:'italic',
    fontSize:16

  },
  requestStatus:{
    fontSize:16,
    fontWeight:'bold',
    fontStyle:'italic',
    color: 'orange'
  },
  eventTypes:{
    alignSelf:'flex-end'
  },
  eventTypesLabel:{
    alignSelf:'flex-end',
    color:'black',
    fontWeight:'bold'
  },
  setImageStyles:{
    marginTop:20,
    marginBottom:20,
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

export default OwnerBookingPage;


