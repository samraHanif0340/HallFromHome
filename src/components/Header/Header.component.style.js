import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor:'#800000'
    },
    drawerHeader: {
        backgroundColor:'#800000',
        borderColor: '#800000',
        shadowColor: '#800000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    drawerTitle: {
        flex: 3,
        color: 'floralwhite',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginRight: 20
        // backgroundColor:'#800000',

    },
    drawerIcon: {
        borderColor: '#800000',
        borderWidth: 3,
        borderRadius: 6,
        shadowColor: '#800000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    }

})