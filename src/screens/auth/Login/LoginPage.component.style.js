import {StyleSheet} from 'react-native';
import { Dimensions } from "react-native";
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height; 

export const styles = StyleSheet.create({
  parentContainer:{
      flex:1,
      // alignItems:'stretch',

  },
  rect1: {
  flex:1
  },
  logo1: {
    width: 278,
    height: 111
  },
  endWrapperFiller: {
    flex: 1
  },
  hallFromHome2: {
    color: "rgba(248,231,28,1)",
    fontSize: 24,
    width: 315,
    height: 70,
    textAlign: "center",
    fontFamily: "dancing-script-regular",
    marginBottom: 28
  },
  rect4: {
    height: 8,
    backgroundColor: "rgba(236,241,243,1)",
    marginLeft: 21,
    marginRight: 21
  },
  rect1_imageStyle: {},
  // header:{
  //   flex:3,
  //   alignItems:'center',
  //   justifyContent:'center'
  // },
  body:{
    // flex:7
  },
  headText:{
      fontSize:24,
      alignSelf:'center',
      color:'black'
  },
 
  textField:{
      borderColor:'black',
      borderRadius: 20,
      borderWidth:50,
     
  },
  buttonField:{
      backgroundColor:'black',
      borderWidth:2,
      borderColor:'black',
      height:60,
      alignItems:'center',
      justifyContent:'center',
     
      borderRadius:40,
      opacity:0.65,
      marginTop:20
  },
  buttonTextStyle:{
    fontSize:20,
    color:'white',
    fontWeight: 'bold'
  },
  linksStyle:{
    color:'rgba(255,255,255,1)',
    opacity: 0.8,
    fontSize:14,
    textDecorationLine:'underline',
    alignSelf:'stretch',
    marginLeft: 20,
    marginTop: 10,
    marginBottom:10
  },
  
  somePlaceholderStyle:{
    marginLeft:40
  },
  button2: {
    height: 59,
    backgroundColor: "rgba(31,178,204,1)",
    borderRadius: 5,
    justifyContent: "center",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 14,
    marginBottom:14
  },
  text5: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 20,
    alignSelf: "center"
  }


})