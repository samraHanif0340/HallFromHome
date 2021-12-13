
import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet,Alert } from 'react-native';

import {
  createDrawerNavigator, DrawerContentScrollView,
  DrawerItem
} from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';



import SearchPage from '../../screens/SearchHall/SearchHall';
import HallDetailPage from '../../screens/HallDetailsPage/HallDetailsPage';
import TrackingStatusPage from '../../screens/TrackingStatus/TrackingStatus';
import LodgeComplaintPage from '../../screens/LodgeComplaint/LodgeComplaint';



import HallReviewsPage from '../../screens/HallDetailChilds/ReviewsPage';
import DetailOfHallPage from '../../screens/HallDetailChilds/DetailsPage';


import LoginPage from '../../screens/auth/Login/LoginPage';
import RegistrationPage from '../../screens/auth/Registration/RegistrationPage';


// AUTH ROUTES //
const Stack = createStackNavigator();
const AuthRoutes = () => {
  return (
<Stack.Navigator>
      <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="Customer Registration"
            component={RegistrationPage}
            options={{ headerShown: false }}
          />
             <Stack.Screen
            name="Forgot Password"
            component={RegistrationPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
  )
}


// DRAWER NAVIGATION // 
const Drawer = createDrawerNavigator();

const CustomerDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomSidebar {...props} />}>
      <Drawer.Screen  name="Home" options={{
        drawerLabel: 'Home',
        // groupName: 'Category 1',
        //activeTintColor: '#FF6F00',
        activeTintColor: '#8b0000',
      }} component={SearchPage} />


      <Drawer.Screen name="Hall Details" options={{
        drawerLabel: 'Hall Details',
        // groupName: 'Category 1',
        //activeTintColor: '#FF6F00',
        activeTintColor: '#8b0000',
      }}
        component={HallDetailPage} />


     <Drawer.Screen name="Tracking/Status"  options={{
        drawerLabel: 'Tracking/Status',
        //activeTintColor: '#FF6F00',
        activeTintColor: '#8b0000',
      }}
        component={TrackingStatusPage} />


        
      <Drawer.Screen name="Lodge Complaint/Feedback" options={{
        drawerLabel: 'Lodge Complaint/Feedback',
        activeTintColor: '#FF6F00',
      }}
        component={LodgeComplaintPage} />

      <Drawer.Screen name="Personalize Settings" options={{
        drawerLabel: 'Personalize Settings',
        activeTintColor: '#FF6F00',
      }} component={SearchPage} />

      <Drawer.Screen name="Notifications" options={{
        drawerLabel: 'Notifications',
        activeTintColor: '#FF6F00',
      }} component={SearchPage} />


    </Drawer.Navigator>
  );
}
const CustomSidebar = (props) => {
  const { state, descriptors, navigation } = props;
  let lastGroupName = '';
  let newGroup = true;
  return (
    <SafeAreaView style={{ flex: 1 }}>
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

// HALL DETAILS TABS //
const Tab = createMaterialTopTabNavigator();

const HallDetailTabs = (props) => {
  console.log(props)
  const [hallId,setHallId] = useState(props.venueID)
  return (
    <Tab.Navigator
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
     
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      })}
    >
    <Tab.Screen name="Details">{() => <DetailOfHallPage  venueID={props.venueID} />}</Tab.Screen>
    <Tab.Screen name="Add ons" component={HallReviewsPage} />
    <Tab.Screen name="Reviews" >{() => <HallReviewsPage  venueID={props.venueID} />}</Tab.Screen>
  </Tab.Navigator>
  );
}

export { CustomerDrawerNavigator,HallDetailTabs,AuthRoutes};


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