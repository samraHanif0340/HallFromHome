
import React, { useState,Suspense } from "react";
import { SafeAreaView, View, Text, StyleSheet,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useStoreActions } from 'easy-peasy';

import {
  createDrawerNavigator, DrawerContentScrollView,
  DrawerItem
} from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import NavigationHeader from './navComponents/drawerHeader'
import Header from '../header/Header'
import CustomerDashboardPage from '../../screens/CustomerDashboard/CustomerDashboard';
import SearchPage from '../../screens/SearchHall/SearchHall';
import SearchByMaps from '../../screens/SearchHall/SearchByMaps';
import HallDetailPage from '../../screens/HallDetailsPage/HallDetailsPage';
import TrackingStatusPage from '../../screens/TrackingStatus/TrackingStatus';
import LodgeReviewPage from '../../screens/LodgeComplaint/LodgeComplaint';
import LodgeCamplaintListPage from '../../screens/LodgeComplaint/LodgeCamplaintList';

import HallReviewsPage from '../../screens/HallDetailChilds/ReviewsPage';
import DetailOfHallPage from '../../screens/HallDetailChilds/DetailsPage';
import AddonsPage from '../../screens/HallDetailChilds/AddonsPage';
import CustomerBookingPage from '../../screens/BookingDetails/CustomerBookingPage';
import NewVenueServicesPage from '../../screens/BookingDetails/NewVenueServices';

import LoginPage from '../../screens/auth/Login/LoginPage';
import RegistrationPage from '../../screens/auth/Registration/RegistrationPage';


import BookingConfirmedPage from '../sharedComponents/BookingConfirmedPage'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// VENUE OWNER PAGES IMPORT
import VenueOwnerRegistrationPage from '../../screens/auth/Registration/VenueOwnerRegistrationPage';
import HallVideoPicturesPage from '../../screens/VenueOwnerScreens/HallVideosPictures';
import OwnerHallsPage from '../../screens/VenueOwnerScreens/OwnerHalls';
import NewVenueAdditionPage from '../../screens/VenueOwnerScreens/NewVenueAddition';
import { TouchableOpacity } from "react-native-gesture-handler";


const VenueDashboard = React.lazy(()=> import('../../screens/VenueOwnerScreens/OwnerDashboard') )
// const VenueOwnerHalls = React.lazy(()=> import('../../screens/VenueOwnerScreens/OwnerHalls') )
// const VenueAdditionPage = React.lazy(()=> import('../../screens/VenueOwnerScreens/NewVenueAddition') )
const VenuePicsVideos =  React.lazy(()=> import('../../screens/VenueOwnerScreens/HallVideosPictures') )
const Tab = createMaterialTopTabNavigator();
const OwnerTabs = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
// AUTH ROUTES //
const AuthRoutes = () => {
  return (
<Stack.Navigator>
      <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="CustomerRegistration"
            component={RegistrationPage}
            options={{ headerShown: false }}
          />
             <Stack.Screen
            name="ForgotPassword"
            component={RegistrationPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
  )
}

// DRAWER NAVIGATION // 
const CustomerDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="SearchHallStack" 
    screenOptions={({ navigation,route,options }) => ({
      headerStyle: {
        backgroundColor: '#800000',
        height:70
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      overlayColor: 'transparent',
 
      header:  (props) => 
<Header navigation={navigation} route={route} options={options} {...props}/>,
    })}
     drawerContent={(props) => <CustomSidebar {...props} />}>
      <Drawer.Screen  name="SearchHallStack" options={{
        drawerLabel: 'Home',
        title:'Home',
        // groupName: 'Category 1',
        //activeTintColor: '#FF6F00',
        activeTintColor: '#8b0000',
      }} component={SearchHallStack} />

<Drawer.Screen  name="CustomerDashboard" options={{
        drawerLabel: 'Dashboard',
        title: 'Dashboard',
        // groupName: 'Category 1',
        //activeTintColor: '#FF6F00',
        activeTintColor: '#8b0000',
      }} component={CustomerDashboardPage} />

<Drawer.Screen  name="Venue Internal Services" options={{
        drawerLabel: 'Venue Internal Services',
        title: 'Venue Internal Services',
        // groupName: 'Category 1',
        //activeTintColor: '#FF6F00',
        activeTintColor: '#8b0000',
      }} component={NewVenueServicesPage} />

     <Drawer.Screen name="Tracking/Status"  options={{
        drawerLabel: 'Tracking/Status',
        title: 'Tracking/Status',

        //activeTintColor: '#FF6F00',
        activeTintColor: '#8b0000',
      }}
        component={TrackingStatusPage} />
<Drawer.Screen name="Venue Owner Registration"  options={{
        drawerLabel: 'Venue Owner Registration',
        title: 'Venue Owner Registration',
        activeTintColor: '#8b0000',
      }}
        component={VenueOwnerRegistrationPage} />
        
      <Drawer.Screen name="Review/Feedback" options={{
        drawerLabel: 'Review/Feedback',
        title: 'Review/Feedback',

        activeTintColor: '#8b0000',
      }}
        component={LodgeReviewPage} />
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
      <NavigationHeader/>
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
              {/* {newGroup ? (
                <View style={styles.sectionView}>
                  <Text key={groupName} style={{ marginLeft: 10 }}>
                    {groupName}
                  </Text>
                  <View style={styles.separatorLine} />
                </View>
              ) : null} */}
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
            {cancelable: false},
          );
        }}
              />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const SearchHallStack = () => {
  return (
<Stack.Navigator initialRouteName="Home" >
      <Stack.Screen   
            name="Home"
            component={SearchPage}
            options={{title: 'Home', headerShown: false }}
          />
           <Stack.Screen
  
            name="HallDetails"
            component={HallDetailPage}
 
  options={{ title: 'Venue Details' ,  headerShown:false, }}
          />
        </Stack.Navigator>
  )
}

