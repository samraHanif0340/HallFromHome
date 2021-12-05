import React, { Component, useEffect } from 'react'
import { View, Text, TextInput } from 'react-native';
import styles from '../../styles/General.component.style.js';
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import { Button, Snackbar } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import { Dropdown, SelectCountry } from 'react-native-element-dropdown';
import { renderNode } from 'react-native-elements/dist/helpers';


export const Inputs = (type, label, value, onChange) => {
  switch (type) {
    case 'text':
      return <InputComponent label={label} value={value} onChange={onChange} />
    default:
      return <Text>Samra</Text>


  }
}

export const SelectField = props => {
  return(
  <View >
    <Text style={styles.selectLabel}>{props.labelName}</Text>
    <Picker   style={styles.dropdownField} selectedValue={props.selectedValue} mode={props.mode}  placeholder={props.placeholder} selectedValue={props.value} onValueChange={props.onChangeText}>
      {props.items.map(item => (
        <Picker.Item key={item.value} label={item.label} value={item.value} enabled={item.enable}
        />
      ))}
    </Picker>
    {props.error ? props.error.map((error) => <Text style={styles.errorMsg}>{error}</Text>) : null}

  </View>
  )
}



const TextField = props => (
  <View>
    <View style={styles.textFieldWrapper}>
      {props.nameOfIcon ? <EvilIconsIcon name={props.nameOfIcon} style={styles.icon2}></EvilIconsIcon> : null}
      {/* <Text style={styles.label}>{props.labelName}</Text> */}
      <TextInput style={styles.textField} keyboardType={props.keyboardType ? props.keyboardType : 'default'} placeholder={props.placeholder} placeholderTextColor={props.placeholderTextColor} defaultValue={props.defaultValue} secureTextEntry={props.secureTextEntry} maxLength={props.maxLength} value={props.value} onChangeText={props.onChangeText} onBlur={props.onBlur} />
    </View>

    {props.error ? props.error.map((error, key) => <Text style={styles.errorMsg} key={key}>{error}</Text>) : null}
  </View>
)

const MultiLineTextInput = (props) => (

  <View>
    <View style={styles.textFieldWrapper}>
      {props.nameOfIcon ? <EvilIconsIcon name={props.nameOfIcon} style={styles.icon2}></EvilIconsIcon> : null}
      {/* <Text style={styles.label}>{props.labelName}</Text> */}
      <TextInput style={styles.textField} multiline numberOfLines={props.numberOfLines} {...props} keyboardType={props.keyboardType ? props.keyboardType : 'default'} placeholder={props.placeholder} placeholderTextColor={props.placeholderTextColor} defaultValue={props.defaultValue} secureTextEntry={props.secureTextEntry} maxLength={props.maxLength} value={props.value} onChangeText={props.onChangeText} onBlur={props.onBlur} />
    </View>

    {props.error ? props.error.map((error, key) => <Text style={styles.errorMsg} key={key}>{error}</Text>) : null}
  </View>
)

const Toaster = (props) => {

  let [visible, setVisible] = React.useState(false)
  const onDismissSnackBar = () => {
    setVisible(false)
    props.parentCallback(false);
  }

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <View style={styles.snackbar}>
      {/* <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button> */}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}

        action={{
          label: 'OK',
          onPress: () => {
            onDismissSnackBar
          },
        }}>
        {props.toasterMessage}
      </Snackbar>
    </View>

  )
}


const DropdownField = (props) => {

  // let [visible, setVisible] = React.useState(false)
  // const onDismissSnackBar = () => 
  // {
  //   setVisible(false)
  //   props.parentCallback(false);
  // }

  // useEffect(()=>{
  //   setVisible(true)
  // },[])

  return (

    <SelectCountry
      style={styles.dropdownField}
      containerStyle={styles.shadow}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={props.dropdownList}
      search={props.search}
      searchPlaceholder={props.searchPlaceholder}
      labelField={props.labelField}
      valueField={props.labelValue}
      imageField={props.image}
      label={props.labelTitle}
      placeholder={props.dropdownPlaceholder}
      value={props.formValue}
      onChange={
        props.onChange
      }
      renderRightIcon={props.iconRight}
      // textError={props.Error}
      autoScroll="true"
      selectedTextProps={() => console.log('selected text prop')}
      renderItem={props.renderItem}
    // selectedTextStyle={{backgroundColor: 'rgb(244,164,96)',color:'rgb(255,0,0)'}}  

    />
  )

}



export { TextField, MultiLineTextInput, Toaster, DropdownField };
