import {StyleSheet} from 'react-native';
import { Dimensions } from "react-native";
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height; 

export const styles = StyleSheet.create({
    headerContainer:{    
        backgroundColor:'#800000'
    },
    drawerHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#800000',
        alignItems:'center'
        // alignSelft:"flex-start"
    },
    drawerTitle:{
        flex:3,
        color:'floralwhite',
        fontWeight:'bold',
        fontSize:18,
        textAlign:'center'
    }

})