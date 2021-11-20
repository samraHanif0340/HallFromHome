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
        backgroundColor: "rgba(251,247,247,0.25)",
        borderRadius: 5,
        flexDirection: "row",
        // flex:1,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 14,
        marginBottom: 14
    },
    // outerTextField: {
    //     flex: 6,
    //     flexDirection: "row"
    // },
    // errorField: {
    //     flex: 4
    // },
    textField: {
        flex: 8,
        height: 50,
        color: "rgba(255,255,255,1)",
        marginTop: 4,
    },
    icon2: {
        flex: 2,
        color: "rgba(255,255,255,1)",
        fontSize: 30,
        marginTop: 15,
        marginLeft: 20,
    },
    label: {
        marginLeft: 20
    },
    errorMsg: {
        color: 'red',
        backgroundColor:'rgba(255,255,204,1)',
        marginRight: 20,
        marginLeft: 20,
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
   
})

export default styles;