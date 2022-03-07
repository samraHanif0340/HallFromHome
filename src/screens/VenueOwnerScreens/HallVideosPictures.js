import React, { Component, useEffect,useState,useCallback } from "react";
import { StyleSheet, View, StatusBar, ImageBackground,SafeAreaView,Text,Image } from "react-native";
import { Loader } from '../../components/customComponents/customComponents'
import axios from 'axios';
import { BASE_URL } from '../../constants/constants'
import { TouchableHighlight,TouchableOpacity } from "react-native-gesture-handler";
import DocumentPicker from 'react-native-document-picker';

const source = axios.CancelToken.source();
const  HallVideoPicturesPage = (props) => {

  const [fileResponse, setFileResponse] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false)


  const goToInternalServicesPage = () =>{
    props.navigation.push('VenueInternalServices')
  }

  const getData = async () => {
    const configurationObject = {
        url: `${BASE_URL}GetVenueReviews`,
        method: "POST",
        cancelToken: source.token,
        data: { venueID: props.venueID },
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
        setmasterData([])
        Snackbar.show({
          text: response.data.ResponseDesc,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: 'black',
          textColor: 'white',
          action: {
            text: 'OK',
            textColor: 'white',
            onPress: () => { /* Do something. */ },
          },
        });
      }
    } catch (error) {
      setmasterData([])
      setIsLoading(false);
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'black',
        textColor: 'white',
        action: {
          text: 'OK',
          textColor: 'white',
          onPress: () => { /* Do something. */ },
        },
      });

    }
  };


  useEffect(() => {
    // getData();

    return () => source.cancel("Data fetching cancelled");
  }, []);

//   const handleDocumentSelection = useCallback(async () => {
//     try {
//       const response = await DocumentPicker.pick({
//         presentationStyle: 'fullScreen',
//       });
//       setFileResponse(response);
//     } catch (err) {
//       console.warn(err);
//     }
//   }, []);

const uploadDocument = async () => {
    if (fileResponse != null) {
      const fileToUpload = fileResponse;
      const data = new FormData();
      data.append('file_attachment', fileToUpload);
        console.log('fileData',data)
        goToInternalServicesPage()
    } else {
      alert('Please Select File first');
    }
  };
  const handleDocumentSelection = useCallback(async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
        presentationStyle:'fullScreen',
        allowMultiSelection:true
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      // for (const res of res) {
      //   console.log('res : ' + JSON.stringify(res));
      //   console.log('URI : ' + res.uri);
      //   console.log('Type : ' + res.type);
      //   console.log('File Name : ' + res.name);
      //   console.log('File Size : ' + res.size);
      // }
      console.log(res)
      // Setting the state to show single file attributes
      setFileResponse(res);
    } catch (err) {
        setFileResponse(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        setFileResponse(null);

        alert('Canceled');
      } else {
        // For Unknown Error
        setFileResponse(null);

        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  },[]);

  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading} />

      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <ImageBackground style={styles.container}
        source={require("../../assets/images/Gradient_MI39RPu.png")}
      >

<View style={styles.titleWrapper}>
          <Text style={styles.title}>Add Venue Pictures</Text>
        </View>
           <SafeAreaView style={styles.container} >
     
      {/* {fileResponse.map((file, index) => (
        <Text
          key={index.toString()}
          style={styles.uri}
          numberOfLines={3}
          ellipsizeMode={'middle'}>
          {file?.uri}
        </Text>
      ))} */}
{ 
fileResponse != null &&   fileResponse.length > 0 ? fileResponse.map((file, index) => (
  <>
        <Text style={styles.textStyle}>
          File Name: {fileResponse[0].name ? fileResponse[0].name : ''}
          {'\n'}
          Type: {fileResponse[0].type ? fileResponse[0].type : ''}
          {'\n'}
          File Size: {fileResponse[0].size ? fileResponse[0].size : ''}
          {'\n'}
          URI: {fileResponse[0].uri ? fileResponse[0].uri : ''}
          {'\n'}
        </Text>
        <Image source={{uri: fileResponse[0].uri}}></Image>
        </>
      )) : null} 
      
      <TouchableOpacity onPress={handleDocumentSelection} style={styles.selectFileButton}>
            <Text style={styles.selectFileText}>Select 📑</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={uploadDocument} style={styles.selectFileButton}>
            <Text style={styles.selectFileText}>Upload Picture</Text>
       </TouchableOpacity>
    </SafeAreaView>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectFileButton: {
    height: 59,
    //backgroundColor: "rgba(31,178,204,1)",
    backgroundColor: "rgba(142,7,27,1)",
    borderRadius: 5,
    justifyContent: "center",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 14,
    marginBottom:14
  },
  selectFileText: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 20,
    alignSelf: "center"
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
    color:'black'
  },

});

export default HallVideoPicturesPage;


