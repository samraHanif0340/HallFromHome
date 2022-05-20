import React, { Component, useEffect, useState, useCallback } from "react";
import { StyleSheet, View, StatusBar, ImageBackground, SafeAreaView, Text, Image } from "react-native";
import { Loader } from '../../components/customComponents/customComponents'
import axios from 'axios';
import { BASE_URL } from '../../constants/constants'
import { TouchableOpacity } from "react-native-gesture-handler";
import DocumentPicker from 'react-native-document-picker';
var RNFS = require('react-native-fs');
import { useStoreState, useStoreActions } from 'easy-peasy';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import Snackbar from 'react-native-snackbar';


const source = axios.CancelToken.source();
const HallVideoPicturesPage = (props) => {

  const [fileResponse, setFileResponse] = useState([]);
  const [filesArray, setFilesArray] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false)
  const appendPayload = useStoreActions((actions) => actions.appendPayload);
  const globalPayload = useStoreState((state) => state.payload);

  const goToInternalServicesPage = () => {
    props.navigation.push('VenueInternalServices')
  }

  const uploadDocument = () => {
    if (filesArray != null) {
      let ImageList = filesArray.map((file) => { return file.fileBase64 })
      appendPayload({ ImageList: ImageList });
      goToInternalServicesPage()
    } else {
      Snackbar.show({
        text: 'Please Select a File',
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'OK',
          textColor: 'white',
          onPress: () => { /* Do something. */ },
        },
      });
    }
  };

  const handleDocumentSelection = useCallback(async () => {
    setFilesArray(null)
    appendPayload({ ImageList: null })
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        presentationStyle: 'fullScreen',
        allowMultiSelection: true
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      let filesArrayCopy = [...filesArray]
      for (let i = 0; i < res.length; i++) {

        (async () => {
          const file = res[i];
          let base64 = (await RNFS.readFile(file.uri, 'base64'))

          let obj = {
            fileName: file.name,
            fileType: file.type,
            fileBase64: base64
          }
          filesArrayCopy.push(obj)
          if (i == res.length - 1) {
            setFilesArray(filesArrayCopy)
            console.log('filesArray', filesArrayCopy)
          }
        })()
      }

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
  }, []);

  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading} />

      <StatusBar barStyle="light-content" backgroundColor="rgba(142,7,27,1)" />
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Add Venue Pictures</Text>
      </View>
      <SafeAreaView style={styles.container} >
        <TouchableOpacity onPress={handleDocumentSelection} style={styles.uploadFileWrapper}>
          <Text style={styles.uploadFileIcon}><FontAwesomeIcon icon={faFileUpload} size={100} color='#800000' /></Text>
        </TouchableOpacity>
        
        {filesArray != null && filesArray.length > 0 ? <Text style={styles.pictureListTitle}>Pictures List</Text> : null}
        {
          filesArray != null && filesArray.length > 0 ? filesArray.map((file, index) => (
            <>
              <View style={styles.ImageDisplayContainer} key={index}>
                <Image style={styles.uploadedImage} source={{ uri: 'data:' + file.fileType + ';base64,' + file.fileBase64 }}></Image>

                <Text style={styles.textStyle}>
                  {file.fileName ? file.fileName : ''}
                  {'\n'}

                </Text>
              </View>

            </>
          )) : null}

        <TouchableOpacity onPress={uploadDocument} style={styles.selectFileButton}>
          <Text style={styles.selectFileText}>Upload</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleWrapper: {
    width: 278,
    height: 111,
    alignContent: "center",
    textAlign: "center"
  },
  title: {
    color: "black",
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
  uploadFileWrapper:{
    borderColor:'#800000',
    height:200,
    borderWidth:2,
    marginLeft:20,
    marginRight:20,
    borderStyle:'dotted'
  },
  uploadFileIcon:{
    alignSelf:'center',
    marginVertical:40,
    borderRadius:50,
    backgroundColor:'#800000',
    opacity:0.2
  },
  selectFileButton: {
    height: 59,
    backgroundColor: "rgba(142,7,27,1)",
    borderRadius: 5,
    justifyContent: "center",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 14,
    marginBottom: 14
  },
  selectFileText: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 20,
    alignSelf: "center"
  },
  pictureListTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black'
  },
  ImageDisplayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 5,
    borderRadius: 10,
    shadowColor: '#000',
    height: 75,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'floralwhite',
    marginLeft: 15,
    marginRight: 15,
    marginTop:10
  },
  uploadedImage: {
    width: 100,
    height: 70,
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'center'
  },
  textStyle: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
    alignSelf: 'center'
  },

});

export default HallVideoPicturesPage;


