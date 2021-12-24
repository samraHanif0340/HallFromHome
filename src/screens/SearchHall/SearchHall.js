import React, { Component , useEffect} from "react";
import { StyleSheet, View, Text, Image, FlatList, ImageBackground, StatusBar, TouchableHighlight } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Svg, { Ellipse } from "react-native-svg";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { SearchBar, Rating,Card } from 'react-native-elements';
import { TouchableOpacity } from "react-native";
// import SearchBar from "react-native-dynamic-search-bar";
import { Avatar, Button, Title, Paragraph } from 'react-native-paper';
import { Divider } from "react-native-elements";
import { BASE_URL } from '../../constants/constants'
import axios from 'axios';

function SearchPage(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setErrorFlag] = React.useState(false);
  let [searchText, setSearchText] = React.useState('')
  const [filteredData, setfilteredData] = React.useState([]);
  const [masterData, setmasterData] = React.useState([]);

  const source = axios.CancelToken.source();
  const configurationObject = {
    url: `${BASE_URL}GetVenueList`,
    method: "GET",
    cancelToken: source.token
    // data: { fullName, email },
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await axios(
        configurationObject
      );

      if (response.data.ResponseCode == "00") {
        setIsLoading(false);
        setmasterData(response.data.Result_DTO)
        setfilteredData(response.data.Result_DTO)
        
        // setmasterData([{
        //   hallId:1,
        //   hallName: "Majestic Banquet",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // },
        // {
        //   hallId:2,
        //   hallName: "Ayan Banquet",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // },
        // {
        //   hallId:3,
        //   hallName: "Modern Banquet",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // },
        // {
        //   hallId:4,
        //   hallName: "Magnolia Banquet",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // },
        // {
        //   hallId:5,
        //   hallName: "Diamond Palace",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // }])
        // setfilteredData([{
        //   hallId:1,
        //   hallName: "Majestic Banquet",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // },
        // {
        //   hallId:2,
        //   hallName: "Ayan Banquet",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // },
        // {
        //   hallId:3,
        //   hallName: "Modern Banquet",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // },
        // {
        //   hallId:4,
        //   hallName: "Magnolia Banquet",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // },
        // {
        //   hallId:5,
        //   hallName: "Diamond Palace",
        //   seatingCapacity: 700,
        //   price: "150,000 PKR",
        //   rating: 4.5,
        //   imgURL: "../../assets/images/download2.jpg"
        // }])
        return;
      } else {
        console.log(response)
        throw new Error("Failed to fetch records");
      }
    } catch (error) {
      // handle error
      if (axios.isCancel(error)) {
        console.log('Data fetching cancelled');
      } else {
        setErrorFlag(true);
        setIsLoading(false);
      }
      // alert(error.message);
    }
  };

  // function User({ userObject }) {
  //   return (
  //     <View>
  //       <Image
  //         source={{ uri: userObject.avatar }}
  //         style={{ width: 128, height: 128, borderRadius: 64 }}
  //       />
  //       <Text style={{ textAlign: "center", color: "white" }}>
  //         {`${userObject.first_name} ${userObject.last_name}`}
  //       </Text>
  //     </View>
  //   );
// }



useEffect(() => {
  getData();

  return () => source.cancel("Data fetching cancelled");
}, []);



const searchFilterFunction = (searchText) => {
  if (searchText) {

    const newData = masterData.filter(
      function (item) {
        const itemData = item.VenueName
          ? item.VenueName.toUpperCase()
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
        searchIcon={{ size: 25}}
        placeholder="Search for halls, banquets..."
        value={searchText}
        onChangeText={text => searchFilterFunction(text)}
        containerStyle={styles.searchBar}
        placeholderTextColor="black"
        leftIconContainerStyle={styles.searchBar.icon}
        // showLoading="true"
        inputStyle={styles.searchBar.inputStyle}
      />
      <FlatList

        data={filteredData}
        keyExtractor={item => item.vVenueID}
        renderItem={({ item }) => (
          <Card containerStyle={styles.cardStyle}>
          <View style={styles.imageStackStack}>
            <View style={styles.imageStack}>
              <TouchableOpacity activeOpacity={0.2} onPress={() => props.navigation.navigate('HallDetails',{VenueID:item.VenueID})}>
                <Image
                  source = {{ uri: item.ImageURL}}
                  resizeMode="stretch"
                  style={styles.image}
                ></Image>
              </TouchableOpacity>

              <Text style={styles.majesticBanquet}>{item.VenueName} ({item.VenueTypeDesc})</Text>
              <Text style={styles.limit700Persons}>Limit {item.MaxCapacity} Persons</Text>
            </View>
            <View style={styles.loremIpsum2Stack}>
              <Text style={styles.loremIpsum2}>PKR {item.RentPrice}</Text>
              <FontAwesomeIcon
                name="star"
                style={styles.icon6}
              ></FontAwesomeIcon>
            </View>
            <Text style={styles.loremIpsum3}>({item.Rating})</Text>

          </View>
          </Card>
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
  cardStyle:{
    // borderColor:'#800000',
    // borderWidth:3,
    borderRadius:10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.5,
    shadowRadius: 4,
    elevation: 5,
  },

  rect: {
    flex: 1,
  },
  searchBar: {
    // backgroundColor: '#800000',
    opacity: 1,
    borderColor:'#800000',
    borderWidth:3,
    icon: {
      color: 'black'
    },
    inputStyle: {
      color: 'black'
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
    // top: 0,
    
    // width: 355,
    // height: 175,
    // borderRadius: 5
    // marginRigth:8,
   
    width: 335,
    height: 175,
    borderRadius: 5
  },
  majesticBanquet: {
    top: 173,
    // left: -11,
    fontSize: 15,
    fontWeight: 'bold',
    position: "absolute",
    fontFamily: "georgia-regular",
    color: "black"
  },
  limit700Persons: {
    top: 191,
    // left: -11,
    position: "absolute",
    fontFamily: "roboto-italic",
    color: "black",
    fontSize: 11
  },
  imageStack: {
    top: 0,
    // left: 0,
    width: 344,
    height: 207,
    position: "absolute",

  },
  loremIpsum2: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "black",
    height: 14,
    width: 139,
    textAlign: "left",
    fontSize: 11
  },
  icon6: {
    top: 15,
    // left: 18,
    position: "absolute",
    color: "rgba(248,179,28,1)",
    fontSize: 15,
    height: 20,
    width: 19
  },
  loremIpsum2Stack: {
    top: 178,
    left: 260,
    width: 109,
    height: 20,
    position: "absolute"
  },
  loremIpsum3: {
    top: 192,
    left: 297,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "black",
    fontSize: 11
  },
  imageStackStack: {
    width: 499,
    height: 209,
    // marginTop: 11,
    // marginLeft: 20,
    // marginRight: 20,

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


