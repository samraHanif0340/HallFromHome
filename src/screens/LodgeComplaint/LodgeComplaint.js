import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, ImageBackground } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { MultiLineTextInput, Toaster } from '../../components/customComponents/customComponents'

const LodgeComplaintPage = (props) => {

  const camplaintType = [
    { label: 'Management Issue', value: 1 },
    { label: 'Catering Issue', value: 2 },
    { label: 'Car Service Issue', value: 3 },
    { label: 'Lightening Issue', value: 4 },
    { label: 'Other', value: 5 },
  ];

  const hallList = [
    { label: 'Majestic Banquet', value: 1 },
    { label: 'Modern Palace', value: 2 },
    { label: 'Ayan Hall', value: 3 },

  ];

  const [camplaintForm, setCamplaintForm] = useState({ camplaintType: null, hallName: null, camplaint: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const changeSelection = (item, key) => {
    setCamplaintForm({
      ...camplaintForm,
      [key]: item.value
    })
    console.log(item)
    console.log(camplaintForm)

  };

  const submitCamplaint = () => {
    setIsFormSubmitted(true)


  };

  const closeToaster = (visibility) => {
    setIsFormSubmitted(visibility)
    setCamplaintForm({ ...camplaintForm, camplaintType: null, hallName: null, camplaint: '' })
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <ImageBackground style={styles.container}
        source={require("../../assets/images/Gradient_MI39RPu.png")}
      >
        
        <Dropdown
          style={styles.textFieldWrapper}
          containerStyle={styles.textField}
          data={camplaintType}
          search
          searchPlaceholder="Search"
          labelField="label"
          valueField="value"
          label="Complaint Type"
          placeholder="Select Complaint Type"
          value={camplaintForm.camplaintType}
          onChange={item => {
            changeSelection(item, 'camplaintType');
            // console.log('selected', item);
          }}
          // renderLeftIcon={() => (
          //     <Image style={styles.icon} source={require('./assets/account.png')} />
          // )}
          // renderItem={item => changeSelection(item)}
          textError="Error"
        />

        <Dropdown
          style={styles.textFieldWrapper}
          containerStyle={styles.shadow}
          data={hallList}
          search
          searchPlaceholder="Search"
          labelField="label"
          valueField="value"
          label="Hall Name"
          placeholder="Select Hall"
          value={camplaintForm.hallName}
          onChange={item => {
            changeSelection(item, 'hallName');
            // console.log('selected', item);
          }}
          // renderLeftIcon={() => (
          //     <Image style={styles.icon} source={require('./assets/account.png')} />
          // )}
          // renderItem={item => changeSelection(item)}
          textError="Error"
        />

        <MultiLineTextInput
          placeholder="Description"
          keyboardType='default'
          placeholderTextColor="rgba(255,255,255,1)"
          defaultValue={camplaintForm.camplaint}
          maxLength={200}

          numberOfLines={5}
        // onSubmitEditing={() =>
        //     passwordInputRef.current &&
        //     passwordInputRef.current.focus()
        //   }
        // onChangeText={value => {
        //     setUserEmail(value.trim()),
        //     setEmailError(validate('userEmail', userEmail, 'email'))
        // }}
        // error={emailError}
        />

        <TouchableOpacity
          onPress={submitCamplaint}
          style={styles.button2}
        >
          <Text style={styles.text5}>Submit Complaint</Text>
        </TouchableOpacity>


        {isFormSubmitted ? <Toaster toasterMessage="Complaint Lodged Successfully" parentCallback={closeToaster} /> : null}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdown: {
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginTop: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  button2: {
    height: 59,
    backgroundColor: "rgba(31,178,204,1)",
    borderRadius: 5,
    justifyContent: "center",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 14,
    marginBottom: 14
  },
  text5: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 20,
    alignSelf: "center"
  },
  textFieldWrapper: {
    height: 59,
    backgroundColor: "rgba(251,247,247,0.25)",
    borderRadius: 5,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 14,
    marginBottom: 14
  },
  textField: {
    flex: 8,
    height: 50,
    color: "rgba(255,255,255,1)",
    marginTop: 14,
  },

});

export default LodgeComplaintPage;


