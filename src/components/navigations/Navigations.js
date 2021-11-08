
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import SearchPage from '../../screens/Search-Hall/SearchHall';
import HallDetailPage from '../../screens/Hall-Details-Page/HallDetailsPage';

// import { ContactStackNavigator } from "./StackNavigator";
// import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={SearchPage} />
    <Drawer.Screen name="Hall Details" component={HallDetailPage} />
    <Drawer.Screen name="Tracking/Status" component={SearchPage} />
    <Drawer.Screen name="Lodge Complaint/Feedback" component={SearchPage} />
    <Drawer.Screen name="Personalize Settings" component={SearchPage} />
    <Drawer.Screen name="Notifications" component={SearchPage} />
    <Drawer.Screen name="Logout" component={SearchPage} />
  </Drawer.Navigator>
  );
}

export default DrawerNavigator;