import ImgToBase64 from 'react-native-image-base64';
var RNFS = require('react-native-fs');
export class CommonHelper{

    static convertFileToBase64(file) {
        console.log('file in helper')
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            let base64Str = reader.result.toString();
            let base64 = base64Str.substring(
              base64Str.indexOf(',') + 1,
              base64Str.length - 1
            );
            console.log('resolving base64',base64)
            resolve(base64);
            console.log('resolved base64',base64)

          };
          reader.onerror = (error) => reject(error);
        });
      }


 
    //   static convertImgTobase64(file){
    //       console.log('file in comn func',file)
    //     ImgToBase64.getBase64String(file.uri)
    //     .then(base64String => {
    //         console.log('base64,',base64String) 
    //         return base64String})
    //     .catch(err => doSomethingWith(err));
    //   }

    static convertImageTobase64(file){
        console.log(file)
        var data =  RNFS.readFile(file, 'base64').then(res => { return res });
        console.log(data)

    }
  
   

     
}

