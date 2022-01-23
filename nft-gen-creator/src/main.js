import Vue from 'vue';
import App from './App.vue';
import pinata from './plugins/pinata';
Vue.config.productionTip = false;

Vue.use(pinata);

// (async () => {
//   console.log(getWeb3);
//   let web3= await getWeb3();
//   console.log(web3)
//   // the rest of the code
// })();



new Vue({
  render: (h) => h(App),
}).$mount('#app');
