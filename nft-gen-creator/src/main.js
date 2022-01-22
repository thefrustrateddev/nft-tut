import Vue from 'vue';
import App from './App.vue';
// import web3 from './plugins/web3';
import getWeb3 from './utils/getWeb3.js';
Vue.config.productionTip = false;

// Vue.use(web3);

// (async () => {
//   console.log(getWeb3);
//   let web3= await getWeb3();
//   console.log(web3)
//   // the rest of the code
// })();



new Vue({
  render: (h) => h(App),
}).$mount('#app');
