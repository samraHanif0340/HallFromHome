import { StyleSheet } from 'react-native';


export const colors = {
    primary: '#226B74',
    secondary: '#254B5A',
    tertiary: '#5DA6A7'
}

export const padding = {
    sm: 10,
    md: 20,
    lg: 30,
    xl: 40
}

export const fonts = {
    sm: 12,
    md: 18,
    lg: 28,
    primary: 'Cochin'
}


const styles = StyleSheet.create({
  
    textFieldWrapper: {
        height: 59,
        //backgroundColor: "rgba(251,247,247,0.25)",
        backgroundColor: "rgba(255,255,255,1)",
        Opacity: 0.2,
        borderRadius: 5,
        borderWidth: 2,
        //borderColor: "rgba(255,255,255,0.3)",
        borderColor: "rgba(157,24,24,0.8)",
        flexDirection: "row",

        // flex:1,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10
    },
    textField: {
        flex: 8,
        height: 50,
        fontSize: 15,
       // color: "rgba(255,255,255,1)",
        color: "#800000",
        marginTop: 4,
    },
    selectFieldWrapper:{
        height: 59,
        //backgroundColor: "rgba(251,247,247,0.25)",
        backgroundColor: "rgba(255,255,255,1)",
        Opacity: 0.2,
        borderRadius: 5,
        borderWidth: 2,
        //borderColor: "rgba(255,255,255,0.3)",
        borderColor: "rgba(157,24,24,0.8)",
        flexDirection: "row",

        // flex:1,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10
    },
    selectField:{
        flex: 8,
        height: 50,
        fontSize: 15,
       // color: "rgba(255,255,255,1)",
        color: "#800000",
        marginTop: 4,
    },
    dropdownField: {
        height: 59,
        backgroundColor: "rgba(251,247,247,0.25)",
        borderRadius: 5, 
        alignContent: 'center',  
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

      placeholderStyle: {
        fontSize: 16,
        marginLeft:20,

      },
      selectedTextStyle: {
        fontSize: 16,
        marginLeft:20,

      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
        marginLeft:20,
        backgroundColor:'rgba(251,247,247,0.5)',
        color:'white'
      },
    // outerTextField: {
    //     flex: 6,
    //     flexDirection: "row"
    // },
    // errorField: {
    //     flex: 4
    // },
    selectLabel:{
        color:'white',
        fontSize:20
    },
 
 
    snackbar: {
        flex: 1,
        justifyContent: 'space-between',
      },
    icon2: {
        flex: 2,
        //color: "rgba(255,255,255,1)",
        color: "#800000",
        fontSize: 35,
        marginTop: 15,
        marginLeft: 20,
        alignContent: 'center',
    },
    label: {
        marginLeft: 20
    },
    errorMsg: {
        color: 'yellow',
        // backgroundColor:'rgba(255,255,204,1)',
        // backgroundColor:'rgba(255,255,255,1)',
        marginRight: 20,
        marginLeft: 20,
        fontSize: 11,
        fontStyle:'italic',
    },

    footerContainer: {
        flex: 1,
        flexDirection: "row",
    },
    footerLeftColumn: {
        flex: 1,
    },
    footerRightColumn: {
        flex: 1,
        // height:50,
        // width:50
    },
    chartContainer: {
        borderColor: 'black',
        borderWidth: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center'
    },
    imageStyle: {
        flex: 1,
        height: 100,
        width: 100,
        borderWidth: 3,
        borderRadius: 50
    },


    container: {
        flex: 1,
        backgroundColor: 'khaki'
    },

    spinnerTextStyle: {
        color: 'black',
        // fontFamily:"cursive",
        fontWeight:"bold"
      },
      lottie: {
        width: 100,
        height: 100
      }
   
})

export default styles;