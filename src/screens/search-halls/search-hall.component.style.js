import {StyleSheet} from 'react-native';
import { Dimensions } from "react-native";
import { SearchBar } from 'react-native-elements';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height; 

export const styles = StyleSheet.create({
    parentContainer:{    
        flex:1,
        flexDirection: 'column',
        backgroundColor: '#E4E8E9',
        color:'white',
       
    },
    childOneContainer:{
        backgroundColor: '#C3171D',
        flex:1.25,
        flexDirection:'row',
        alignItems:'stretch',
        justifyContent:'space-between',
  
       
    },
    headerText:{
        fontSize:24,
        color:'white',
        alignSelf:'center',
        marginRight:145
    },
   
    childTwoContainer:{
        // backgroundColor: '#171819',    
        backgroundColor:'white',
        flex:8.75,
        flexDirection:'column',
        color:'white' ,
 
    },
    subChildTwoContainer:{  
        flex:3,      
        flexDirection:'row',
        justifyContent:'space-around',
        color:'white' ,
    },

    childThreeContainer:{
        backgroundColor: 'white', 
        flex:7,
        flexDirection:'column',
        justifyContent:'space-between',

        // width:700
    },
    subChildThreeOneContainer:{
        flex:4,
        backgroundColor: 'orange', 

    },
    subChildThreeTwoContainer:{
        flex:2,
        backgroundColor: 'brown',
        flexDirection:'row',
        justifyContent:'space-around' 
    },
    subChildThreeThreeContainer:{
        flex:4,
        backgroundColor: 'yellow', 
    },
    searchbar:{
        backgroundColor:'white',
        color:'black'
    },
    flatItem:{       
        // width:width,
        // height:300,
        
    },
    imageStyle:{
        width:'90%',
        height:225,
        borderRadius: 20,
        alignSelf:'center'
    },
    content:{
        flexDirection:'row',
        flex: 1
    },
    contentLeft:{
        alignSelf:'flex-start',
        marginLeft: 10,
        flex:3
    },
    contentRight:{
        marginRight:10,
        // marginTop:5,
        flex:3,    
        alignItems:'flex-end'
    },
    textLayout:{
        fontSize: 16,     
    },
    descriptionText:{
        fontSize: 11
    },


})