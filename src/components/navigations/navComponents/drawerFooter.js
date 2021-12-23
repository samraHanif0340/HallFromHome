import React , {Component} from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import styles from '../../Styles/General.component.style.js'

class NavigationFooter extends Component{
    render(){
        return(
            
       <View style={styles.footerContainer}>
           <View style={styles.footerLeftColumn}>
               <Text>2019 SYSHCM.</Text>  
           <Text>2019 SYSHCM.</Text>  
           </View>
{/*               
           <Image   
           style={styles.footerRightColumn}
              source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}/> */}
        </View>
      
        )
    }
}

export default NavigationFooter;


//  const styles = StyleSheet.create({
//     footerContainer:{
//         flex: 1,
//         flexDirection:"row",
//         backgroundColor:"black"
//     },
//     footerLeftColumn:{
//         flex:1,
//         backgroundColor:"red"
//     },
//     footerRightColumn:{
//         flex:1,
//         backgroundColor:"orange"
//     }
// })