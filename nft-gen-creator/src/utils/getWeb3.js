import Web3 from "web3";

export default () => {
  return new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        console.log(window.ethereum.networkVersion)
        if(window.ethereum.networkVersion!=80001){
          reject("Please use polygon mumbai test net");
        }
        const web3 = new Web3(window.ethereum);
        try {
          // ask user permission to access his accounts
          await window.ethereum.request({ method: "eth_requestAccounts" });
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("must install MetaMask");
      }
    });
  });
};


