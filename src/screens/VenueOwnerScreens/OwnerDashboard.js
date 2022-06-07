import React, {Component, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  VirtualizedList,
  TouchableHighlight,
  StatusBar,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Loader} from '../../components/customComponents/customComponents';
import {Divider, Card, Avatar, Badge} from 'react-native-elements';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Snackbar from 'react-native-snackbar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {getStatusColor} from '../../components/utility/helper';
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const CAROUSEL_VERTICAL_OUTPUT = 56;
export const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - CAROUSEL_VERTICAL_OUTPUT;

const OwnerDashboard = props => {
  const source = axios.CancelToken.source();
  const globalPayload = useStoreState(state => state.payload);
  const setPayload = useStoreActions(actions => actions.setPayload);
  const [pendingData, setpendingData] = React.useState([]);
  const [dashboardStats, setDashboardStats] = React.useState([
    {id: 1, name: 'Pending', count: 0, icon: 'list'},
    {id: 2, name: 'Approved', count: 0, icon: 'check'},
    {id: 3, name: 'Rejected', count: 0, icon: 'ban'},
  ]);
  const [venueStats, setVenueStats] = React.useState([
    {id: 1, name: 'Pending', count: 0, icon: 'list'},
    {id: 2, name: 'Approved', count: 0, icon: 'check'},
    {id: 3, name: 'Rejected', count: 0, icon: 'ban'},
  ]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    getDashboardStats();
    getData();
    getVenueStats();
  }, []);

  const getData = async () => {
    const configurationObject = {
      url: `${BASE_URL}GetVenueBookingRequests`,
      method: 'POST',
      cancelToken: source.token,
      data: {UserID: globalPayload.userId},
    };
    try {
      setIsLoading(true);
      const response = await axios(configurationObject);

      if (response.data.ResponseCode == '00') {
        setIsLoading(false);
        if (response.data.Result_DTO) {
          let newArray = [];
          if (response.data.Result_DTO.length > 3) {
            newArray = JSON.parse(
              JSON.stringify(response.data.Result_DTO.slice(0, 3)),
            );
          } else {
            newArray = JSON.parse(JSON.stringify(response.data.Result_DTO));
          }
          setpendingData(newArray);
        }
      } else {
        setIsLoading(false);

        setpendingData([]);
        Snackbar.show({
          text: response.data.ResponseDesc,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#B53849',
          textColor: 'black',
          action: {
            text: 'OK',
            textColor: 'black',
            onPress: () => {
              /* Do something. */
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
      setpendingData([]);
      setIsLoading(false);
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#B53849',
        textColor: 'black',
        action: {
          text: 'OK',
          textColor: 'black',
          onPress: () => {
            /* Do something. */
          },
        },
      });
    }
  };

  const getVenueStats = async () => {
    const configurationObject = {
      url: `${BASE_URL}GetVenueStatistics`,
      method: 'POST',
      cancelToken: source.token,
      data: {OwnerID: globalPayload.userId},
    };
    try {
      const response = await axios(configurationObject);
      if (response.data.ResponseCode == '00') {
        if (response.data.Result_DTO) {
          for (let i = 0; i < response.data.Result_DTO.length; i++) {
            response.data.Result_DTO[i].color = getStatusColor(
              response.data.Result_DTO[i].name,
            ).backgroundColor;
            response.data.Result_DTO[i].name =
              response.data.Result_DTO[i].name.toUpperCase();
          }
          setVenueStats(response.data.Result_DTO);
        }
      } else {
        setVenueStats([]);
      }
    } catch (error) {
      console.log(error);
      setVenueStats([]);
    }
  };

  const getDashboardStats = async () => {
    const configurationObject = {
      url: `${BASE_URL}GetRequestStatistics`,
      method: 'POST',
      cancelToken: source.token,
      data: {OwnerID: globalPayload.userId},
    };
    try {
      const response = await axios(configurationObject);
      if (response.data.ResponseCode == '00') {
        if (response.data.Result_DTO) {
          for (let i = 0; i < response.data.Result_DTO.length; i++) {
            response.data.Result_DTO[i].color = getStatusColor(
              response.data.Result_DTO[i].name,
            ).backgroundColor;
            response.data.Result_DTO[i].name =
              response.data.Result_DTO[i].name.toUpperCase();
          }
          setDashboardStats(response.data.Result_DTO);
        }
      } else {
        setDashboardStats([]);
      }
    } catch (error) {
      console.log(error);
      setDashboardStats([]);
    }
  };

  const goToOwnerBookingPage = () => {
    props.navigation.navigate('OwnerBookings');
  };

  const renderDashboardItem = ({item}) => (
    <Card
      containerStyle={[
        styles.cardChildStyle,
        {backgroundColor: item.color, opacity: 0.7},
      ]}>
      {/* <View style={styles.requestsIcon}>

      </View> */}
      <View style={styles.requestsContent}>
        <Icon rounded name={item.icon} size={25} color="black" />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCount}>{item.count}</Text>
      </View>
    </Card>
  );

  const renderRecentBookings = ({item}) => (
    <Card containerStyle={styles.cardStyle}>
      <Avatar
        size={32}
        rounded
        title={item.RequestStatus.substr(0, 1).toUpperCase()}
        containerStyle={{
          backgroundColor: getStatusColor(item.RequestStatus).backgroundColor,
          alignSelf: 'flex-end',
        }}
      />
      <Text style={styles.venueName}> {item.VenueName}</Text>
      <Text style={styles.bookingUser}>
        {item.BookedByUsername} - ({item.ContactNumber})
      </Text>
      <Text style={styles.eventTypesLabel}>(Date | Day | Shift)</Text>
      <Text style={styles.eventTypes}>
        {item.EventDate} | {item.EventDay} | {item.EventTime}
      </Text>
    </Card>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Loader isLoading={isLoading} />
      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <View style={styles.cards}>
        <Card.Title style={styles.TitleStyling}>
          {' '}
          REQUESTS & APPROVALS{' '}
        </Card.Title>
        <FlatList
          data={dashboardStats}
          renderItem={renderDashboardItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.cards}>
        <Text style={styles.TitleStyling}>RECENT BOOKINGS</Text>
        <TouchableOpacity
          style={styles.viewMoreButton}
          onPress={() => goToOwnerBookingPage()}>
          <View style={styles.viewMoreWrapper}>
            {/* <FontAwesomeIcon  icon={ faEye } size={ 20 } color='black' /> */}
            <Text style={styles.viewMore}>View More</Text>
          </View>
        </TouchableOpacity>

        <FlatList
          keyExtractor={item => item.BookingID}
          data={pendingData}
          renderItem={renderRecentBookings}
          horizontal
        />
      </View>
      <View style={styles.cards}>
        <Card.Title style={styles.TitleStyling}> VENUE STATISTICS</Card.Title>
        <FlatList
          data={venueStats}
          renderItem={renderDashboardItem}
          keyExtractor={item => item.id}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  cards: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    flex: 6,
    borderRadius: 10,
    backgroundColor: 'floralwhite',
    shadowColor: '#000',
    height: 300,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 7,
  },
  cardStyle: {
    flex: 1,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowColor: '#000',
    height: 180,
    width: 300,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 7,
    backgroundColor: 'white',
  },

  venueName: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  bookingUser: {
    color: 'black',
    fontStyle: 'italic',
    fontSize: 16,
  },
  requestStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'coral',
  },
  eventTypes: {
    alignSelf: 'flex-end',
  },
  eventTypesLabel: {
    alignSelf: 'flex-end',
    color: 'black',
    fontWeight: 'bold',
  },
  viewMoreWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewMore: {
    fontSize: 16,
    marginLeft: 3,
    marginRight: 3,
    color: '#800000',
  },
  childParents: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardParentStyle: {
    justifyContent: 'space-between',
    borderRadius: 16,
    shadowColor: '#000',
    backgroundColor: '#FDE1C9',
    shadowOffset: {width: 1.5, height: 1.5},
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 7,
  },
  cardChildStyle: {
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: 9,
    borderColor: '#DD928E',
    shadowColor: '#9F9292',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 10,
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
    marginTop: 20,
    marginBottom: 4,
    alignSelf: 'center',
  },
  eventDateTime: {
    fontSize: 16,
    color: '#FDE1C9',
    fontWeight: 'bold',
  },

  itemCount: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    borderRadius: 25,
    backgroundColor: 'white',
    height: 30,
    width: 30,
  },
  requestsIcon: {
    alignSelf: 'center',
  },
  requestsContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewMoreButton: {
    alignSelf: 'flex-end',
    borderColor: 'red',
    fontStyle: 'italic',
    color: 'black',
    fontWeight: 'bold',
  },
  flatListView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainView: {},
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  venueName: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  middleView: {
    // flexDirection: 'row',
    // justifyContent:'space-between',
    // alignContent:'space-between'
  },
});

export default OwnerDashboard;
