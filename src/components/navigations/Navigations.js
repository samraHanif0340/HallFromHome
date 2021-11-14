
import React from "react";

import {
  createDrawerNavigator, DrawerContentScrollView,
  DrawerItem
} from "@react-navigation/drawer";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

import SearchPage from '../../screens/Search-Hall/SearchHall';
import HallDetailPage from '../../screens/Hall-Details-Page/HallDetailsPage';

import HallReviewsPage from '../../screens/HallDetailChilds/ReviewsPage';

import LoginPage from '../../screens/auth/Login/LoginPage';


// import { ContactStackNavigator } from "./StackNavigator";
// import TabNavigator from "./TabNavigator";

// DRAWER NAVIGATION // 
const Drawer = createDrawerNavigator();

const CustomerDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomSidebar {...props} />}>
      <Drawer.Screen name="Home" options={{
        drawerLabel: 'Home',
        // groupName: 'Category 1',
        activeTintColor: '#FF6F00',
      }}
        component={SearchPage} />
      <Drawer.Screen name="Hall Details" options={{
        drawerLabel: 'Hall Details',
        // groupName: 'Category 1',
        activeTintColor: '#FF6F00',
      }}
        component={HallDetailPage} />
      <Drawer.Screen name="Tracking/Status" options={{
        drawerLabel: 'Tracking/Status',
        activeTintColor: '#FF6F00',
      }}
        component={SearchPage} />
      <Drawer.Screen name="Lodge Complaint/Feedback" options={{
        drawerLabel: 'Lodge Complaint/Feedback',
        activeTintColor: '#FF6F00',
      }}
        component={SearchPage} />
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
                onPress={() => navigation.navigate('Login')}
              />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

// export default DrawerNavigator;

const Tab = createMaterialTopTabNavigator();

const HallDetailTabs = () => {
  return (
    <Tab.Navigator>
    <Tab.Screen name="Details" component={HallReviewsPage} />
    <Tab.Screen name="Add ons" component={HallReviewsPage} />
    <Tab.Screen name="Reviews" component={HallReviewsPage} />
  </Tab.Navigator>
  );
}

export { CustomerDrawerNavigator,HallDetailTabs};



const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
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