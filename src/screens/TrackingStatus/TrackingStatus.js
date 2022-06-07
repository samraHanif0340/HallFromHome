import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {Card} from 'react-native-elements';
import {Avatar} from 'react-native-elements';
import {BASE_URL} from '../../constants/constants';
import axios from 'axios';
import {useStoreState} from 'easy-peasy';
import Snackbar from 'react-native-snackbar';
import {getStatusColor} from '../../components/utility/helper';
import {Loader} from '../../components/customComponents/customComponents';

const TrackingStatusPage = props => {
  const source = axios.CancelToken.source();
  const globalPayload = useStoreState(state => state.payload);
  const [isLoading, setIsLoading] = React.useState(false);
  const [masterData, setmasterData] = React.useState([]);

  React.useEffect(() => {
    getData();

    // return () => source.cancel('Data fetching cancelled');
  }, []);

  const getData = async () => {
    const configurationObject = {
      url: `${BASE_URL}GetBookingDetails`,
      method: 'POST',
      cancelToken: source.token,
      data: {UserID: globalPayload.userId, OwnerID: 8},
    };
    try {
      setIsLoading(true);
      const response = await axios(configurationObject);

      if (response.data.ResponseCode == '00') {
        setIsLoading(false);
        if (response.data.Result_DTO) {
          setmasterData(response.data.Result_DTO);
        }
        return;
      } else {
        setIsLoading(false);
        setmasterData([]);
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
      setmasterData([]);
      setIsLoading(false);
      Snackbar.show({
        text: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
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

  const renderBookings = ({item}) => (
    <Card containerStyle={styles.cardStyle}>
      {item.RequestStatus ? (
        <Avatar
          size={32}
          rounded
          title={item.RequestStatus.substr(0, 1).toUpperCase()}
          containerStyle={{
            backgroundColor: getStatusColor(item.RequestStatus).backgroundColor,
            alignSelf: 'flex-start',
          }}
        />
      ) : null}
      <Text style={styles.venueName}> {item.VenueName}</Text>
      {item.RequestStatus == 'Approved' ? (
        <Text style={styles.eventTypesLabel}>(Advance Payment | Deadline)</Text>
      ) : null}
      {item.RequestStatus == 'Approved' ? (
        <Text style={styles.eventTypes}>
          {item.AdvancePayment} | {item.AdvancePaymentDeadlineDate}
        </Text>
      ) : null}
      <View>
        <Text style={styles.eventTypesLabel}>(Date | Day | Shift)</Text>
      </View>
      <Text style={styles.eventTypes}>
        {item.EventDate} | {item.EventDay} | {item.EventTime}
      </Text>

      {item.Comment ? (
        <View>
          <Text style={styles.commentStyle}>{item.Comment}</Text>
        </View>
      ) : null}

      {item.RequestStatus == 'Completed' ? (
        <View>
          <Text style={[{color: 'blue'}]}>
            Your Requested Venue {item.VenueName} has been booked for{' '}
            {item.EventDate} by{globalPayload.userDetails.name}. The final
            payment will be required on the Event Day. Enjoy Your Event, MAKE
            YOUR DAY MEMORABLE{' '}
          </Text>
        </View>
      ) : null}
    </Card>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <Loader isLoading={isLoading} />
      <FlatList
        data={masterData}
        keyExtractor={item => item.BookingID}
        renderItem={renderBookings}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  cardStyle: {
    flex: 1,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowColor: 'black',
    height: 190,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'floralwhite',
  },
  venueName: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  eventTypes: {
    alignSelf: 'flex-end',
  },
  eventTypesLabel: {
    alignSelf: 'flex-end',
    color: 'black',
    fontWeight: 'bold',
  },
  commentStyle: {
    fontWeight: 'bold',
    color: 'red',
    alignSelf: 'flex-start',
    fontSize: 14,
  },
});

export default TrackingStatusPage;
