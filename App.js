/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { CustomerDrawerNavigator } from './src/components/navigations/Navigations';
import { AuthRoutes } from './src/components/navigations/Navigations';
import { BookingConfirmStack } from './src/components/navigations/Navigations';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import OwnerDashboard from './src/screens/VenueOwnerScreens/OwnerDashboard';

import { action, createStore, StoreProvider } from 'easy-peasy';

// To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
  GLOBAL.originalXMLHttpRequest :
  GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};


// const Drawer = createDrawerNavigator();


const Stack = createStackNavigator();
const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const App: () => Node = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  const store = createStore({
    payload: {},
    setPayload: action((state, payload) => {
      state.payload = payload
    }),
    appendPayload: action((state, payload) => {
      state.payload = { ...state.payload, ...payload };
    }),
    stackDetails: {},
    setStackDetails: action((state, payload) => {
      state.stackDetails = payload;
    })
  });

  return (
    <PaperProvider theme={theme}>
      <StoreProvider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Auth"
              component={AuthRoutes}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="BookingConfirmStack"
              component={BookingConfirmStack}
              options={{ title:'Add Booking Details', headerShown: false }}
            />
             <Stack.Screen
              name="OwnerDashboard"
              component={OwnerDashboard}
              options={{ title:'Dashboard', headerShown: true }}
            />
            {/* <Stack.Screen
            name="CustomerBooking"
            component={CustomerDrawerNavigator}
            options={{ headerShown: false }}
          /> */}
            <Stack.Screen
              name="CustomerDrawerNavigation"
              component={CustomerDrawerNavigator}
              options={{ headerShown: false }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
    </PaperProvider>
    // <SearchHall/>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
