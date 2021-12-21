import React, { useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground,
    StatusBar,
    Image,
    TouchableOpacity,
    TouchableOpacityBase,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const SplashScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [authLoaded, setAuthLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAuthLoaded(true);
        }, 5000);
    }, []);

    useEffect(() => {
        if (authLoaded) {
            navigation.replace('Auth');
        }
    }, [authLoaded, navigation]);

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backgroundImage}
                source={require("../../assets/images/Gradient_MI39RPu.png")}
            >
                <Animatable.View style={styles.header}>
                    <Animatable.Image
                        animation="bounceIn"
                        duration={1500}
                        source={require('../../assets/hallFromHomeLogo.png')}
                        style={styles.logo}
                        resizeMode="stretch"
                    />

                </Animatable.View>

            </ImageBackground>

            {/* <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig">
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}>
          Stay connected with everyone!
        </Text>
        <Text style={styles.text}>Sign in with account</Text> 
         <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <LinearGradient
              colors={['#087ed4', '#0164ab']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>  */}
        </View>
    );
};


const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        width: height_logo,
        height: height_logo,
    },

});

export default SplashScreen;