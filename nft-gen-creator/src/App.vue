<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <p>{{accounts}}</p>
    <button @click="mintItem">
      Mint
    </button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import getWeb3 from './utils/getWeb3.js';
import randomNumGen from './utils/randomNumGen.js';
import NFTContract from './contracts/NFTItem.json';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data(){
    return {
      accounts:[],
      nftContractInstance:[],
      loaded:false,
    }
  },
  async created(){
    try{
    let web3= await getWeb3();
      console.log(web3)

      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();

      const nftContractInstance = new web3.eth.Contract(
          NFTContract.abi,
          NFTContract.networks[networkId] && NFTContract.networks[networkId].address,
      );

      this.$nextTick(()=>{
        this.accounts=accounts;
        this.nftContractInstance=nftContractInstance;
      });
    }
    catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

  },

  methods:{

    async addJson(){
      console.log(Math.random(0,1))
      let json ={
        "name":"Frustrated Blob Item",
        "description":"Frustrated blotch of paint.",
        "image":`https://ipfs.io/ipfs/QmPiSD6Z8jt6pAQnSo6uXXw6QAJeneBWJqhpqtzpT94oNQ/blob${randomNumGen(1,6)}.png`,
        "attributes":['blob','frustrated','dev']
      }
      let res = await this.$addJSON(json);
      return res;
    },
    async mintItem(){
      let pinataIPFS = await this.addJson();
      console.log(pinataIPFS);
      console.log(`https://ipfs.io/ipfs/${pinataIPFS.IpfsHash}`);

      let res = await this.nftContractInstance.methods
      .awardItem(this.accounts[0], `https://ipfs.io/ipfs/${pinataIPFS.IpfsHash}`)
      .send({ from: this.accounts[0] }).then(console.log('minted')).catch(error => console.log(error));

      console.log(res);
      alert("Minted")
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
