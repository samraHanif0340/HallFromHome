import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {
  MultiLineTextInput,
  SelectField,
  Loader,
  TextField,
} from '../../components/customComponents/customComponents';
import axios from 'axios';
import {BASE_URL} from '../../constants/constants';
import Snackbar from 'react-native-snackbar';
import {AirbnbRating, Rating} from 'react-native-elements';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useStoreState} from 'easy-peasy';
import {HelperText} from 'react-native-paper';

const source = axios.CancelToken.source();

const validationSchema = Yup.object().shape({
  VenueID: Yup.string().required('Required'),
  Rating: Yup.string()
    .min(1, 'Rating must be between 1 to 5')
    .max(1, 'Rating must be between 1 to 5')
    .required('Required'),

  ReviewText: Yup.string()
    .min(3, 'Review must be of atleast 3 charaters long')
    .max(500, 'Review must be of atmost 500 charaters long')
    .required('Required'),
});

const LodgeReviewPage = props => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [initialFormValues, setInitialFormValues] = React.useState({
    VenueID: '',
    Rating: '',
    ReviewText: '',
  });
  const [venueList, setVenueList] = React.useState([]);
  const globalPayload = useStoreState(state => state.payload);

  const resetForm = () => {
    setIsLoading(false);
    setInitialFormValues({VenueID: '', Rating: '', ReviewText: ''});
    setVenueList([]);
    source.cancel('Data fetch cancelled');
  };

  useEffect(() => {
    getVenueDropdown();
    return () => resetForm();
  }, []);

  const submitForm = formData => {
    console.log(formData);
    if (formData != null || formData != {}) {
      saveData(formData);
    }
  };

  const saveData = async data => {
    let formData = Object.assign({}, data);
    formData.VenueID = formData.VenueID;

    console.log('global payload in review', globalPayload);
    let configurationObject = {
      url: `${BASE_URL}InsertVenueReview`,
      method: 'POST',
      cancelToken: source.token,
      data: {...formData, UserID: globalPayload.userId},
    };
    try {
      setIsLoading(true);
      const response = await axios(configurationObject);
      if (response.data.ResponseCode === '00') {
        setIsLoading(false);
        Snackbar.show({
          text: response.data.ResponseDesc,
          duration: Snackbar.LENGTH_LONG,
          textColor: 'white',
          backgroundColor: 'green',
        });
        setInitialFormValues({VenueID: '', Rating: '', ReviewText: ''});
        return;
      } else {
        setIsLoading(false);
        Snackbar.show({
          text: response.data.ResponseDesc,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#B53849',
          textColor: 'black',
          action: {
            text: 'OK',
            textColor: 'black',
            onPress: () => {
              /* Do something. */
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_LONG,
        textColor: 'black',
        backgroundColor: '#B53849',
        action: {
          text: 'OK',
          textColor: 'black',
          onPress: () => {
            /* Do something. */
          },
        },
      });
    }
  };

  const getVenueDropdown = async () => {
    let configurationObject = {
      url: `${BASE_URL}GetVenueList_DD`,
      method: 'GET',
    };
    try {
      const response = await axios(configurationObject);
      if (response.data.ResponseCode == '00') {
        if (response.data.Result_DTO) {
          setVenueList(response.data.Result_DTO);
        }
        return;
      } else {
        setVenueList([]);
      }
    } catch (error) {
      setVenueList([]);
    }
  };

  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading} />

      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Review/Feedback</Text>
      </View>
      <ScrollView>
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values, errors) => submitForm(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValidating,
          }) => {
            const myChangeFunc = (key, val) => {
              console.log(key, val);
              setInitialFormValues({...initialFormValues, [key]: val});
              return handleChange(val);
            };

            const mySelectFunc = (key, val) => {
              console.log(key, val);
              setInitialFormValues({...initialFormValues, [key]: val});
            };

            return (
              <View>
                <SelectField
                  errorMsgStyle={styles.errorMsg}
                  items={venueList}
                  value={values.VenueID}
                  onChange={e => {
                    mySelectFunc('VenueID', e);
                  }}
                  error={[errors.VenueID]}
                  nameOfIcon="envelope"
                  mode="dialog"
                  placeholder="Select Venue"
                />

                {/* <TextField
                    placeholder="Rating" style={styles.labelText}
                    keyboardType='phone-pad'
                    mode="outlined"
                    placeholderTextColor="#800000"
                    nameOfIcon="envelope"
                    maxLength={1}
                    onChangeText={(e) => { myChangeFunc('Rating', e) }}
                    onBlur={handleBlur('Rating')}
                    value={values.Rating}
                    error={[errors.Rating]}
                  /> */}
                <View style={styles.rating}>
                  <Text style={styles.rating.ratingLabel}>Ratings:</Text>
                  <View style={styles.rating.ratingStar}>
                    <Rating
                      type="custom"
                      ratingColor="#800000"
                      count={5}
                      imageSize={35}
                      startingValue={initialFormValues.Rating}
                      onFinishRating={rating =>
                        myChangeFunc('Rating', rating.toString())
                      }
                      style={styles.RatingStyle}
                    />
                    {errors.Rating ? (
                      <HelperText type="error" style={styles.errorMsg}>
                        {errors.Rating}
                      </HelperText>
                    ) : null}
                  </View>
                </View>

                <MultiLineTextInput
                  errorMsgStyle={styles.errorMsg}
                  placeholder="Enter Review .."
                  style={styles.labelText}
                  keyboardType="default"
                  mode="outlined"
                  placeholderTextColor="#800000"
                  nameOfIcon="comment"
                  maxLength={500}
                  onChangeText={e => {
                    myChangeFunc('ReviewText', e);
                  }}
                  onBlur={handleBlur('ReviewText')}
                  value={values.ReviewText}
                  error={[errors.ReviewText]}
                  numberOfLines={3}
                />

                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.submitButtonWrapper}>
                  <Text style={styles.submitButtonText}>SUBMIT REVIEW</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  titleWrapper: {
    width: 278,
    height: 111,
  },
  title: {
    color: 'black',
    fontSize: 40,
    width: 335,
    height: 70,
    flex: 1,
    fontFamily: 'cursive',
    marginLeft: 10,
    marginTop: 30,
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: 28,
  },
  submitButtonWrapper: {
    height: 59,
    //backgroundColor: "rgba(31,178,204,1)",
    backgroundColor: 'rgba(142,7,27,1)',
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 14,
    marginBottom: 14,
  },
  submitButtonText: {
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    fontSize: 20,
    alignSelf: 'center',
  },
  RatingStyle: {
    margin: 5,
    textAlign: 'center',
    alignSelf: 'center',
  },
  rating: {
    height: 59,
    backgroundColor: 'rgba(255,255,255,1)',
    Opacity: 0.2,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'rgba(157,24,24,0.8)',
    flexDirection: 'row',
    margin: 20,
    flexDirection: 'row',
    ratingLabel: {
      margin: 15,
      alignSelf: 'flex-start',
      height: 50,
      fontSize: 15,
      color: '#800000',
    },
    ratingStar: {
      fontSize: 16,
      marginTop: 8,
    },
  },
  eventDetails: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 14,
    marginBottom: 14,
  },
  textField: {
    flex: 8,
    height: 50,
    color: 'rgba(255,255,255,1)',
    marginTop: 14,
  },
  errorMsg: {
    color: 'red',
    marginRight: 20,
    marginLeft: 20,
    fontSize: 11,
    fontStyle: 'italic',
  },
  eventChilds: {
    flex: 6,
    content: {
      viewTypeLeft: {
        color: 'white',
        alignSelf: 'flex-start',
        alignContent: 'space-around',
      },
      viewTypeRight: {
        color: 'white',
        alignSelf: 'flex-end',
        alignContent: 'space-around',
      },
    },
  },
});

export default LodgeReviewPage;
