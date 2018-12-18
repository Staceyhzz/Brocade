// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/';
// import './mock/mock';

//封装
import http from './http/index.js'
Vue.use(http);

//token
import token from 'utils/cache.js';
Vue.prototype.$token = token;

//公共方法
import commonJs from 'utils/public_fun.js';
Vue.use(commonJs);

//国际化
import i18n from './lang';


//ui框架
import iView from 'iview';
import './assets/style/theme/rest-iview.less';
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
});

//全局组件
import cmpt from 'components/index.js';
Vue.use(cmpt);


Vue.config.productionTip = false;
Vue.config.debug = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})