import React , {Component} from 'react'
import {View,Image,StyleSheet} from 'react-native'
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
  } from 'react-native-paper';

class NavigationHeader extends Component{
    render(){
        return(
            <View style={styles.userInfoSection}>
            <Avatar.Image
              source={{
                uri:
                  'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
              }}
              size={70}
            />
            <Title style={styles.title}>Samra Hanif</Title>
            <Caption style={styles.caption}>@samra.hanif@yahoo.com</Caption>
            <Caption style={styles.caption}>03402042202</Caption>
            </View>
      
        )
    }
}


const styles = StyleSheet.create({
      userInfoSection: {
        marginBottom:10,
        alignItems:'center'
      },
    
      title: {
        marginTop: 20,
        fontWeight: 'bold',
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
      },
      row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
      },

    //   preference: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     paddingVertical: 12,
    //     paddingHorizontal: 16,
    //   },
})

export default NavigationHeader;