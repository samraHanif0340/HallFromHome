import React, { Component, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, ImageBackground, StatusBar, TouchableHighlight } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const SearchByMaps = () => {
  return (
    <View style={{flex:1}}>
      <Text>Samra</Text>
      <MapView
        style={{ flex: 1 , backgroundColor:'red'}}

        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      ></MapView>
    </View>
  )
}

export default SearchByMaps