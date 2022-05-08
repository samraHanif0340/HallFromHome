import React, { useEffect } from 'react'
import { View, Text, TextInput,Keyboard } from 'react-native';
import styles from '../../styles/General.component.style.js';
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import { Snackbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { SelectCountry } from 'react-native-element-dropdown';
import { CheckBox,Overlay } from 'react-native-elements'
import { HelperText } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import { Calendar} from 'react-native-calendars';
import moment from 'moment';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

// import AnimatedLoader from "react-native-animated-loader";



export const Inputs = (type, label, value, onChange) => {
  switch (type) {
    case 'text':
      return <InputComponent label={label} value={value} onChange={onChange} />
    default:
      return <Text>Samra</Text>


  }
}

export const SelectField = props => {
  return (
    <View>
      <View style={styles.selectFieldWrapper}>
        {/* <Text style={styles.selectLabel}>{props.labelName}</Text> */}
        {props.nameOfIcon ? <EvilIconsIcon name={props.nameOfIcon} style={styles.icon2}></EvilIconsIcon> : null}
        <Picker style={styles.selectField} mode={props.mode} placeholder={props.placeholder} selectedValue={props.value} onValueChange={props.onChange}>
          <Picker.Item label={props.placeholder} value='' enabled={true} />
          {props.items.map(item => (
            // <Picker.Item key={item.VenueID} label={item.VenueName} value={item.VenueID} enabled={item.enable}
            // />

            <Picker.Item key={item.value} label={item.label} value={item.value} enabled={item.enable}
            />
          ))}
        </Picker>
      </View>
      {/* {props.error ? props.error.map((error) => <Text style={styles.errorMsg}>{error}</Text>) : null} */}
      {props.error ? props.error.map((error) => <HelperText type="error" style={styles.errorMsg}>{error}</HelperText>) : null}

    </View>
  )
}

const TextField = props => (
  <View>
    <View style={props.textFieldWrapperStyle ? props.textFieldWrapperStyle : styles.textFieldWrapper}>
      {props.nameOfIcon ? <EvilIconsIcon name={props.nameOfIcon} style={styles.icon2} onPress={props.onPress}></EvilIconsIcon> : null}
   
      {/* <Text style={styles.label}>{props.labelName}</Text> */}
      <TextInput onSubmitEditing={Keyboard.dismiss} style={props.textFieldStyle ? props.textFieldStyle : styles.textField} keyboardType={props.keyboardType ? props.keyboardType : 'default'} placeholder={props.required ? props.placeholder + "*" : props.placeholder} placeholderTextColor={props.placeholderTextColor} defaultValue={props.defaultValue} secureTextEntry={props.secureTextEntry} maxLength={props.maxLength} value={props.value} onChangeText={props.onChangeText} onBlur={props.onBlur} disabled={props.disabled} />
    </View>
    {props.error ? props.error.map((error, key) => <HelperText type="error" style={props.errorMsgStyle ? props.errorMsgStyle : styles.errorMsg} key={key}>{error}</HelperText>) : null}
  </View>
)

const DateTimePickerComp = (props) =>
(
  <View>
    <View style={styles.datePickerStyle}>
    <DatePicker    
      date={props.value}
      mode={props.mode}
      placeholder={props.placeholderValue}
      onDateChange={props.onDateChange}
      format="DD/MM/YYYY"
      minDate={new Date()}
      maxDate="01-01-3001"
      confirmBtnText="OK"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          position: 'absolute',
          justifyContent: 'flex-end',
          right: -5,
          top: 4,
          marginLeft: 0,
        },
        dateInput: {
          height: 50,
          fontSize: 15,
          // color: "rgba(255,255,255,1)",
          color: "black",
          marginTop: 4,
          // borderColor : "black",
          // alignItems: "flex-start",
          // borderWidth: 1,
          // borderBottomWidth: 1,
        },
        placeholderText: {
          fontSize: 15,
          color: "black"
        },
        dateText: {
          fontSize: 14,
        }
      }}
    />
    </View>
      {props.error ? props.error.map((error, key) => <HelperText type="error" style={props.errorMsgStyle ? props.errorMsgStyle : styles.errorMsg} key={key}>{error}</HelperText>) : null}
  </View>
)

const MultiLineTextInput = (props) => (
  <View>
    <View style={styles.textFieldWrapper}>
      {props.nameOfIcon ? <EvilIconsIcon name={props.nameOfIcon} style={styles.icon2}></EvilIconsIcon> : null}
      {/* <Text style={styles.label}>{props.labelName}</Text> */}
      <TextInput style={styles.textField} multiline numberOfLines={props.numberOfLines} keyboardType={props.keyboardType ? props.keyboardType : 'default'} placeholder={props.placeholder} placeholderTextColor={props.placeholderTextColor} defaultValue={props.defaultValue} secureTextEntry={props.secureTextEntry} maxLength={props.maxLength} value={props.value} onChangeText={props.onChangeText} onBlur={props.onBlur} />
    </View>
    {props.error ? props.error.map((error, key) => <HelperText style={styles.errorMsg} key={key}>{error}</HelperText>) : null}
  </View>
)

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

const CheckboxField = (props) => (
  <View>
    <CheckBox
      center={props.center}
      title={props.label}
      checked={props.checked}
      onPress={props.onChangeText}
    />
  </View>
)

const CalendarComponent = (props) => {
  const [openOverlay,setShowOverlay] = React.useState(true)
  console.log(props)
  const changeSelection = (day) => {
    let selectedDate = moment(day);
    selectedDate = selectedDate.format("YYYY-MM-DD");
    let obj = {
      EventDate: selectedDate
    }
    console.log('DATE IN CUSTOM CALENDAR', obj)
  }

  const closeCalendar=() =>{
    setShowOverlay(false)
    props.parentCallback(false)
  }

   

  return (
    <View>
      <Overlay isVisible={openOverlay} onBackdropPress={()=>closeCalendar()}>
      {/* <TouchableHighlight onPress={()=>closeCalendar()}><FontAwesomeIcon icon={faClose} size={25} color='black' /></TouchableHighlight>  */}
      <Calendar
        hideExtraDays={true}
        markedDates={props['markedDates']}
        current={new Date()}
        minDate={new Date()}
        onDayPress={day => changeSelection(day.dateString)}
        markingType={'custom'}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'red',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: 'red',
          indicatorColor: 'blue',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />
      </Overlay>
    </View>

  )
}


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

const Loader = (props) => {
  return (
    <Spinner
      visible={props.isLoading}
      color="black"
      animation="slide"
      size="large"
      textContent={'Please wait...'}
      textStyle={styles.spinnerTextStyle}
    // overlayColor="white"
    />

  )
}




export { TextField, MultiLineTextInput, DropdownField, CheckboxField, DateTimePickerComp,CalendarComponent, Toaster, Loader };
