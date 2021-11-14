import {StyleSheet} from 'react-native';
import { Dimensions } from "react-native";
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height; 

export const styles = StyleSheet.create({
  parentContainer:{
      flex:1,
      flexDirection:'column',
      alignItems:'stretch',

  },
  header:{
    flex:3,
    alignItems:'center',
    justifyContent:'center'
  },
  body:{
    flex:7
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
    color:'navy',
    opacity: 0.8,
    fontSize:14,
    textDecorationLine:'underline',
    alignSelf:'stretch',
    marginLeft:10
  },
  
  somePlaceholderStyle:{
    marginLeft:40
  }
  


})