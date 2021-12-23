import React , {Component} from 'react'
import {View,Button,Text} from 'react-native'
import {styles} from './Header.component.style.js'
// import Icon from 'react-native-ionicons';
import { Icon } from 'react-native-elements'
// import { getHeaderTitle } from '@react-navigation/elements';

const Header = ({navigation}) => {
    // const title = getHeaderTitle(props.options, props.route.name);
        console.log(navigation)
        return(  
          
                    <Icon style={styles.icon} name='list' raised
                    type='font-awsome' size={20}  onPress={()=>{navigation.toggleDrawer()}} />
                
        )
    }

    export default Header;


