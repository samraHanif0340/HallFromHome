import React , {Component, useContext} from 'react'
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
import { useStoreState } from 'easy-peasy';



const NavigationHeader = () => {
  const globalPayload = useStoreState((state) => state.payload);

        return(
            <View style={styles.userInfoSection}>
            <Avatar.Image
              source={{
                uri:
                  'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
              }}
              size={70}
            />
            <Title style={styles.title}>{globalPayload?.userDetails?.name}</Title>
            <Caption style={styles.caption}>@{globalPayload?.userDetails?.email}</Caption>
            <Caption style={styles.caption}>{globalPayload?.userDetails?.mobileNo}</Caption>
            </View>
      
        )
 
}


const styles = StyleSheet.create({
      userInfoSection: {
        marginBottom:10,
        alignItems:'center',
        backgroundColor:'#800000',
        opacity:0.9
      },
    
      title: {
        marginTop: 20,
        fontWeight: 'bold',
        color:'rgba(255,255,255,1)',
        
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
        color:'rgba(255,255,255,1)',
        fontStyle:'italic',
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