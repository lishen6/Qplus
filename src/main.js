// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueResource from 'vue-resource';
import store from './store/index';
import { InfiniteScroll } from 'mint-ui';
import 'mint-ui/lib/style.css'
import { Indicator } from 'mint-ui';
import { Spinner } from 'mint-ui';




//   在main.js 内引入
Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(InfiniteScroll);
Vue.component(Spinner.name, Spinner);


// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
