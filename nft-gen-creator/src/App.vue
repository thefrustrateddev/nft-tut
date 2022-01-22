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
import NFTContract from '../contracts/NFTItem.json';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data(){
    return {
      accounts:[],
      contract:[],
      }
  },
  async created(){
    // console.log(getWeb3);
    let web3= await getWeb3();
    console.log(web3)

    const accounts = await web3.eth.getAccounts();

    const networkId = await web3.eth.net.getId();

    const nftContract = new web3.eth.Contract(
        NFTContract.abi,
        NFTContract.networks[networkId] && NFTContract.networks[networkId].address,
    );

    console.log({accounts,networkId,nftContract});

    // console.log(web3)
    // console.log("CALLED")
    // console.log("miounterd");
    // let {accounts,nftContract} = await this.$web3Intitiate();
    // console.log(accounts)
    this.$nextTick(()=>{
      this.accounts=accounts;
      this.contract=nftContract;
    })

    // console.log(this.accounts)
  },

  mounted(){
  },
  methods:{
    async mintItem(){
      console.log(this.contract.methods, this.accounts[0])
      await this.contract.methods
      .awardItem(this.accounts[0], `https://ipfs.io/ipfs/QmQ9KafmvKvHhHCaajokwhkbWDKxXCoeWejWNHmFeNjvEh`)
      .send({ from: this.accounts[0] }).then(console.log('minted')).catch(error => console.log(error));
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
