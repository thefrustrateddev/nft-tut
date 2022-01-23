const pinataSDK = require('@pinata/sdk');

const PINATA_KEY = process.env.VUE_APP_PINATA_KEY;
const PINATA_SECRET = process.env.VUE_APP_PINATA_SECRET;

const pinata = pinataSDK(PINATA_KEY, PINATA_SECRET);

export default{
  install(Vue, options) {
    Vue.prototype.$testAuth= async function(){
      let result;
      try{
        result = await pinata.testAuthentication()
      }
      catch(err){
        console.log(err);
        return err
      }

      return result
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
      if(!json){
        return true;
      }

      // json ={
      //   "name":"Frustrated Blob Item",
      //   "description":"Frustrated blotch of paint.",
      //   "image":"https://ipfs.io/ipfs/QmPiSD6Z8jt6pAQnSo6uXXw6QAJeneBWJqhpqtzpT94oNQ/blob1.png",
      //    "attributes":['blob','frustrated','dev']
      // }
      if(!options){
        options = {
          pinataMetadata: {
              name: "Frustrated Blob",
              keyvalues: {
                itemVer: "FDB1.0",
            }
          },

          pinataOptions: {
              cidVersion: 0
          }
        };
      }
      let result;
      try{
        result=pinata.pinJSONToIPFS(json, options);
      }
      catch(err){
        console.log(err);
        return err
      }
      return result;
    }

  },
}
