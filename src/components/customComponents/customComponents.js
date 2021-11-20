import React , {Component} from 'react'
import {View,Text,TextInput,Picker} from 'react-native';
import styles from '../../styles/General.component.style.js';
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";


export const Inputs = (type,label,value,onChange)=>{
    switch(type){
        case 'text':
            return <InputComponent label={label} value={value} onChange={onChange} />
        default:
            return <Text>Samra</Text>
    
    
}
}
  
export const SelectField = props =>(
  <View >
    <Text>{props.labelName}</Text>
<Picker defaultValue={props.defaultValue} placeholder={props.placeholder} selectedValue={props.value} onValueChange={props.onChangeText}>
  {props.items.map(item => (
    <Picker.Item key={item.value} label={item.label} value={item.value} />
  ))}
</Picker>
{props.error ? props.error.map((error)=> <Text style={styles.errorMsg}>{error}</Text>) : null}

</View>
)


const TextField = props => (
  <View>
    <View style={styles.textFieldWrapper}>
    {props.nameOfIcon ? <EvilIconsIcon name={props.nameOfIcon} style={styles.icon2}></EvilIconsIcon> : null}
    {/* <Text style={styles.label}>{props.labelName}</Text> */}
    <TextInput style={styles.textField}  keyboardType={props.keyboardType ? props.keyboardType : 'default'} placeholder={props.placeholder} placeholderTextColor = {props.placeholderTextColor} defaultValue={props.defaultValue} secureTextEntry={props.secureTextEntry} maxLength={props.maxLength} value={props.value} onChangeText={props.onChangeText} onBlur={props.onBlur}/>
    </View>
  
  {props.error ? props.error.map((error,key)=> <Text style={styles.errorMsg} key={key}>{error}</Text>) : null}
  </View>
)


export default TextField;
