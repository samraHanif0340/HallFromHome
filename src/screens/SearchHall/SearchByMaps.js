import React, {Component, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ImageBackground,
  StatusBar,
  TouchableHighlight,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalendarDays,
  faFilter,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  AnimatedRegion,
  Animated,
} from 'react-native-maps';
import ImagedCardView from 'react-native-imaged-card-view';

import Snackbar from 'react-native-snackbar';
import {detectMimeType} from '../../components/utility/helper';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {MAP_KEY} from '../../constants/constants';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
import Geolocation from '@react-native-community/geolocation';
import {useStoreState} from 'easy-peasy';
import {Input} from 'react-native-elements';
import {Loader} from '../../components/customComponents/customComponents';
import {useStoreActions} from 'easy-peasy';

// const CURRENT_LOCATION = {
//   LATITUDE: 37.5336,
//   LONGITUDE: -82.09342,
//   LATITUDE_DELTA:0.0922,
//   LONGITUDE_DELTA: 0.0421,
// }
const source = axios.CancelToken.source();
const mapRef = React.createRef();

const homePlace = {
  title: 'Samnabad Karachi',
  description: 'Home',
  geometry: {location: {lat: 24.9426, lng: 67.0738}},
};
const workPlace = {
  title: 'Careem Head Office',
  description: 'Work',
  geometry: {location: {lat: 24.829782, lng: 67.073169}},
};

