import React, { Component, useState } from "react";
import { Avatar, Badge, Icon, withBadge, } from 'react-native-elements';

import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    StatusBar, ImageBackground, Dimensions
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';


const SCREEN_WIDTH = Dimensions.get('window').width

const CustomerDashboardPage = (props) => {

    const [activeTab, setActiveTab] = useState(0)
    const [Camplaints, setCamplaint] = useState([{
        venueName: "Majestic Banquet",
        camplaintType: "Management Issue",
        camplaint: "The seats weren't clean and clear. The whole banquet was so damn conjusted"
    },
    {
        venueName: "Modern Palace",
        camplaintType: "Service Issue",
        camplaint: "The seats weren't clean and clear. The whole banquet was so damn conjusted"
    },
    {
        venueName: "Diamond Palace",
        camplaintType: "Management Issue",
        camplaint: "The seats weren't clean and clear. The whole banquet was so damn conjusted"
    },
    {
        venueName: "Ayan Banquet",
        camplaintType: "Management Issue",
        camplaint: "The seats weren't clean and clear. The whole banquet was so damn conjusted"
    },
    {
        venueName: "Majestic Banquet",
        camplaintType: "Management Issue",
        camplaint: "The seats weren't clean and clear. The whole banquet was so damn conjusted"
    },
    ])


    const [YourBookings, setYourBookings] = useState([{
        venueName: "Majestic Banquet",
        Status: 'BOOKED',
        EventDate: "21 Dec 2021",
        EventTime: 'Night',
        comments: '',
        statusColor: 'green'
    },
    {
        venueName: "Modern Palace",
        Status: 'REJECTED',
        EventDate: "21 Dec 2021",
        EventTime: 'Night',
        comments: 'Venue request rejected because the customer was unresponsive for three days',
        statusColor: 'red'
    },
    {
        venueName: "Diamond Palace",
        Status: 'REJECTED',
        EventDate: "21 Dec 2021",
        EventTime: 'Night',
        comments: 'Venue request rejected because the customer was unresponsive for three days',
        statusColor: 'red'
    },
    {
        venueName: "Ayan Banquet",
        Status: 'ON HOLD',
        EventDate: "25 Dec 2021",
        EventTime: 'Night',
        comments: 'Venue request holded because the customer was not paying for advance requested amount days',
        statusColor: 'blue'
    }
    ])

    const badgeDesign = function (color) {
        return {
            borderRadius: 10,
            backgroundColor: color,
            height: 50,
            width: '100%'
        }
    }

    const _renderItemCamplaint = ({ item, index }) => {
        return (
            <View style={styles.eachCarousalItem}>
                <Text style={styles.title}>{item.venueName}</Text>
                <Text style={styles.subTitle}>({item.camplaintType})</Text>
                <Text style={styles.ComplaintStyling}>{item.camplaint}</Text>

            </View>
        );
    }

    const _renderItemBookings = ({ item, index }) => {
        return (
            <View style={styles.eachCarousalItem}>
                <View style={[badgeDesign(item.statusColor), styles.badgeCover]}>
                    {/* <Badge containerStyle={styles.badgeTitle} value = {item.Status} /> */}

                    <Text style={styles.badgeTitle}>{item.Status}</Text>
                </View>
                <View style={{ padding: 20 }}>
                    <Text style={styles.title}>{item.venueName}</Text>
                    <Text style={styles.subTitle}>({item.EventDate}) | {item.EventTime}</Text>

                    {item.comments ? <Text style={styles.content}>{item.comments}</Text> : null}
                </View>



            </View>
        );
    }


    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
            <ImageBackground style={styles.container}
                source={require("../../assets/images/Gradient_MI39RPu.png")}
            >
                <View style={styles.headingWrapper}>
                    <Text style={styles.heading}>Your Bookings</Text>
                </View>
                <SafeAreaView style={{ flex: 1, paddingTop: -70, bottom: 10, height: 110, width: 430, }}>
                    <View style={styles.carouselView}>
                        <Carousel
                            layout={"default"}
                            useScrollView={true}
                            data={YourBookings}
                            sliderWidth={250}
                            itemWidth={250}
                            renderItem={_renderItemBookings}
                            onSnapToItem={i => setActiveTab({ activeTab: i })}
                            // slideStyle={{ width: SCREEN_WIDTH }}
                            // inactiveSlideOpacity={1}
                            // inactiveSlideScale={1}
                        />
                        {/* <View
                            style={styles.tabBar}
                        >
                            <Pagination
                                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                                dotStyle={styles.ww}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6}
                                activeDotIndex={activeTab}


                            />
                        </View> */}
                    </View>

                </SafeAreaView>

                <View style={styles.headingWrapper}>
                    <Text style={styles.heading}>Complaints/Feedbacks</Text>
                </View>

                <SafeAreaView style={{ flex: 1, paddingTop: -10, bottom: 10, height: 110, width: 430, }}>
                    <View style={styles.carouselView}>
                        <Carousel
                            layout={"default"}
                            //   ref={ref => carousel = ref}
                            data={Camplaints}
                            sliderWidth={250}
                            itemWidth={250}
                            renderItem={_renderItemCamplaint}
                            onSnapToItem={(index) => console.log('carousel index', index)} />
                    </View>
                </SafeAreaView>


            </ImageBackground>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'snow',
    },
    carouselView: {
        flex: 1, flexDirection: 'row'
    },
    eachCarousalItem: {
        backgroundColor: 'floralwhite',
        flex: 1,
        flexDirection: 'column',
        borderRadius: 10,
        height: 225,
        // padding: 2,
        marginLeft: 10,
        marginRight: 10,
        shadowColor: 'floralwhite',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },

    title: {
        fontSize: 24,
        fontFamily: 'cursive',
        color: 'rgba(157,24,24,0.8)'
    },
    badgeCover: {
        // borderRadius:10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    badgeTitle: {
        fontSize: 24,
        color: 'white',
        alignSelf: 'center'
    },
    subTitle: {
        fontSize: 15,
        fontStyle: 'italic',
        color: 'rgba(157,24,24,0.8)'
    },
    content: {
        fontSize: 16,
        fontFamily: 'dancing-script',
        justifyContent: 'space-between'
    },
    ComplaintStyling:
    {
        fontSize: 16,
        fontFamily: 'dancing-script',
        top: 20,
    },
    headingWrapper: {
        fontSize: 20,
        marginTop: 5,
        padding: 25,
    },
    heading: {
        fontSize: 20,
        bottom: 10,
        color: 'white',
        fontWeight: 'bold',
    },
    tabBar: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff'
    },
    ww: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8, backgroundColor: 'rgba(255, 255, 255, 0.92)'
    },

});


export default CustomerDashboardPage;