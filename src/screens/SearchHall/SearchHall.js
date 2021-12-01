import React, { Component } from "react";
import { StyleSheet, View, Text, Image, FlatList, ImageBackground, StatusBar, TouchableHighlight } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Svg, { Ellipse } from "react-native-svg";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { SearchBar, Rating } from 'react-native-elements';
import { TouchableOpacity } from "react-native";
// import SearchBar from "react-native-dynamic-search-bar";

function SearchPage(props) {
  const [filteredData, setfilteredData] = React.useState([{
    hallName: "Majestic Banquet",
    seatingCapacity: 700,
    price: "150,000 PKR",
    rating: 4.5,
    imgURL: "../../assets/images/download2.jpg"
  },
  {
    hallName: "Ayan Banquet",
    seatingCapacity: 700,
    price: "150,000 PKR",
    rating: 4.5,
    imgURL: "../../assets/images/download2.jpg"
  },
  {
    hallName: "Modern Banquet",
    seatingCapacity: 700,
    price: "150,000 PKR",
    rating: 4.5,
    imgURL: "../../assets/images/download2.jpg"
  },
  {
    hallName: "Magnolia Banquet",
    seatingCapacity: 700,
    price: "150,000 PKR",
    rating: 4.5,
    imgURL: "../../assets/images/download2.jpg"
  },
  {
    hallName: "Diamond Palace",
    seatingCapacity: 700,
    price: "150,000 PKR",
    rating: 4.5,
    imgURL: "../../assets/images/download2.jpg"
  }]);
  const [masterData, setmasterData] = React.useState([{
    hallName: "Majestic Banquet",
    seatingCapacity: 700,
    price: "150,000 PKR",
    rating: 4.5,
    imgURL: "../../assets/images/download2.jpg"
  },
  {
    hallName: "Ayan Banquet",
    seatingCapacity: 700,
    price: "150,000 PKR",
    rating: 4.5,
    imgURL: "../../assets/images/download2.jpg"
  },
  {
    hallName: "Modern Banquet",
    seatingCapacity: 700,
    price: "150,000 PKR",
    rating: 4.5,
    imgURL: "../../assets/images/download2.jpg"
  },
  {
    hallName: "Magnolia Banquet",
    seatingCapacity: 700,
    price: "150,000 PKR",
    rating: 4.5,
    imgURL: "../../assets/images/download2.jpg"
  },
  {
    hallName: "Diamond Palace",
    seatingCapacity: 700,
    price: "150,000 PKR",
    rating: 4.5,
    imgURL: "../../assets/images/download2.jpg"
  }]);
  // let [hallList, setHallList] = React.useState([
  //   {
  //     hallName: "Majestic Banquet",
  //     seatingCapacity: 700,
  //     price: "150,000 PKR",
  //     rating: 4.5,
  //     imgURL: "../../assets/images/download2.jpg"
  //   },
  //   {
  //     hallName: "Ayan Banquet",
  //     seatingCapacity: 700,
  //     price: "150,000 PKR",
  //     rating: 4.5,
  //     imgURL: "../../assets/images/download2.jpg"
  //   },
  //   {
  //     hallName: "Modern Banquet",
  //     seatingCapacity: 700,
  //     price: "150,000 PKR",
  //     rating: 4.5,
  //     imgURL: "../../assets/images/download2.jpg"
  //   },
  //   {
  //     hallName: "Magnolia Banquet",
  //     seatingCapacity: 700,
  //     price: "150,000 PKR",
  //     rating: 4.5,
  //     imgURL: "../../assets/images/download2.jpg"
  //   },
  //   {
  //     hallName: "Diamond Palace",
  //     seatingCapacity: 700,
  //     price: "150,000 PKR",
  //     rating: 4.5,
  //     imgURL: "../../assets/images/download2.jpg"
  //   }
  // ])

  let [searchText, setSearchText] = React.useState('')


  // const searchFilterFunction = (searchText) => {
  //   if (searchText) {
  //     const newData = hallList.filter((eachRow) => {
  //       return eachRow.hallName ? eachRow.hallName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 : hallList
  //     })
  //     setSearchText(searchText);
  //   setHallList(newData);
  //   }
  //   else{
  //     setSearchText(searchText);
  //     setHallList(hallList);
  //   }

  // }

  const searchFilterFunction = (searchText) => {
    if (searchText) {

      const newData = masterData.filter(
        function (item) {
          const itemData = item.hallName
            ? item.hallName.toUpperCase()
            : ''.toUpperCase();
          const textData = searchText.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setfilteredData(newData);
      setSearchText(searchText);
    } else {
      setfilteredData(masterData);
      setSearchText(searchText);
    }
  };

  // const searchFilterFunction = text => {
  //   const formattedQuery = text.toLowerCase();
  //   const filteredData = filter(fullData, user => {
  //     return contains(user, formattedQuery);
  //   });
  //   setData(filteredData);
  //   setQuery(text);
  // };

  // const contains = ({ name, email }, query) => {
  //   const { first, last } = name;

  //   if (first.includes(query) || last.includes(query) || email.includes(query)) {
  //     return true;
  //   }

  //   return false;
  // };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <ImageBackground
        style={styles.rect1}
        imageStyle={styles.rect1_imageStyle}
        source={require("../../assets/images/Gradient_MI39RPu.png")}
      >
  

        <SearchBar
          lightTheme
          searchIcon={{ size: 24 }}
          placeholder="Search for halls, banquets..."
          value={searchText}
          onChangeText={text => searchFilterFunction(text)}
          containerStyle={styles.searchBar}
          placeholderTextColor="white"
          leftIconContainerStyle={styles.searchBar.icon}
          // showLoading="true"
          inputStyle={styles.searchBar.inputStyle}
        />
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <View style={styles.imageStackStack}>
              <View style={styles.imageStack}>
                <TouchableOpacity activeOpacity={0.2} onPress={() => props.navigation.navigate('Hall Details')}>
                  <Image
                    source={require("../../assets/images/download2.jpg")}
                    // source={{ uri: item.imgURL }}

                    resizeMode="contain"
                    style={styles.image}
                  ></Image>
                </TouchableOpacity>

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

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  rect: {
    flex: 1,
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
    borderRadius: 10
  },
  majesticBanquet: {
    top: 173,
    left: 11,
    position: "absolute",
    fontFamily: "georgia-regular",
    color: "rgba(255,255,255,1)"
  },
  limit700Persons: {
    top: 191,
    left: 11,
    position: "absolute",
    fontFamily: "roboto-italic",
    color: "rgba(255,255,255,1)",
    fontSize: 12
  },
  imageStack: {
    top: 0,
    left: 0,
    width: 335,
    height: 207,
    position: "absolute",

  },
  loremIpsum2: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
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
    color: "rgba(255,255,255,1)",
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

export default SearchPage;


