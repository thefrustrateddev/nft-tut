const HDWalletProvider = require('@truffle/hdwallet-provider');
const web3 = require("web3");
const path = require("path");
require('dotenv').config();

// const pinataSDK = require('@pinata/sdk');
// const pinata = pinataSDK('33c7c98a07dc16b4ae9d', '0e85329f6ac3d13edf653b37864ec5dafbc7bf11d47954e0b83c21ae0790e434');

// console.log({pinata})
// pinata.testAuthentication().then((result) => {
//     //handle successful authentication here
//     console.log(result);
// }).catch((err) => {
//     //handle error here
//     console.log(err);
// });

//** */
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

// const body = {
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

//** */


const NFTContract = require("../build/contracts/NFTItem.json");

//*vars
const MNEMONIC = process.env.MNEMONIC
const API_KEY = process.env.NODE_KEY


//* Remember to write the nft address in manually after deploying the contract
const NFT_CONTRACT_ADDRESS = ""
const OWNER_ADDRESS = "";
const MUMBAI = `https://rpc-mumbai.maticvigil.com/v1/${API_KEY}`
const MATIC = `https://rpc-mainnet.maticvigil.com/v1/${API_KEY}`
const NUM_ITEMS = 5;


//*Parse the contract artifact for ABI reference.
// let rawdata = fs.readFileSync(path.resolve(__dirname, "../build/contracts/GameItem.json"));
// let contractAbi = JSON.parse(rawdata);
// const NFT_ABI = contractAbi.abi

async function main() {

  try {
    //*define web3, contract and wallet instances
    console.log(MNEMONIC,
        MUMBAI)
    const provider = new HDWalletProvider(
      MNEMONIC,
      MUMBAI
    );

    const web3Instance = new web3(provider);

    const accounts = await web3Instance.eth.getAccounts();

    const networkId = await web3Instance.eth.net.getId();

    const nftContract = new web3Instance.eth.Contract(
        NFTContract.abi,
        NFTContract.networks[networkId] && NFTContract.networks[networkId].address,
    );

console.log(accounts[0])
      //* just mint 
    await nftContract.methods
      .awardItem(accounts[0], `https://ipfs.io/ipfs/QmQ9KafmvKvHhHCaajokwhkbWDKxXCoeWejWNHmFeNjvEh`)
      .send({ from: accounts[0] }).then(console.log('minted')).catch(error => console.log(error));


    //* mint for a certain amount
    /*
    for (var i = 1; i < NUM_ITEMS; i++) {
      await nftContract.methods
        .mintItem(OWNER_ADDRESS, `https://ipfs.io/ipfs/QmZ13J2TyXTKjjyA46rYENRQYxEKjGtG6qyxUSXwhJZmZt/${i}.json`)
        .send({ from: OWNER_ADDRESS }).then(console.log('minted')).catch(error => console.log(error));
    }
    */
  }
  
  catch (e) {
    console.log(e)
  }
}

//invoke
main().then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });