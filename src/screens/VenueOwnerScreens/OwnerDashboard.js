import React, { Component, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, TouchableHighlight, StatusBar, ImageBackground, ScrollView } from "react-native";
import { Loader } from '../../components/customComponents/customComponents'
import { Divider, Card, Avatar , Badge} from 'react-native-elements'
import axios from 'axios';
import { BASE_URL } from '../../constants/constants'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { NavigationContainer } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';




// const LeftContent = props => <Avatar.Icon {...props} icon="account-circle-outline" />




const OwnerDashboard = (props) => {
  // const appendPayload = useStoreActions((actions) => actions.appendPayload);
  const globalPayload = useStoreState((state) => state.payload);
  const setPayload = useStoreActions((actions) => actions.setPayload);
  const source = axios.CancelToken.source();

  const [pendingData, setpendingData] = React.useState([]);
  const [dashboardData, setDashboardData] = React.useState([{id:1,name:'Pending',count:49,icon:"list" },{id:2,name:'Approved',count:23,icon:"check" },{id:3,name:'Rejected',count:12,icon:"ban" }]);

  const [isLoading, setIsLoading] = React.useState(false);




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
          setpendingData(response.data.Result_DTO)

        }

        return;
      } else {
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


  useEffect(() => {
    getData();

    return () => source.cancel("Data fetching cancelled");
  }, []);

  const handleSubmitPress = () => {
    setPayload({});

    props.navigation.replace('Auth')
  }


  const getStatusDescription = (status) => {
    let statusDesc = 'Pending'
    let statusColor = 'primary'
    if(status == 'P'){
      statusDesc = 'Pending'
      statusColor = 'primary'
    }
    else  if(status == 'A'){
      statusDesc = 'Approved'
      statusColor = 'success'

    }
    else{
      statusDesc = 'Rejected'
      statusColor = 'error'

    }

    let obj = {
      statusDecription: statusDesc,
      color:statusColor

    }

    return obj
  }

  const renderDashboardItem = ({ item }) => (
    <Card containerStyle={styles.cardChildStyle}>
      <View style={styles.requestsIcon}>
      <Icon name={item.icon} size={30} color='#FDE1C9'/>
      </View>
      <View  style={styles.requestsContent}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemCount}>{item.count}</Text>
      </View>   
    </Card>
  );

  const renderRecentBookings = ({item}) =>(
    <Card containerStyle={styles.cardStyle}>
    <View style={styles.mainView}>
      {/* <Avatar
        size={64}
        rounded
        title={item.BookedByUsername.substr(0, 1).toUpperCase()}
        containerStyle={{ backgroundColor: 'coral' }} /> */}
      <View style={styles.middleView}>
        <Text style={styles.username}>{item.BookedByUsername}</Text>
        <Text style={styles.venueName}>{item.VenueName}</Text>
        <View style={styles.lastRow}>
          <Text style={styles.eventDateTime}>{item.EventDate} | {item.EventTime}</Text>
      <Badge style={styles.statusBadge} value={getStatusDescription(item.RequestStatus).statusDecription} status={getStatusDescription(item.RequestStatus).color}/>
        </View>
      </View>
    </View>
  </Card>
  )

  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading} />

      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      {/* <ImageBackground style={styles.container}
        source={require("../../assets/images/Gradient_MI39RPu.png")}
      > */}
        {/* <TouchableOpacity
          onPress={handleSubmitPress}
          style={styles.button2}
        >
          <Text style={styles.text5}>LOGOUT</Text>
        </TouchableOpacity> */}
        {/* <ScrollView >
          <FlatList 
            data={pendingData}
            renderItem={({ item }) => (
              <Card containerStyle={styles.cardStyle}>
                <View style={styles.mainView}>
                  <Avatar
                    size={64}
                    rounded
                    title={item.BookedByUsername.substr(0, 1).toUpperCase()}
                    containerStyle={{ backgroundColor: 'coral' }} />
                  <View style={styles.middleView}>

                    <Text style={styles.username}>{item.BookedByUsername}</Text>
                    <Text style={styles.venueName}>{item.VenueName}</Text>
                    <View style={styles.lastRow}>
                      <Text style={styles.eventDateTime}>{item.EventDate} | {item.EventTime}</Text>
                  <Badge style={styles.statusBadge} value={getStatusDescription(item.RequestStatus).statusDecription} status={getStatusDescription(item.RequestStatus).color}/>

                     
                    </View>
                  </View>
                </View>
              </Card>

            )}

          />
        </ScrollView> */}
        <View style={styles.childParents}>

        <ScrollView>
          <Card containerStyle={styles.cardParentStyle}>
          <Card.Title>Requests And Approvals</Card.Title>
          <Card.Divider />
          <FlatList
          data={dashboardData}
          renderItem={renderDashboardItem}
          keyExtractor={item => item.id}
          numColumns={2}
          />
          </Card>
      
          </ScrollView>
         
          <ScrollView>
          <Card containerStyle={styles.cardParentStyle}>
          <Card.Title>Recent Bookings</Card.Title>
          <TouchableHighlight style={styles.viewMoreButton}><Text >View More</Text></TouchableHighlight>
          <Card.Divider />
          <FlatList
          data={pendingData}
          renderItem={renderRecentBookings}
          keyExtractor={item => item.id}
          horizontal
          />
          </Card>
          </ScrollView>

        

          <ScrollView>
         
          <Card containerStyle={styles.cardParentStyle}>
          <Card.Title>Your Halls </Card.Title>
          <TouchableHighlight style={styles.viewMoreButton}><Text >View More</Text></TouchableHighlight>
          <Card.Divider />
          
          <FlatList
          data={pendingData}
          renderItem={renderRecentBookings}
          keyExtractor={item => item.id}
          horizontal
          />
          <TouchableHighlight><Text>View More</Text></TouchableHighlight>
          </Card>

          </ScrollView>
          </View>

      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  childParents:{
    flex:1,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  cardParentStyle: {
    flex:1,
    justifyContent:'space-between',
    borderRadius: 6,
    shadowColor: '#000',
    // backgroundColor:'#FDE1C9',
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
  },
  cardChildStyle: {
    flex:1,
    justifyContent:'space-between',
    borderRadius: 6,
    borderColor:'rgba(157,24,24,0.8)',
    backgroundColor:'rgba(157,24,24,0.8)', 
    shadowColor: 'rgba(157,24,24,0.8)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  itemName:{
    fontSize:16,
    color:'#FDE1C9',
    fontWeight:'bold',

  },
  itemCount:{
    fontSize:16,
    color:'#FDE1C9',
    fontWeight:'bold',
    borderRadius:7,

  },
  requestsIcon:{
    alignSelf:'center'
  },
  requestsContent:{
    alignItems:'center'
  },
  viewMoreButton:{
    alignSelf:'flex-end',
    borderColor:'red',
    color:'black',
    fontWeight:'bold'
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    
  },
  username: {
    fontSize: 16,
    fontWeight:'bold',
    color:'black'
  },
  venueName: {
    fontSize: 12,
    fontStyle:'italic'

  },
  middleView: {
    flexDirection: 'column',
    justifyContent:'space-between',
    alignContent:'space-between'

  },
  lastRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlign:'center'
  },
  statusBadge:{
    fontSize:5,
    alignSelf:'flex-end'
    
  },

  button2: {
    height: 59,
    //backgroundColor: "rgba(31,178,204,1)",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    justifyContent: "center",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 14,
    marginBottom: 14
  },
  text5: {
    color: "rgba(142,7,27,1)",
    textAlign: "center",
    fontSize: 20,
    alignSelf: "center"
  },
});

export default OwnerDashboard;


