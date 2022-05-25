import React, { Component, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, ImageBackground, StatusBar, TouchableHighlight } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {MAP_KEY} from '../../constants/constants'

const SearchByMaps = () => {
  return (
    <View style={{flex:1}}>
      <Text>Samra</Text>

<GooglePlacesAutocomplete
        placeholder="Address"
        query={{
          key: MAP_KEY,
          language: "en",
        }}
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log({ data, details });
          // fillDataFromGoogleSearch(data, details);
        }}
        onFail={(error) => console.error(error)}
        currentLocation={false}
        currentLocationLabel="Current location"
        textInputProps={{
          // InputComp: TextInput,
          iconLeft: "user",
          placeholder: "Address",
          // value: fillDataFromGoogleSearch?.title,
          clearButtonMode: "never",
          googleFieldStyle: { width: "91%" },
          // placeholderTextColor: theme.colors.textSecondary,
          // style: { borderRadius: 100, color: theme.colors.textSecondary },
        }}
      />
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.533600,
      longitude: -82.093420,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onMapReady={() => {}}
        // region={region}
      >
        <Marker
          key={Math.random()}
          coordinate={{  latitude: 37.533600,
            longitude: -82.093420,}}
          // {...{ title: mapTitle, description: mapDescription }}
        />
      </MapView>
    </View>
  )
}

export default SearchByMaps