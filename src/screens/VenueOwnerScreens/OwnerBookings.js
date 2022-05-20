import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, StatusBar, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { Avatar } from 'react-native-elements';
import { BASE_URL, ERROR_MESSAGES } from '../../constants/constants'
import axios from 'axios';
import { useStoreState } from 'easy-peasy';
import Snackbar from 'react-native-snackbar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleCheck, faBan,faShare } from '@fortawesome/free-solid-svg-icons'
import { ConfirmDialog } from 'react-native-simple-dialogs';
import validate from '../../shared-services/validationFunctions'
import { TextField, DateTimePickerComp ,Loader} from '../../components/customComponents/customComponents'
import { Formik } from "formik";
import * as Yup from "yup";
import moment from 'moment';
import {getStatusColor} from '../../components/utility/helper';

const validationSchema = Yup.object().shape({
  AdvancePayment: Yup.string()
    .min(4, 'Name must be atleast 4 characters long')
    .max(20, 'Name must be atmost 20 characters long')
    .required('Required'),
  AdvancePaymentDeadlineDate: Yup.string()
    .required('Required'),
  Comment: Yup.string(),
});

// const validationSchemaBookCompletion = Yup.object().shape({
//   Comment: Yup.string()
//   .required('Required'),
// });


const OwnerBookingPage = (props) => {
  const source = axios.CancelToken.source();
  const [masterData, setmasterData] = React.useState([]);
  const globalPayload = useStoreState((state) => state.payload);
  const [bookingPayload, setBookingPayload] = React.useState({});
  const [paymentPayload, setPaymentPayload] = React.useState(null);
  const [paidPaymentPayload, setPaidPaymentPayload] = React.useState(null);

  const [rejectionCommentError, setRejectionCommentError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false)
  const [showBookCompletionModal, setShowBookCompletionModal] = React.useState(false)
  const [showRejectModal, setShowRejectModal] = React.useState(false)
  const [showAdvancePayModal, setShowAdvancePayModal] = React.useState(false)
  const [initialFormValues, setInitialFormValues] = React.useState({})


  React.useEffect(() => {
    getData();

    return () => source.cancel("Data fetching cancelled");
  }, []);

  const getData = async () => {
    const configurationObject = {
      url: `${BASE_URL}GetVenueBookingRequests`,
      method: "POST",
      cancelToken: source.token,
      data: { UserID: globalPayload.userId },
    };
    try {
      setIsLoading(true);
      const response = await axios(
        configurationObject
      );

      if (response.data.ResponseCode == "00") {
        setIsLoading(false);
        if (response.data.Result_DTO) {
          setmasterData(response.data.Result_DTO)
        }
        return;
      } else {
        setIsLoading(false);
        setmasterData([])
        Snackbar.show({
          text: response.data.ResponseDesc,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#B53849',
          textColor: 'black',
          action: {
            text: 'OK',
            textColor: 'black',
            onPress: () => { /* Do something. */ },
          },
        });
      }
    } catch (error) {
      console.log(error)
      setmasterData([])
      setIsLoading(false);
      Snackbar.show({
        text: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#B53849',
        textColor: 'black',
        action: {
          text: 'OK',
          textColor: 'black',
          onPress: () => { /* Do something. */ },
        },
      });

    }
  };

  const confirmApproveRejectBooking = (item, status) => {
    setBookingPayload({})
    setPaymentPayload(null)
    setPaymentPayload(item)
    console.log(item)
    let payload = {
      BookingID: item.BookingID,
      ReqStatus: status,
      RejectionComment: bookingPayload.RejectionComment ? bookingPayload.RejectionComment : null
    }
    if (status) {
      if (status == 'A') {
        setBookingPayload(payload)
        // setShowApproveModal(true)
        setShowAdvancePayModal(true)
        // setShowRejectModal(false)

      }
      else if (status == 'R') {
        setShowRejectModal(true)
        // setShowApproveModal(false)  
        setBookingPayload(payload)
      }
    }
  }

  const approveRejectBooking = (payload) => {
    console.log('REJECTION PAYLOAD ===',payload)
    if (payload) {
      if (payload.ReqStatus == 'R') {
        if (!bookingPayload.RejectionComment) {
          Snackbar.show({
            text: 'Please Add the Rejection Comments',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#B53849',
            textColor: 'black',
            action: {
              text: 'OK',
              textColor: 'black',
              onPress: () => { /* Do something. */ },
            },
          });
        }
        else {
          approveRejectBookingService(payload)
        }
      }
      // else {
      //   approveRejectBookingService(payload)
      // }
    }

  }

  const approveRejectBookingService = async (payload) => {
    const configurationObject = {
      url: `${BASE_URL}ApproveRejectBookingRequest`,
      method: "POST",
      cancelToken: source.token,
      data: { ...payload },
    };
    try {
      setIsLoading(true);
      const response = await axios(
        configurationObject
      );

      if (response.data.ResponseCode == "00") {
        setIsLoading(false);
        Snackbar.show({
          text: response.data.Messages[0] ? response.data.Messages[0] : 'Venue Status Submitted Successfully',
          duration: Snackbar.LENGTH_LONG,
          // color:'green'
        });
        // setShowApproveModal(false)
        setShowRejectModal(false)
        setShowAdvancePayModal(false)
        getData()

      } else {
        setIsLoading(false);
        // setShowApproveModal(false)
        setShowRejectModal(false)
        setShowAdvancePayModal(false)
        Snackbar.show({
          text: response.data.ResponseDesc,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#B53849',
          textColor: 'black',
          action: {
            text: 'OK',
            textColor: 'black',
            onPress: () => { /* Do something. */ },
          },
        });
      }
    } catch (error) {
      console.log(error)
      // setShowApproveModal(false)
      setShowRejectModal(false)
      setShowAdvancePayModal(false)
      setIsLoading(false);
      Snackbar.show({
        text: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#B53849',
        textColor: 'black',
        action: {
          text: 'OK',
          textColor: 'black',
          onPress: () => { /* Do something. */ },
        },
      });

    }
  };

  const submitAdvancePayForm = (item, formData) => {
    let payload = {
      BookingID: item.BookingID,
      VenueID: item.VenueID,
      OwnerID: globalPayload.userId,
      UserID: item.BookedById,
      AdvancePaymentDeadlineTime: '11:59 PM',
      ...formData
    }

    let selectedDate = payload.AdvancePaymentDeadlineDate.split('/')
    let reversedDate = selectedDate.reverse().join("-")
    payload.AdvancePaymentDeadlineDate = reversedDate
    console.log('SEND ADVANCE PAYMENT PAYLOAD ===',payload)

    if (payload != null || payload != {}) {
      sendAdvancePayService(payload)
    }
    else {
      Snackbar.show({
        text: 'Please Add the Required Fields',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#B53849',
        textColor: 'black',
        action: {
          text: 'OK',
          textColor: 'black',
          onPress: () => { /* Do something. */ },
        },
      });
    }
  }

  const sendAdvancePayService = async (payload) => {
    const configurationObject = {
      url: `${BASE_URL}AddPaymentDetails`,
      method: "POST",
      cancelToken: source.token,
      data: { ...payload },
    };
    try {
      setIsLoading(true);
      const response = await axios(
        configurationObject
      );

      if (response.data.ResponseCode == "00") {
        setIsLoading(false);
        Snackbar.show({
          text: response.data.Messages[0] ? response.data.Messages[0] : 'Venue Payment Information Submitted Successfully',
          duration: Snackbar.LENGTH_LONG,
        });
        setInitialFormValues({AdvancePayment:null,AdvancePaymentDeadlineDate:null,Comment:null})
        setShowAdvancePayModal(false)
        getData()
        // approveRejectBookingService(bookingPayload)


      } else {
        setIsLoading(false);
        setShowAdvancePayModal(false)
        setInitialFormValues({AdvancePayment:null,AdvancePaymentDeadlineDate:null,Comment:null})
        Snackbar.show({
          text: response.data.ResponseDesc,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#B53849',
          textColor: 'black',
          action: {
            text: 'OK',
            textColor: 'black',
            onPress: () => { /* Do something. */ },
          },
        });
      }
    } catch (error) {
      console.log(error)
      setShowAdvancePayModal(false)
      setInitialFormValues({AdvancePayment:null,AdvancePaymentDeadlineDate:null,Comment:null})
      setIsLoading(false);
      Snackbar.show({
        text: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#B53849',
        textColor: 'black',
        action: {
          text: 'OK',
          textColor: 'black',
          onPress: () => { /* Do something. */ },
        },
      });

    }
  };

  const confirmPayment = (item, status) => {
    let payload = {
      ...item,
      ReqStatus: status
    }
    setPaidPaymentPayload(payload)
    if (status) {
      setShowBookCompletionModal(true)
    }
  }

  const submitBookCompletionForm = (item, formData) => {
    let payload = {
      BookingID: item.BookingID,
      VenueID: item.VenueID,
      OwnerID: globalPayload.userId,
      UserID: item.BookedById,
      // ...formData,
      ReqStatus: paidPaymentPayload.ReqStatus,
      IsPaymentReceived: true,
    }
    console.log('payload',payload)
    if (payload != null || payload != {}) {
      sendBookCompletionService(payload)
      // updateVenueCalendar(paidPaymentPayload)
    }
    else {
      Snackbar.show({
        text: 'Please Add the Required Fields',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#B53849',
        textColor: 'black',
        action: {
          text: 'OK',
          textColor: 'black',
          onPress: () => { /* Do something. */ },
        },
      });
    }
  }

  const sendBookCompletionService = async (payload) => {
    const configurationObject = {
      url: `${BASE_URL}UpdatePaymentDetails`,
      method: "POST",
      cancelToken: source.token,
      data: { ...payload },
    };
    try {
      setIsLoading(true);
      const response = await axios(
        configurationObject
      );

      if (response.data.ResponseCode == "00") {
        setIsLoading(false);
        // Snackbar.show({
        //   text: response.data.Messages[0] ? response.data.Messages[0] : 'Venue Booked Successfully',
        //   duration: Snackbar.LENGTH_LONG,
        // });
        setShowBookCompletionModal(false)
        updateVenueCalendar(paidPaymentPayload)


      } else {
        setIsLoading(false);
        setShowBookCompletionModal(false)
        Snackbar.show({
          text: response.data.ResponseDesc,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#B53849',
          textColor: 'black',
          action: {
            text: 'OK',
            textColor: 'black',
            onPress: () => { /* Do something. */ },
          },
        });
      }
    } catch (error) {
      console.log(error)
      setShowBookCompletionModal(false)
      setIsLoading(false);
      Snackbar.show({
        text: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#B53849',
        textColor: 'black',
        action: {
          text: 'OK',
          textColor: 'black',
          onPress: () => { /* Do something. */ },
        },
      });

    }
  };

  const updateVenueCalendar = (paidPaymentData) => {
    let payload = {
      VenueID: paidPaymentData.VenueID,
      BookingID: paidPaymentData.BookingID,
      EventDate: moment(new Date(paidPaymentData.EventDate)).format('YYYY-MM-DD')
    }
    console.log('UPDATE CALENDAR PAYLOAD===',payload)
    if (payload != null || payload != {}) {
      updateVenueCalendarService(payload)
    }
    else {
      Snackbar.show({
        text: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#B53849',
        textColor: 'black',
        action: {
          text: 'OK',
          textColor: 'black',
          onPress: () => { /* Do something. */ },
        },
      });
    }
  }

  const updateVenueCalendarService = async (payload) => {
    const configurationObject = {
      url: `${BASE_URL}ReserveVenueBooking`,
      method: "POST",
      cancelToken: source.token,
      data: { ...payload },
    };
    try {
      const response = await axios(
        configurationObject
      );

      if (response.data.ResponseCode == "00") {
        Snackbar.show({
          text: 'Venue Booked Successfully',
          duration: Snackbar.LENGTH_LONG,
          // color:'green'
        });
        getData()
      } else {
        Snackbar.show({
          text: response.data.ResponseDesc,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#B53849',
          textColor: 'black',
          action: {
            text: 'OK',
            textColor: 'black',
            onPress: () => { /* Do something. */ },
          },
        });
      }
    } catch (error) {
      console.log(error)
      Snackbar.show({
        text: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#B53849',
        textColor: 'black',
        action: {
          text: 'OK',
          textColor: 'black',
          onPress: () => { /* Do something. */ },
        },
      });

    }
  };

  const renderBookings = ({ item }) =>
    <Card containerStyle={styles.cardStyle}>
      <Avatar
        size={32}      
        title={item.RequestStatus.substr(0, 1).toUpperCase()}
        containerStyle={{ backgroundColor: getStatusColor(item.RequestStatus).backgroundColor, alignSelf: 'flex-start' }}
        rounded />
      <Text style={styles.venueName}> {item.VenueName}</Text>
      <Text style={styles.bookingUser}>{item.BookedByUsername} - ({item.ContactNumber})</Text>
      <View>
        <Text style={styles.eventTypesLabel}>(Date | Day | Shift)</Text>
      </View>

      <Text style={styles.eventTypes}>{item.EventDate} | {item.EventDay} | {item.EventTime}</Text>
      {item.RejectionComment && item.RequestStatus == 'Rejected' ? <Text style={styles.eventTypes}>{item.RejectionComment}</Text> : null}


      

      <View style={styles.approvRejButton}>
        {!item.RequestStatus || item.RequestStatus == 'Pending' ? <TouchableOpacity style={{ marginRight: 4 }} onPress={() => confirmApproveRejectBooking(item, 'A')}><FontAwesomeIcon icon={faShare} size={20} color='black' /></TouchableOpacity> : null}
        {item.RequestStatus && item.RequestStatus == 'Approved' ? <TouchableOpacity style={{ marginRight: 4 }} onPress={() => confirmPayment(item, 'C')} ><FontAwesomeIcon icon={faCircleCheck} size={20} color='black' /></TouchableOpacity> : null}
        {!item.RequestStatus || item.RequestStatus == 'Pending' ? <TouchableOpacity style={{ marginRight: 4 }} onPress={() => confirmApproveRejectBooking(item, 'R')} ><FontAwesomeIcon icon={faBan} size={20} color='black' /></TouchableOpacity> : null}

      </View>
    </Card>

  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading} />

      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <FlatList
        data={masterData}
        keyExtractor={item => item.BookingID}
        renderItem={renderBookings}
      />

      {showAdvancePayModal ? <ConfirmDialog
        title="Add Advance Payment"
        visible={showAdvancePayModal}
        onTouchOutside={() => setShowAdvancePayModal(false)}
        >
        <View>
          <ScrollView>
            <Text>Are you sure you want to Approve this customer booking request? Please fill the following details to be notified to the customer</Text>
            <Formik
              initialValues={initialFormValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={(values, errors) => submitAdvancePayForm(paymentPayload, values)}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValidating }) => {

                const myChangeFunc = (key, val) => {
                  setInitialFormValues({ ...initialFormValues, [key]: val });
                  return handleChange(val)
                }

                return (
                  <View>
                    <TextField
                      textFieldWrapperStyle={styles.textFieldWrapper}
                      textFieldStyle={styles.textField}
                      errorMsgStyle={styles.errorMsg}
                      placeholder="Advance Payment"
                      keyboardType='phone-pad'
                      mode="outlined"
                      placeholderTextColor="black"
                      // nameOfIcon="user"
                      maxLength={20}
                      onChangeText={(e) => { myChangeFunc('AdvancePayment', e) }}
                      onBlur={handleBlur('AdvancePayment')}
                      value={values.AdvancePayment}
                      error={[errors.AdvancePayment]}
                    />

                    <DateTimePickerComp
                      errorMsgStyle={styles.errorMsg}
                      mode="date"
                      placeholderValue="Advance Payment Deadline Date"
                      onDateChange={(e) => { myChangeFunc('AdvancePaymentDeadlineDate', e) }}
                      value={values.AdvancePaymentDeadlineDate}
                      error={[errors.AdvancePaymentDeadlineDate]}
                    />

                    <TextField
                      placeholder="Comment" textFieldWrapperStyle={styles.textFieldWrapper}
                      textFieldStyle={styles.textField}
                      errorMsgStyle={styles.errorMsg}
                      keyboardType='default'
                      mode="outlined"
                      placeholderTextColor="black"
                      // nameOfIcon="user"
                      maxLength={300}
                      onChangeText={(e) => { myChangeFunc('Comment', e) }}
                      onBlur={handleBlur('Comment')}
                      value={values.Comment}
                      error={[errors.Comment]}
                    />


                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={styles.submitButtonWrapper}

                    >
                      <Text style={styles.submitButtonText}>SEND</Text>
                    </TouchableOpacity>
                  </View>
                )
              }}

            </Formik>
          </ScrollView>
        </View>

      </ConfirmDialog> : null}

      {showBookCompletionModal ? <ConfirmDialog
        title="CONFIRMATION"
        visible={showBookCompletionModal}
        message="Advance Payment Received? Are you sure you want to BOOK this venue?"
        onTouchOutside={() => { setShowBookCompletionModal(false) }}
      positiveButton={{
        title: "YES",
        onPress: () => submitBookCompletionForm(paidPaymentPayload)
      }}
      negativeButton={{
        title: "NO",
        onPress: () => setShowBookCompletionModal(false)
      }}
      >
      </ConfirmDialog> : null}

      {showRejectModal ? <ConfirmDialog
        title="CONFIRMATION"
        visible={showRejectModal}
        onTouchOutside={() => setShowRejectModal(false)}
        positiveButton={{
          title: "YES",
          onPress: () => approveRejectBooking(bookingPayload)
        }}
        negativeButton={{
          title: "NO",
          onPress: () => setShowRejectModal(false)
        }}>
        {showRejectModal ?
          <View>
            <Text>Are you sure you want to Reject this customer booking request? For rejecting this you need to add rejection comments as well.</Text>
            <TextField
              textFieldWrapperStyle={styles.textFieldWrapper}
              textFieldStyle={styles.textField}
              errorMsgStyle={styles.errorMsg}
              placeholder="Rejection Comments"
              keyboardType='default'
              mode="outlined"
              placeholderTextColor="black"
              nameOfIcon="envelope"
              defaultValue={bookingPayload.RejectionComment}
              maxLength={50}
              onChangeText={value => {
                setBookingPayload((bookingPayload) => ({ ...bookingPayload, ...{ RejectionComment: value.trim() } })),
                  setRejectionCommentError(validate('RejectionComment', bookingPayload.RejectionComment, 'textField'))
              }}
              error={rejectionCommentError}
            />
          </View> : null}
      </ConfirmDialog> : null}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardStyle: {
    flex: 1,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: 'space-between',
    shadowColor: 'black',
    height: 180,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor:'floralwhite',
  },
  approvRejButton: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'flex-end',
  },
  venueName: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold'
  },

  bookingUser: {
    color: 'grey',
    fontStyle: 'italic',
    fontSize: 16

  },
  requestStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'orange'
  },
  eventTypes: {
    alignSelf: 'flex-end'
  },
  eventTypesLabel: {
    alignSelf: 'flex-end',
    color: 'black',
    fontWeight: 'bold'
  },
  setImageStyles: {
    marginTop: 20,
    marginBottom: 20,
  },
  textFieldWrapper: {
    height: 60,
    backgroundColor: "rgba(255,255,255,1)",
    Opacity: 0.2,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10
  },
  textField: {
    height: 40,
    fontSize: 15,
    color: "black",
    marginLeft: 5,
    marginBottom: 5
  },
  errorMsg: {
    color: 'red',
    marginRight: 20,
    marginLeft: 20,
    fontSize: 11,
    fontStyle: 'italic',
  },

  submitButtonWrapper: {
    height: 59,
    //backgroundColor: "rgba(31,178,204,1)",
    backgroundColor: "rgba(142,7,27,1)",
    borderRadius: 5,
    justifyContent: "center",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 14,
    marginBottom: 14
  },
  submitButtonText: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 20,
    alignSelf: "center"
  },

  image: {
    // top: 0,
    right: 9,
    left: -2,
    flex: 1,
    width: 100,
    flexDirection: "column",
    height: 140,
    marginTop: -65,
    marginBottom: 3,
    borderRadius: 5,
    // marginRigth:8, 
  },
  loremIpsum2Stack: {
    top: -205,
    position: "absolute"
  },
  imageStack: {
    top: 0,
    left: -20,
    width: 310,
    height: 90,
    position: "absolute",

  },
  badgeTitle: {
    paddingVertical: 5,
    height: 10,
    width: 100,
    right: -70,
    top: -45,
  },
  imageStackStack: {
    width: 199,
    height: 9,
    marginTop: 60,
    marginLeft: 20,
    // marginRight: 20,

  },


  eachItem:
  {
    flex: 1,
    // flexDirection:'row',
    color: 'rgba(0,0,0,1)',
    marginBottom: 10
    // backgroundColor:'yellow'
  },
  cardTitle: {
    color: 'black',
    marginLeft: 10,
    flexDirection: 'row',
    bottom: 135,
    marginBottom: -2,
    marginRight: 8,
  },
  statusStyle: {
    color: 'black',
    textAlign: "left",
    marginLeft: 90,
    bottom: 45,
    width: 70,
    height: 20,
  },
  DividerColor: {
    backgroundColor: 'black',
    borderBottomWidth: 3,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  commentStyle: {
    color: 'black',
    fontSize: 11,
    bottom: 15,
    right: -90,
    height: 190,
    width: 195,
    letterSpacing: 1,
    textAlign: "left",
  },
  cardPricePaid: {
    left: 220,
    color: 'black',
    fontStyle: 'italic',
    position: "absolute",
    fontFamily: "roboto-700",
    color: "black",
    height: 14,
    width: 139,
    textAlign: "left",
    fontSize: 11
  },
  leftAlign: {
    marginLeft: 14,
    flex: 2,
    icon: {
      fontSize: 45,
      color: 'rgba(255,255,255,1)',
    }
  },
  centeredAlign: {
    content: {
      color: 'rgba(255,255,255,1)',
    },
    flex: 6,
  },
  rightAligned: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    content: {
      color: 'rgba(255,255,255,1)',
    },
    icon: {
      fontSize: 10,
      color: 'yellow',
    },
  },
  comments: {
    color: 'rgba(255,255,255,1)'
  },
  searchBar: {
    backgroundColor: 'rgba(142,7,27,1)',
    opacity: 0.7,
    icon: {
      color: 'black'
    },
    inputStyle: {
      color: 'white'
    }
  },
  rect: {
    width: 360,
    height: 760,
    backgroundColor: "rgba(222,206,206,1)"
  },
  rect3: {
    height: 80,
    position: "absolute",
    backgroundColor: "rgba(230,230, 230,1)",
    borderRadius: 12,
    overflow: "visible",
    borderWidth: 1,
    borderColor: "rgba(87,34,34,1)",
    shadowColor: "rgba(193,166,166,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row"
  },
  rect4: {
    width: 285,
    height: 48,
    backgroundColor: "rgba(249,246,246,1)",
    borderRadius: 15,
    flexDirection: "row"
  },




});

export default OwnerBookingPage;


