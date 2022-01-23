<template>
  <div id="app">
    <img class="logo-img" alt="Vue logo" src="./assets/logo.png">
    <h1>NFT Minter</h1>
      <div v-if="!accounts[0]" class="load">Loading...</div>
      <div v-else>
        <p>This site helps u mint random nfts to your openseas test account. Contract is deployed on <b><a target="__blank" href="https://mumbai.polygonscan.com/">Polygon Mumbai Testnet</a></b>.</p>
        <p>In order to generate "MATIC". Please use this <a target="__blank" href="https://faucet.polygon.technology/">website</a>.</p>
        <p>Please use this <a target="__blank" href="https://polygonscan.com/">wesbite</a> to add the metamask Polygon network.</p>
        <p>To check your minted NFTs, please check this <a target="__blank" href="https://testnets.opensea.io/">website</a>.</p>


        <div class="mint-btn" @click="mintItem">
          Mint
        </div>
      </div>
    <!--https://testnets-api.opensea.io/asset/mumbai/0xdbc04915cd926b1120b8018ed4a80b4c108cae35/1/validate/-->
    </div>
</template>

<script>
import getWeb3 from './utils/getWeb3.js';
import randomNumGen from './utils/randomNumGen.js';
import NFTContract from './contracts/NFTItem.json';

export default {
  name: 'App',
  data(){
    return {
      accounts:[],
      nftContractInstance:[],
      loaded:false,
      isMinted:false,
      imgsrc:'',
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
        this.listenToNFTMint();
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
    listenToNFTMint(){
      this.nftContractInstance.events.NFTMinted({to:this.accounts[0]}).on('data',this.updateStatus)
    },
    updateStatus(){
      this.isMinted=true
    },
    async addJson(){
      this.imgsrc = `https://ipfs.io/ipfs/QmPiSD6Z8jt6pAQnSo6uXXw6QAJeneBWJqhpqtzpT94oNQ/blob${randomNumGen(1,6)}.png`;
      console.log(Math.random(0,1))
      let json ={
        "name":"Frustrated Blob Item",
        "description":"Frustrated blotch of paint.",
        "image":this.imgsrc,
        "attributes":['blob','frustrated','dev']
      }
      let res = await this.$addJSON(json);
      return res;
    },
    async mintItem(){
      this.isMinted=false;
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
  margin-top: 60px;
    color:#fff;
        display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
a{
  color:#e99202;
  text-decoration: none;
}
.load{
  color:#e99202;
  font-size: 24px;
}
body{
  background:#2a2a2a;

}
h1{
  color:#fff
}

.logo-img{
  max-width: 300px;
}

.mint-btn{
    margin-top: 60px;
    padding: 20px 40px;
    border-radius: 10px;
    font-size: 18px;
    background: #009f90;
}
</style>
