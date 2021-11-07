import React, { Component } from "react";
import { StyleSheet, View, Text, Image, FlatList,TouchableHighlight  } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Svg, { Ellipse } from "react-native-svg";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
// import { SearchBar, Rating } from 'react-native-elements';
// import SearchBar from "react-native-dynamic-search-bar";

function SearchScreenPage(props) {

  const [hallList, setHallList] = React.useState([
    {
      hallName: "Majestic Banquet",
      seatingCapacity: 700,
      price: "150,000 PKR",
      rating: 4.5,
      imgURL: "../../assets/images/download2.jpg"
    },
    {
      hallName: "Majestic Banquet",
      seatingCapacity: 700,
      price: "150,000 PKR",
      rating: 4.5,
      imgURL: "../../assets/images/download2.jpg"
    },
    {
      hallName: "Majestic Banquet",
      seatingCapacity: 700,
      price: "150,000 PKR",
      rating: 4.5,
      imgURL: "../../assets/images/download2.jpg"
    },
    {
      hallName: "Majestic Banquet",
      seatingCapacity: 700,
      price: "150,000 PKR",
      rating: 4.5,
      imgURL: "../../assets/images/download2.jpg"
    },
    {
      hallName: "Majestic Banquet",
      seatingCapacity: 700,
      price: "150,000 PKR",
      rating: 4.5,
      imgURL: "../../assets/images/download2.jpg"
    }
  ])


  // const searchFilterFunction = (searchText) => {
  //   if (searchText) {
  //     hallList = hallList.filter((eachRow) => {
  //       return eachRow.title ? eachRow.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1 : null
  //     })
  //   }
  //   this.setState({
  //     searchText: searchText,
  //     hallList: hallList
  //   })

  // }

  return (
    <View style={styles.container}>
      <View style={styles.rectRow}>


            {/* <View style={styles.rect3}>
              <View style={styles.rect4Row}>
                <View style={styles.rect4}>
                  <View style={styles.icon3Row}>
                    <FontAwesomeIcon
                      name="search"
                      style={styles.icon3}
                    ></FontAwesomeIcon>
                    <Text style={styles.loremIpsum}>
                      Search for halls, banquets...
                    </Text>
                  </View>
                </View>
                <FontAwesomeIcon
                  name="sliders"
                  style={styles.icon2}
                ></FontAwesomeIcon>
              </View>
            </View> */}

            {/* <SearchBar
              lightTheme
              round
              searchIcon={{ size: 24 }}
              placeholder="Search for halls, banquets..."
              value="dasdas"
              onChangeText={text => searchFilterFunction(text)}
            />   */}

            {/* <SearchBar
  fontColor="#c6c6c6"
  iconColor="#c6c6c6"
  shadowColor="#282828"
  cancelIconColor="#c6c6c6"
  backgroundColor="#353d5e"
  placeholder="Search for halls, banquets..."
  onChangeText={text => searchFilterFunction(text)}
  onSearchPress={() => console.log("Search Icon is pressed")}
  onClearPress={() => this.filterList("")}
  onPress={() => alert("onPress")}
/> */}

           
<FlatList
data={hallList}
renderItem={({ item }) => (
  <View style={styles.imageStackStack}>
    <View style={styles.imageStack}>
      <TouchableHighlight onPress={() => this.props.navigation.navigate('HallDetails')}>
        <Image
          source={require("../../assets/images/download2.jpg")}
          // source={{ uri: item.imgURL }}

          resizeMode="contain"
          style={styles.image}
        ></Image>
      </TouchableHighlight>

      <Text style={styles.majesticBanquet}>{item.hallName}</Text>
      <Text style={styles.limit700Persons}>Limit {item.seatingCapacity} Persons</Text>
    </View>
    <View style={styles.loremIpsum2Stack}>
      <Text style={styles.loremIpsum2}>{item.price}</Text>
      <FontAwesomeIcon
        name="star"
        style={styles.icon6}
      ></FontAwesomeIcon>
    </View>
    <Text style={styles.loremIpsum3}>({item.rating})</Text>
  </View>
)}
/>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(176,163,163,1)",
    flexDirection: "row"
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
  icon3: {
    color: "rgba(116,98,98,1)",
    fontSize: 23,
    height: 23,
    width: 21
  },
  loremIpsum: {
    fontFamily: "roboto-100italic",
    color: "rgba(76,70,70,1)",
    marginLeft: 13,
    marginTop: 8
  },
  icon3Row: {
    height: 24,
    flexDirection: "row",
    flex: 1,
    marginRight: 86,
    marginLeft: 8,
    marginTop: 13
  },
  icon2: {
    color: "rgba(182,10,10,1)",
    fontSize: 32,
    height: 32,
    width: 27,
    marginLeft: 14,
    marginTop: 8
  },
  rect4Row: {
    height: 48,
    flexDirection: "row",
    flex: 1,
    marginRight: 22,
    marginLeft: 12,
    marginTop: 13
  },
  rect2: {
    top: 0,
    left: 0,
    width: 360,
    height: 88,
    position: "absolute",
    backgroundColor: "rgba(136,19,19,1)",
    borderWidth: 1,
    flexDirection: "row"
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 56,
    height: 56,
    position: "absolute"
  },
  icon: {
    top: 6,
    left: 7,
    position: "absolute",
    color: "rgba(120,10,10,1)",
    fontSize: 40,
    height: 44,
    width: 40
  },
  ellipseStack: {
    width: 56,
    height: 56
  },
  home: {
    fontFamily: "roboto-700",
    color: "rgba(249,242,242,1)",
    fontSize: 24,
    marginLeft: 25,
    marginTop: 10
  },
  icon4: {
    color: "rgba(248,238,238,1)",
    fontSize: 32,
    height: 32,
    width: 32,
    marginLeft: 100,
    marginTop: 10
  },
  icon5: {
    color: "rgba(242,235,235,1)",
    fontSize: 32,
    height: 35,
    width: 32,
    marginLeft: 12,
    marginTop: 8
  },
  ellipseStackRow: {
    height: 56,
    flexDirection: "row",
    flex: 1,
    marginRight: 14,
    marginLeft: 21,
    marginTop: 15
  },
  rect3Stack: {
    height: 161,
    marginTop: 23
  },
  image: {
    top: 0,
    left: 0,
    width: 335,
    height: 175,
    position: "absolute",
    borderRadius: 16
  },
  majesticBanquet: {
    top: 173,
    left: 11,
    position: "absolute",
    fontFamily: "georgia-regular",
    color: "rgba(66,62,62,1)"
  },
  limit700Persons: {
    top: 191,
    left: 11,
    position: "absolute",
    fontFamily: "roboto-italic",
    color: "rgba(0,0,0,1)",
    fontSize: 12
  },
  imageStack: {
    top: 0,
    left: 0,
    width: 335,
    height: 207,
    position: "absolute"
  },
  loremIpsum2: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    height: 14,
    width: 119,
    textAlign: "left",
    fontSize: 11
  },
  icon6: {
    top: 11,
    left: 66,
    position: "absolute",
    color: "rgba(248,179,28,1)",
    fontSize: 20,
    height: 20,
    width: 19
  },
  loremIpsum2Stack: {
    top: 178,
    left: 210,
    width: 119,
    height: 31,
    position: "absolute"
  },
  loremIpsum3: {
    top: 192,
    left: 295,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(0,0,0,1)",
    fontSize: 12
  },
  imageStackStack: {
    width: 335,
    height: 209,
    marginTop: 11,
    marginLeft: 9
  },
  image1: {
    width: 335,
    height: 175,
    borderRadius: 16,
    marginTop: 18,
    marginLeft: 12
  },
  ayanHall: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "georgia-regular",
    color: "rgba(66,62,62,1)"
  },
  limit500Persons: {
    top: 18,
    left: 1,
    position: "absolute",
    fontFamily: "roboto-italic",
    color: "rgba(0,0,0,1)",
    fontSize: 12
  },
  ayanHallStack: {
    width: 84,
    height: 34,
    marginTop: 5
  },
  loremIpsum4: {
    fontFamily: "roboto-700",
    color: "#121212",
    height: 14,
    width: 119,
    textAlign: "left",
    fontSize: 11
  },
  icon7: {
    color: "rgba(248,179,28,1)",
    fontSize: 20,
    height: 20,
    width: 19
  },
  loremIpsum5: {
    fontFamily: "roboto-700",
    color: "rgba(0,0,0,1)",
    fontSize: 12,
    marginTop: 3
  },
  icon7Row: {
    height: 20,
    flexDirection: "row",
    marginLeft: 66,
    marginRight: 8
  },
  loremIpsum4Column: {
    width: 119,
    marginLeft: 125,
    marginBottom: 5
  },
  ayanHallStackRow: {
    height: 39,
    flexDirection: "row",
    marginTop: 6,
    marginLeft: 17,
    marginRight: 15
  },
  image2: {
    width: 335,
    height: 175,
    borderRadius: 16,
    marginLeft: 2138,
    marginTop: 117
  },
  rectRow: {
    height: 760,
    flexDirection: "row",
    flex: 1,
    marginRight: -2473
  }
});

export default SearchScreenPage;


