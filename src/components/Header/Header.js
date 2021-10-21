import React , {Component} from 'react'
import {View,Button,Text} from 'react-native'
import {styles} from './Header.component.style.js'
// import Icon from 'react-native-ionicons';
import { Icon } from 'react-native-elements'

 class Header extends Component{
    render(){
        
        return(  
                    <Icon style={styles.icon} name='list' raised
                    type='font-awsome' size={30}  onPress={()=>{this.props.navigation.toggleDrawer()}} />
        )
    }
}
export default Header;