const BookingConfirmStack = () => {
  return (
<Stack.Navigator initialRouteName="CustomerBooking">
      <Stack.Screen
            name="CustomerBooking"
            component={CustomerBookingPage}
            options={{ title: 'Add Booking Details', headerShown: false }}
          />
           <Stack.Screen
            name="BookingConfirm"
            component={BookingConfirmedPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
  )
}

// HALL DETAILS TABS //
const HallDetailTabs = (props) => {
  console.log(props)
  const [hallId,setHallId] = useState(props.venueID)
  return (
    <Tab.Navigator
    lazy={true}
    removeClippedSubviews={true}
    swipeEnabled={false} 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        }
        // return <Ionicons name={iconName} size={size} color={color} />;
      },
     
      tabBarActiveTintColor: 'rgba(248,231,28,1)',
      tabBarInactiveTintColor: 'rgba(157,24,24,0.8)',
     
      })}
    >
    <Tab.Screen name="Details"  options={{tabBarIcon: ({ tintColor ,focused}) => (<Icon name="list-ul"   color={{ tintColor }} size={25} transform={{ rotate: 42 }}/>) }}>{() => <DetailOfHallPage  venueID={props.venueID} />}</Tab.Screen>
    <Tab.Screen name="Add ons" options={{tabBarIcon: ({ tintColor ,focused}) => (<Icon name="plus-circle" color={{ tintColor }} size={25} transform={{ rotate: 42 }}/>) }}>{() => <AddonsPage  venueID={props.venueID} />}</Tab.Screen>
    <Tab.Screen name="Reviews" options={{tabBarIcon: ({ tintColor ,focused}) => (<Icon name="thumbs-up" color={{ tintColor }} size={25} transform={{ rotate: 42 }}/>) }}>{() => <HallReviewsPage  venueID={props.venueID} />}</Tab.Screen>
  </Tab.Navigator>
  );
}

// VENUE OWNER V=NAVIGATIONS
// TAB NAVIGATORS
const VenueOwnerTabs = (props) => {
  return (
    <OwnerTabs.Navigator
    lazy={true}
    removeClippedSubviews={true}
    swipeEnabled={false} 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        }
        // return <Ionicons name={iconName} size={size} color={color} />;
      },  
      tabBarActiveTintColor: 'rgba(248,231,28,1)',
      tabBarInactiveTintColor: 'rgba(157,24,24,0.8)',    
      })}
    >
    <OwnerTabs.Screen name="Dashboard"  options={{tabBarIcon: ({ tintColor ,focused}) => (<Icon name="list-ul"   color={{ tintColor }} size={25} transform={{ rotate: 42 }}/>) }}>{() => <Suspense fallback={<Text>Loading...</Text>}><VenueDashboard /></Suspense>}</OwnerTabs.Screen>
    <OwnerTabs.Screen name="Your Halls" options={{tabBarIcon: ({ tintColor ,focused}) => (<Icon name="plus-circle" color={{ tintColor }} size={25} transform={{ rotate: 42 }}/>) }}>{()=> <VenueListingAndAddition/>}</OwnerTabs.Screen>
    <OwnerTabs.Screen name="Profile" options={{tabBarIcon: ({ tintColor ,focused}) => (<Icon name="thumbs-up" color={{ tintColor }} size={25} transform={{ rotate: 42 }}/>) }}>{() => <Suspense fallback={<Text>Loading...</Text>}><VenueDashboard /></Suspense>}</OwnerTabs.Screen>
    {/* <TouchableOpacity><Text>Logout</Text></TouchableOpacity> */}
    {/* <OwnerTabs.Screen name="Logout"  options={
      {
        tabPress:() => {
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
            {cancelable: false},
          )}}}></OwnerTabs.Screen> */}

  </OwnerTabs.Navigator>
  );
}

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
        </Stack.Navigator>
  )
}


export { CustomerDrawerNavigator,HallDetailTabs,AuthRoutes,BookingConfirmStack,SearchHallStack,VenueOwnerTabs};


const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  HeaderColor: {
    flex: 1,
    alignItems: 'right',
    justifyContent: 'left',
    padding: 10,
    color: 'red',
   
  },

  sectionView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  separatorLine: {
    flex: 1,
    backgroundColor: 'black',
    height: 1.2,
    marginLeft: 12,
    marginRight: 24,
  },

});