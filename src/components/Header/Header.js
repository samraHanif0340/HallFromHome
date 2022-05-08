import React, { Component, useEffect } from 'react'
import { View, Text } from 'react-native'
import { styles } from './Header.component.style.js'
import { Icon } from 'react-native-elements'
import { getHeaderTitle } from '@react-navigation/elements';
import { useRoute } from '@react-navigation/native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Header = ({ navigation, route, options }) => {
    const globalStack = useStoreState((state) => state.stackDetails);
    const setGlobalStack = useStoreActions((actions) => actions.setStackDetails);
    const routeDetails = useRoute()

    useEffect(() => {
        if (routeDetails.name == 'SearchHallStack') {

        }
        else {
            setGlobalStack({})
        }
    }, [navigation])

    // console.log('global stack', globalStack)
    const title = getHeaderTitle(options, route.name);

    return (

        <View style={styles.drawerHeader}>
            {globalStack && globalStack.type == 'stack' && globalStack.level > 0 ? <Icon color="#800000" name='arrow-left' raised
                type='font-awsome' size={20} onPress={() => { globalStack.navigation.popToTop() }} /> :
                
                <Icon name='list' raised
                    type='font-awsome'  size={25} color="#800000" onPress={() => { navigation.toggleDrawer() }} />}
            <Text style={styles.drawerTitle}>{globalStack && globalStack.type == 'stack' && globalStack.title ? globalStack.title.toUpperCase() : title.toUpperCase()}</Text>
        </View>


    )
}
export default Header;