const SearchByMaps = ({navigation}) => {
  const globalPayload = useStoreState(state => state.payload);
  const setGlobalStack = useStoreActions(actions => actions.setStackDetails);
  const appendPayload = useStoreActions(actions => actions.appendPayload);
  const [mapInitialized, setMapInitialized] = React.useState(false);
  const [mapMarkers, setMapsMarkers] = React.useState([]);
  const [initialRegion, setInitialRegion] = React.useState({});
  const [currentMarker, setCurrentMarker] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(false);

  // const onRegionChange = (region) => {
  //   console.log(region)
  // }

  //   const onMapReady = async () => {
  //     if (mapInitialized) {
  //         return;
  //     }
  //     setMapInitialized(true);
  // };

  useEffect(() => {
    getOneTimeLocation();
    getData();
    // return () => source.cancel('Data fetching cancelled');
  }, []);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        let obj = {
          longitude: position?.coords?.longitude,
          latitude: position?.coords?.latitude,
        };
        console.log(position);
        setInitialRegion(obj);
      },
      error => Alert.alert(error.message),
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          console.log('location graned');
          getOneTimeLocation();
        } else {
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  const getData = async () => {
    const configurationObject = {
      url: `${BASE_URL}GetVenueList`,
      method: 'GET',
      cancelToken: source.token,
      // data: { fullName, email },
    };

    try {
      setIsLoading(true);
      const response = await axios(configurationObject);

      if (response.data.ResponseCode == '00') {
        setIsLoading(false);
        if (response.data.Result_DTO) {
          for (let i = 0; i < response.data.Result_DTO.length; i++) {
            let latLong = {
              latitude: parseFloat(response.data.Result_DTO[i].Latitude),
              longitude: parseFloat(response.data.Result_DTO[i].Longitude),
            };
            response.data.Result_DTO[i].coordinates = latLong;
            let mimeType = response.data.Result_DTO[i].Image
              ? detectMimeType(response.data.Result_DTO[i].Image)
              : null;
            response.data.Result_DTO[i].imageMimeType = mimeType;
          }

          console.log(response.data.Result_DTO);
          setMapsMarkers(response.data.Result_DTO);
        }
        return;
      } else {
        setMapsMarkers([]);
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
      console.log('map error', error);
      setMapsMarkers([]);
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

  const SearchInMap = (data, location) => {
    console.log('location==', location);
    console.log('data==', data);

    let obj = {
      latitude: location.lat,
      longitude: location.lng,
      title: data.description,
    };
    setCurrentMarker(obj);
    mapRef.current.animateToRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const navigateToPage = item => {
    console.log('navigation clicked');
    appendPayload({venueId: item.VenueID});
    navigation.navigate('HallDetails', {VenueID: item.VenueID});
  };

  const RenderHallListing = item => {
    console.log(item);

    return (
      <View style={styles.setImageStyles}>
        <ImagedCardView
          stars={Number(item.Rating)}
          ratings={Number(item.Rating)}
          title={item.VenueName}
          reviews={item.ReviewCount}
          titleColor="black"
          subtitleColor="grey"
          dividerColor="black"
          leftSideColor="black"
          leftSideValueColor="grey"
          rightSideColor="black"
          rightSideValueColor="grey"
          starColor="yellow"
          rightSideTitle="Price"
          rightSideValue={Number(item.RentPrice)}
          subtitle={item.VenueTypeDesc}
          leftSideTitle="Max Persons"
          leftSideValue={item.MaxCapacity}
          backgroundColor="floralwhite"
          borderRadius={35}
          source={
            item.imageMimeType
              ? {uri: 'data:' + item.imageMimeType + ';base64,' + item.Image}
              : {uri: item.Image}
          }
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading} />

      <GooglePlacesAutocomplete
        styles={{
          container: {
            flex: 0.9,
          },
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          listView: {
            color: 'black',
            zIndex: 100,
            position: 'absolute',
            top: 40,
            marginVertical: 5,
            marginHorizontal: 5,
          },
          textInput: {
            height: 44,
            color: '#5d5d5d',
            fontSize: 16,
            marginVertical: 5,
            marginHorizontal: 5,
          },
        }}
        placeholder="Search..."
        query={{
          key: MAP_KEY,
          language: 'en',
        }}
        isRowScrollable={true}
        returnKeyType="Search here..."
        fetchDetails={true}
        predefinedPlaces={[homePlace, workPlace]}
        predefinedPlacesAlwaysVisible={false}
        enablePoweredByContainer={false}
        autoFillOnNotFound={true}
        nearbyPlacesAPI="GooglePlacesSearch"
        onPress={(data, details = null) => {
          console.log({data, details});
          SearchInMap(data, details.geometry.location);
        }}
        onFail={error => console.error(error)}
        currentLocation={true}
        textInputProps={{
          InputComp: TextInput,
          placeholder: 'Search here...',
          errorStyle: {color: 'red'},
          clearButtonMode: 'always',
        }}
      />
      <MapView
        style={styles.maps}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: initialRegion?.latitude ? initialRegion?.latitude : 24.9426,
          longitude: initialRegion?.longitude
            ? initialRegion?.longitude
            : 67.0738,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {initialRegion && initialRegion.latitude ? (
          <Marker
            pinColor="blue"
            key={globalPayload?.userId}
            coordinate={{
              latitude: initialRegion?.latitude,
              longitude: initialRegion?.longitude,
            }}
            title={globalPayload?.userDetails?.name}
            description={globalPayload?.userDetails?.email}>
            {/* <Image
              source={require('../../assets/images/current_location_marker.png')}
              style={{height: 35, width: 35}}
            /> */}
          </Marker>
        ) : null}
        {currentMarker && currentMarker.latitude ? (
          <Marker
            pinColor="green"
            key={globalPayload?.userId}
            coordinate={{
              latitude: currentMarker?.latitude,
              longitude: currentMarker?.longitude,
            }}
            title={currentMarker.title}
          />
        ) : null}

        {mapMarkers.map((marker, index) => (
          <Marker
            pinColor="#800000"
            key={marker.VenueID}
            coordinate={marker.coordinates}
            title={marker.VenueName}
            description={marker.RentPrice}
            onCalloutPress={() => navigateToPage(marker)}>
            {/* <MapView.Callout tooltip style={styles.customView}>
              <TouchableHighlight
                onPress={() => this.markerClick()}
                underlayColor="#dddddd">
                <View style={styles.calloutText}>
                  <Text>
                    {marker.title}
                    {'\n'}
                    {marker.description}
                  </Text>
                </View>
              </TouchableHighlight>
            </MapView.Callout> */}
            <Callout tooltip style={styles.calloutView}>
              {/* <View>
                <Text>{marker.VenueName}</Text>
                <Text>{marker.RentPrice}</Text>
              </View> */}
              <TouchableOpacity onPress={() => console.log('callout clicked')}>
                <RenderHallListing {...marker} />
                {/* <TouchableOpacity
                  style={styles.setActionsStyles}
                  onPress={() => {
                    openCalendar(item.VenueID);
                  }}>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    size={25}
                    color="black"
                  />
                </TouchableOpacity> */}
              </TouchableOpacity>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // backgroundColor:'white',
  },
  maps: {
    flex: 6,
  },
  calloutView: {
    position: 'relative',
    backgroundColor: 'florawhite',
  },
  setImageStyles: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  setActionsStyles: {
    alignSelf: 'flex-end',
    marginRight: 22,
    marginBottom: 8,
    position: 'absolute',
    top: 15,
    right: 2,
  },
});

export default SearchByMaps;
