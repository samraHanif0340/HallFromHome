import React, { Component } from "react";
import { StyleSheet, View,Text } from "react-native";

function SearchHalls(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rect}>
        <View style={styles.rect2}>
          <View style={styles.rect3}><Text>Hall From Home</Text></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    height: 780,
    backgroundColor: "#E6E6E6",
    marginTop: 32
  },
  rect2: {
    width: 375,
    height: 82,
    backgroundColor: "#E6E6E6"
  },
  rect3: {
    width: 375,
    height: 82,
    backgroundColor: "rgba(204,65,65,1)"
  }
});

export default SearchHalls;
