// const pinataSDK = require('@pinata/sdk');
// const pinata = pinataSDK('33c7c98a07dc16b4ae9d', '0e85329f6ac3d13edf653b37864ec5dafbc7bf11d47954e0b83c21ae0790e434');
export default{
  install(Vue, options) {
    Vue.prototype.$testAuth= async function(){
      // pinata.testAuthentication().then((result) => {
      //     //handle successful authentication here
      //     console.log(result);
      // }).catch((err) => {
      //     //handle error here
      //     console.log(err);
      // });
    }

    Vue.prototype.$addFile= async function(file,options){
      // const fs = require('fs');
      // const readableStreamForFile = fs.createReadStream("nft_data/2.png");

      // const options = {
      //     pinataMetadata: {
      //         name: "MyCustomName1",
      //         keyvalues: {
      //             customKey: 'customValue2',
      //             customKey2: 'customValue21'
      //         }
      //     },
      //     pinataOptions: {
      //         cidVersion: 0
      //     }
      // };
      // pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
      //     //handle results here
      //     console.log({result});
      // }).catch((err) => {
      //     //handle error here
      //     console.log(err);
      // });
    }

    Vue.prototype.$addJSON= async function(json,options){
      // const json = {
      //     message: 'Pinatas are awesome'
      // };
      // const options = {
      //     pinataMetadata: {
      //         name: "MyCustomNamejsonasd",
      //     },
      //     pinataOptions: {
      //         cidVersion: 0
      //     }
      // };
      // pinata.pinJSONToIPFS(body, options).then((result) => {
      //     //handle results here
      //     console.log(result);
      // }).catch((err) => {
      //     //handle error here
      //     console.log(err);
      // });
    }

  },
}
