import React, { Component, useEffect } from "react";
import { StyleSheet, View, Dimensions,Text, Image, FlatList, SafeAreaView,TouchableOpacity, VirtualizedList,TouchableHighlight, StatusBar, ImageBackground, ScrollView } from "react-native";
import { Loader } from '../../components/customComponents/customComponents'
import { Divider, Card, Avatar , Badge} from 'react-native-elements'
import axios from 'axios';
import { BASE_URL } from '../../constants/constants'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { NavigationContainer } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Snackbar from 'react-native-snackbar';



export const SCREEN_WIDTH = Dimensions.get('window').width;
export const CAROUSEL_VERTICAL_OUTPUT = 56;
export const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - CAROUSEL_VERTICAL_OUTPUT;


// const LeftContent = props => <Avatar.Icon {...props} icon="account-circle-outline" />




const OwnerDashboard = (props) => {
  // const appendPayload = useStoreActions((actions) => actions.appendPayload);
  console.log('dashboard',props)
  const globalPayload = useStoreState((state) => state.payload);
  const setPayload = useStoreActions((actions) => actions.setPayload);
  const source = axios.CancelToken.source();
  const [activeTab, setActiveTab] = React.useState(0)

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
  }, [globalPayload.userId]);

  const handleSubmitPress = () => {
    setPayload({});

    props.navigation.replace('Auth')
  }

  const goToVenueListPage = () =>{
    props.navigation.push('VenueList')
  }

  const goToOwnerBookingPage = () =>{
    props.navigation.push('OwnerBookings')
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
  
 
     
      <View style={styles.middleView}>
        <Text style={styles.username}>{item.BookedByUsername}</Text>
        <Text style={styles.venueName}>{item.VenueName}</Text>
        <View style={styles.lastRow}>
          <Text style={styles.eventDateTime}>{item.EventDate} | {item.EventTime}</Text>
          
      {/* <Badge style={styles.statusBadge} value={getStatusDescription(item.RequestStatus).statusDecription} status={getStatusDescription(item.RequestStatus).color}/> */}
        </View>
      </View>
 
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
         {/* <ScrollView> */}
          <Card containerStyle={styles.cardParentStyle}>
          <Card.Title style = {styles.TitleStyling}> Requests And Approvals </Card.Title>
          <Card.Divider />
          <FlatList
          data={dashboardData}
          renderItem={renderDashboardItem}
          keyExtractor={item => item.id}
          numColumns={2}
     
          />
          </Card>
{/* </ScrollView> */}
         
          <Card containerStyle={styles.cardParentStyle}>
          <Card.Title style = {styles.TitleStyling}> Recent Bookings</Card.Title>
          <TouchableHighlight style={styles.viewMoreButton} onPress={() => goToOwnerBookingPage()}><Text >View More</Text></TouchableHighlight>
          <Card.Divider />
          {/* <FlatList
          contentContainerStyle={styles.flatListView}
          data={pendingData}
          renderItem={renderRecentBookings}
          keyExtractor={item => item.id}
          horizontal
          /> */}
           <Carousel
                            layout={"default"}
                            data={pendingData}
                            sliderWidth={250}
            itemWidth={250}
                            renderItem={renderRecentBookings}
                            onSnapToItem={i => setActiveTab({ activeTab: i })} />
                               {/* <Pagination
                                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                                dotStyle={styles.ww}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6}
                                activeDotIndex={activeTab}
                                dotsLength={pendingData.length}
                                


                            /> */}
          </Card>
 
          <ScrollView>
         
          <Card containerStyle={styles.cardParentStyle}>
          <Card.Title style = {styles.TitleStyling}> Your Halls </Card.Title>
          <TouchableHighlight style={styles.viewMoreButton} onPress={()=>goToVenueListPage()}><Text >View More</Text></TouchableHighlight>
          <Card.Divider />
          <Carousel
                            layout={"default"}
                            data={pendingData}
                            sliderWidth={250}
            itemWidth={250}
                            renderItem={renderRecentBookings}
                            onSnapToItem={(index) => console.log('carousel index', index)} />
                               <Pagination
                                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                                dotStyle={styles.ww}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6}
                                


                            />
          {/* <SafeAreaView>
          <FlatList
          data={pendingData}
          contentContainerStyle={styles.flatListView}
          renderItem={renderRecentBookings}
          keyExtractor={item => item.id}
          horizontal
          />
          </SafeAreaView> */}
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
   
    justifyContent:'space-between',
    borderRadius: 16,
    shadowColor: '#000',
    backgroundColor:'#FDE1C9',
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 6,
  },
  cardChildStyle: {
    flex:1,
    justifyContent:'space-between',
    borderRadius: 9,
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
  TitleStyling:{
    fontSize:20,
    color:'black',
    fontWeight:'bold',

  },
  eventDateTime: {
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
    fontStyle: 'italic',
    color:'black',
    fontWeight:'bold'
  },
  flatListView:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  mainView: {
   

    
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
    // flexDirection: 'row',
    // justifyContent:'space-between',
    // alignContent:'space-between'

  },
});

export default OwnerDashboard;


