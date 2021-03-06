const path = require('path')
console.log(path.resolve(__dirname))
require('dotenv').config({path:".env"});
const HDWalletProvider = require('@truffle/hdwallet-provider');
    const web3 = require("web3");

export default{
  install(Vue, options) {
    console.log("called at ");

    const NFTContract = require("../../contracts/NFTItem.json");
    const MUMBAI = `https://rpc-mumbai.maticvigil.com/v1/${API_KEY}`



    const provider = new HDWalletProvider(
      MNEMONIC,
      MUMBAI
    );

    const web3Instance = new web3(provider);

    console.log({
      MNEMONIC,
      API_KEY,
      NFTContract,
      web3Instance
    });

    Vue.prototype.$web3Intitiate= async function(){
      const accounts = await web3Instance.eth.getAccounts();

      const networkId = await web3Instance.eth.net.getId();

      const nftContract = new web3Instance.eth.Contract(
          NFTContract.abi,
          NFTContract.networks[networkId] && NFTContract.networks[networkId].address,
      );

      return {accounts,nftContract};
    }

  },
}
