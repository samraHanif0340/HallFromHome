import React, { Component, useEffect,useState,useCallback } from "react";
import { StyleSheet, View, StatusBar, ImageBackground,SafeAreaView,Text,Image } from "react-native";
import { Loader } from '../../components/customComponents/customComponents'
import axios from 'axios';
import { BASE_URL } from '../../constants/constants'
import { TouchableHighlight,TouchableOpacity } from "react-native-gesture-handler";
import DocumentPicker from 'react-native-document-picker';
import { CommonHelper } from "../../components/utility/helper";
var RNFS = require('react-native-fs');
import { useStoreState,useStoreActions } from 'easy-peasy';




const source = axios.CancelToken.source();
const  HallVideoPicturesPage = (props) => {

  const [fileResponse, setFileResponse] = useState([]);
  const [filesArray, setFilesArray] = useState([]);

  const [isLoading, setIsLoading] = React.useState(false)
  const appendPayload = useStoreActions((actions) => actions.appendPayload);
  const globalPayload = useStoreState((state) => state.payload);



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



const uploadDocument =  () => {
    if (filesArray != null) {
     
         appendPayload({ ImageURL: filesArray });
      console.log('global payload in venue addition', globalPayload)
      // const data = new FormData();
      // data.append('file_attachment', fileToUpload);
      //   console.log('fileData',data)
        goToInternalServicesPage()
    } else {
      alert('Please Select File first');
    }
  };
  const handleDocumentSelection = useCallback(async () => {
    try {
      const res = await DocumentPicker.pick({
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
      console.log(res)
      let filesArrayCopy = [...filesArray]
      res.map( async (file)=>{
        let base64 = ( await RNFS.readFile(file.uri, 'base64'))
        console.log(base64)
        let obj = {
          // fileName: file.name,
          // fileType:file.type,
          fileBase64: base64.toString()
        }
       filesArray.push(obj.fileBase64)   
      })
      setFilesArray(filesArrayCopy)
      console.log('filesArray',filesArray)
      setFileResponse(res);
    } catch (err) {
      setFilesArray([]);
      if (DocumentPicker.isCancel(err)) {
        setFilesArray([]);
      } else {
        setFilesArray([]);
      console.log(err)
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
{ 
filesArray != null &&   filesArray.length > 0 ? filesArray.map((file, index) => (
  <>
        {/* <Text style={styles.textStyle}>
          File Name: {file.fileName ? file.fileName : ''}
          {'\n'}
          
        </Text> */}
        {/* <Image style={{width: 100, height: 50}} source={{uri:'data:${file.fileType};base64,${file.fileBase64}'}}></Image> */}
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
  titleWrapper: {
    width: 278,
    height: 111,
    alignContent: "center",
    textAlign: "center"
  },
  title: {
    color: "rgba(248,231,28,1)",
    fontSize: 40,
    width: 335,
    height: 70,
    flex: 1,
    fontFamily: "cursive",
    marginLeft: 30,
    marginTop: 30,
    marginRight: 30,
    alignContent: "center",
    textAlign: "center",
    //fontFamily: "dancing-script-regular",
    marginBottom: 28
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


