import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';

import {Loader} from '../../components/customComponents/customComponents';

const ContactUsPage = props => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <View style={styles.mainView}>
        <Text style={styles.contactus}>
          Email Us: support.it@hallfromhome.com
        </Text>
      </View>
      <View style={styles.mainView}>
        <Text style={styles.contactus}>Contact Us: +92 344 5656565</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleWrapper: {
    width: 278,
    height: 111,
    alignContent: 'center',
    textAlign: 'center',
  },
  title: {
    color: 'black',
    fontSize: 40,
    width: 335,
    height: 70,
    flex: 1,
    fontFamily: 'cursive',
    marginLeft: 30,
    marginTop: 30,
    marginRight: 30,
    alignContent: 'center',
    textAlign: 'center',
    //fontFamily: "dancing-script-regular",
    marginBottom: 28,
  },
  submitButtonWrapper: {
    height: 59,
    //backgroundColor: "rgba(31,178,204,1)",
    backgroundColor: 'rgba(142,7,27,1)',
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 14,
    marginBottom: 14,
  },
  submitButtonText: {
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    fontSize: 20,
    alignSelf: 'center',
  },
  mainView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 30,
    backgroundColor: 'florawhite',
    alignItems: 'center',
  },
  contactus: {
    fontSize: 16,
    fontWeight: 'italic',
    fontFamily: 'times new roman',
  },

  dealType: {
    fontSize: 16,
    marginTop: 5,
    color: '#800000',
    fontFamily: 'cursive',
  },
  middleView: {
    flexDirection: 'column',
  },
  eachCarousalItem: {
    backgroundColor: 'floralwhite',
    borderRadius: 5,
    height: 22,
    width: -20,
    padding: 25,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: 'black',
    // shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
    content: {
      fontSize: 20,
      // color: 'rgba(157,24,24,0.8)',
      color: 'black',
    },
  },
  leftAlign: {
    backgroundColor: 'purple',
    borderRadius: 7,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
  },
  rightAlign: {
    backgroundColor: 'green',
  },

  subTitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'rgba(157,24,24,0.8)',
  },
  content: {
    fontSize: 12,
    fontFamily: 'dancing-script',
  },
  headingWrapper: {
    fontSize: 16,
    marginTop: 5,
    padding: 10,
  },
  heading: {
    color: 'black',
    backgroundColor: 'black',
    fontSize: 16,
  },
  CheckboxWrapper: {
    width: 350,
    borderColor: 'rgba(157,24,24,0.8)',
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    alignSelf: 'flex-start',
    height: 60,
    marginRight: 20,
    marginLeft: 20,
  },
  CheckBoxTextStyle: {
    fontSize: 15,
    color: '#800000',
    marginLeft: 20,
  },
  textFieldWrapper: {
    height: 59,
    backgroundColor: 'rgba(255,255,255,1)',
    Opacity: 0.2,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'rgba(157,24,24,0.8)',
    flexDirection: 'row',
    marginRight: 22,
    marginLeft: 22,
    marginTop: 5,
  },
  textField: {
    flex: 8,
    height: 50,
    fontSize: 15,
    color: '#800000',
    marginTop: 4,
  },

  checkAvailability: {
    backgroundColor: 'rgba(142,7,27,1)',
    marginLeft: 45,
    marginTop: 20,
    marginRight: 40,
    marginBottom: 15,
    width: 288,
    height: 45,
    Availabilitycontent: {
      fontFamily: 'roboto-regular',
      fontSize: 20,
      flex: 1,
      marginHorizontal: 6,
      marginVertical: 6,
      color: 'rgba(255,255,255,1)',
      textAlign: 'center',
    },
  },
});

export default ContactUsPage;
