import {StyleSheet} from 'react-native';


export const colors  = {
    primary: '#226B74',
    secondary: '#254B5A',
    tertiary: '#5DA6A7'
  }
  
  export const padding = {
    sm: 10,
    md: 20,
    lg: 30,
    xl: 40
  }
  
  export const fonts = {
    sm: 12,
    md: 18,
    lg: 28,
    primary: 'Cochin'
  }


 const styles = StyleSheet.create({
    footerContainer:{
        flex: 1,
        flexDirection:"row",
    },
    footerLeftColumn:{
        flex:1,
    },
    footerRightColumn:{
        flex:1,
        // height:50,
        // width:50
    },
    chartContainer:{
        borderColor:'black',
        borderWidth:10,
        alignItems:'center',
        justifyContent:'center',      
    },
    centerContainer:{
        flex:1,
        alignItems:'center',
        alignContent:'center'
    },
    imageStyle:{
        flex:1,
        height:100,
        width:100,
        borderWidth:3,
        borderRadius:50
    },
    errorMsg:{
        color:'red'
    },
    
    container:{
        flex:1,
        backgroundColor:'khaki'
    },
    textField:{
       
        // backgroundColor: 'grey',
        // color:'black',
        alignSelf:'stretch',
        borderWidth:2,
        opacity:0.4,
        borderRadius: 50,
        marginBottom:1,
        color:'black',
        height:50,
        textAlign:'center'
        
    },
    ButtonField:{
        color:'black',
        backgroundColor:'orange',

    },
    label:{
        marginLeft: 20
    },
      
})

export default styles;