import React, { useState, Suspense } from "react";
import { SafeAreaView, View, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useStoreActions } from 'easy-peasy';

import { createDrawerNavigator, DrawerContentScrollView,DrawerItem} from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import NavigationHeader from './navComponents/drawerHeader'
import Header from '../header/Header'


// VENUE OWNER PAGES IMPORT
import VenueOwnerRegistrationPage from '../../screens/auth/Registration/VenueOwnerRegistrationPage';
import HallVideoPicturesPage from '../../screens/VenueOwnerScreens/HallVideosPictures';
import OwnerHallsPage from '../../screens/VenueOwnerScreens/OwnerHalls';
import NewVenueAdditionPage from '../../screens/VenueOwnerScreens/NewVenueAddition';
import NewVenueServicesPage from '../../screens/VenueOwnerScreens/NewVenueServices';
import OwnerDashboard from '../../screens/VenueOwnerScreens/OwnerDashboard';
import OwnerBookingPage from '../../screens/VenueOwnerScreens/OwnerBookings';
const VenueDashboard = React.lazy(()=> import('../../screens/VenueOwnerScreens/OwnerDashboard') )



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


// OWNER DRAWER NAVIGATION // 
const OwnerInterface = () => {
    return (
        <Drawer.Navigator initialRouteName="DashboardStack"
            screenOptions={({ navigation, route, options }) => ({
                headerStyle: {
                    backgroundColor: '#800000',
                    height: 70
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                overlayColor: 'transparent',

                header: (props) =>
                    <Header navigation={navigation} route={route} options={options} {...props} />,
            })}
            drawerContent={(props) => <CustomSidebar {...props} />}>
            <Drawer.Screen name="DashboardStack" options={{
                drawerLabel: 'Dashboard',
                title: 'Dashboard',
                activeTintColor: '#8b0000'}}>{(props) => <Suspense fallback={<Text>Loading...</Text>}><VenueDashboard {...props}/></Suspense>}</Drawer.Screen>
          

            <Drawer.Screen name="OwnerVenues" options={{
                drawerLabel: 'Your Venues',
                title: 'Your Venues',
                activeTintColor: '#8b0000',
            }} component={VenueListingAndAddition} />

            <Drawer.Screen name="OwnerBookings" options={{
                drawerLabel: 'Your Bookings',
                title: 'Your Bookings',
                activeTintColor: '#8b0000',
            }} component={OwnerBookingPage} />

        </Drawer.Navigator>
    );
}

const CustomSidebar = (props) => {
    const setPayload = useStoreActions((actions) => actions.setPayload);
    const { state, descriptors, navigation } = props;
    let lastGroupName = '';
    let newGroup = true;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationHeader />
            <DrawerContentScrollView {...props}>
                {state.routes.map((route) => {
                    const {
                        drawerLabel,
                        activeTintColor,
                        groupName
                    } = descriptors[route.key].options;
                    if (lastGroupName !== groupName) {
                        newGroup = true;
                        lastGroupName = groupName;
                    } else newGroup = false;
                    return (
                        <>
                            <DrawerItem
                                key={route.key}
                                label={
                                    ({ color }) =>
                                        <Text style={{ color }}>
                                            {drawerLabel}
                                        </Text>
                                }
                                focused={
                                    state.routes.findIndex(
                                        (e) => e.name === route.name
                                    ) === state.index
                                }
                                activeTintColor={activeTintColor}
                                onPress={() => navigation.navigate(route.name)}
                                // onItemPress={({ route, focused }) => {
                                //     if(!focused) {
                                //       setTimeout(() => {              
                                //         navigation.navigate(route.name)
                                //       }, 0)
                                //     }
                                //     props.navigation.navigate('DrawerClose');
                                //   }}
                            />

                        </>
                    );
                })}
                <DrawerItem
                    label="Logout"

                    onPress={() => {
                        navigation.toggleDrawer();
                        Alert.alert(
                            'Logout',
                            'Are you sure, you want to logout?',
                            [
                                {
                                    text: 'No',
                                    onPress: () => {
                                        return null;
                                    },
                                },
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        // AsyncStorage.clear();
                                        setPayload({})
                                        navigation.replace('Auth');
                                    },
                                },
                            ],
                            { cancelable: false },
                        );
                    }}
                />
            </DrawerContentScrollView>
        </SafeAreaView>
    );
};


// YOUR VENUES PAGE //
const VenueListingAndAddition = () => {
    return (
        <Stack.Navigator initialRouteName="VenueList">
            <Stack.Screen
                name="VenueList"
                component={OwnerHallsPage}
                options={{ title: 'Venue List', headerShown: false }}
            />
            <Stack.Screen
                name="AddNewVenue"
                component={NewVenueAdditionPage}
                options={{ title: 'Add New Venue', headerShown: false }}

            />
            <Stack.Screen
                name="VenuePicVideos"
                component={HallVideoPicturesPage}
                options={{ title: 'Add Pictures/Videos', headerShown: false }}

            />
            <Stack.Screen
                name="VenueInternalServices"
                component={NewVenueServicesPage}
                options={{ title: 'Add Internal Services', headerShown: false }}

            />
        </Stack.Navigator>
    )
}


export { OwnerInterface };
