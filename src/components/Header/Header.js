import React , {Component, useEffect} from 'react'
import {View,Button,Text} from 'react-native'
import {styles} from './Header.component.style.js'
// import Icon from 'react-native-ionicons';
import { Icon } from 'react-native-elements'
import { getHeaderTitle } from '@react-navigation/elements';
import {useRoute} from '@react-navigation/native';


import { useStoreActions, useStoreState } from 'easy-peasy';



const Header = ({navigation,route,options}) => {
const globalStack = useStoreState((state) => state.stackDetails);
const setGlobalStack = useStoreActions((actions) => actions.setStackDetails);
const routeDetails = useRoute()

useEffect(()=>{
    if(routeDetails.name == 'SearchHallStack'){

    }
    else{
        setGlobalStack({})
    }
},[navigation])

    console.log('global stack',globalStack)
    const title = getHeaderTitle(options, route.name);
    console.log(title)
   
        return(  
            // <View style={styles.drawerHeader}>
            //    { globalStack && globalStack.type == 'stack'  &&  globalStack.level > 0 ?   <Icon  name='arrow-left' raised
            //         type='font-awsome' size={20} onPress={()=>{globalStack.navigation.popToTop()} }/> : 
            //      <Icon  name='list' raised
            //         type='font-awsome' size={20}  onPress={()=>{navigation.toggleDrawer()}} /> }
            //     <Text style={styles.drawerTitle}>{ globalStack && globalStack.type == 'stack' && globalStack.title ? globalStack.title : title}</Text>
            // </View>

<View style={styles.drawerHeader}>
{ globalStack && globalStack.type == 'stack'  &&  globalStack.level > 0 ?   <Icon  name='arrow-left' raised
     type='font-awsome' size={20} onPress={()=>{globalStack.navigation.popToTop()} }/> : 
  <Icon  name='list' raised
     type='font-awsome' size={20}  onPress={()=>{navigation.toggleDrawer()}} /> }
 <Text style={styles.drawerTitle}>{ globalStack && globalStack.type == 'stack' && globalStack.title ? globalStack.title : title}</Text>
</View>
                   
                
        )
    }

    export default Header;


