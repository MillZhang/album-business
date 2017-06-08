// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueLazyLoad from 'vue-lazyload'
// import vconsole from 'vconsole'
// import 'font-awesome/css/font-awesome.min.css';

import App from './App'
import Loading from 'components/common/Loading'
import {
  Field,
  Toast,
  MessageBox,
  Swipe,
  SwipeItem,
  Actionsheet,
  Checklist,
  Popup,
  Picker,
  InfiniteScroll
} from 'mint-ui';
import 'mint-ui/lib/style.css'

import router from './manage/router.manage'
import 'assets/css/Common.css'
import 'assets/css/font.scss'
require('jsPath/lib/flexible')
import 'jsPath/tool/filter'
// require('jsPath/lib/zepto.touch')

import Util from 'jsPath/tool/Util'
import Cache from 'jsPath/tool/Cache'
Vue.use(VueResource);
Vue.use(InfiniteScroll);
Vue.component(Field.name, Field);
Vue.component(Checklist.name, Checklist);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);

import insertSrc from 'assets/images/icon/icon-inert.png';
Vue.use(VueLazyLoad, {
  loading: insertSrc,
  try: 6
});

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Actionsheet.name, Actionsheet);
Vue.config.silent = true
  /* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});
window.App = app;

let loading = new Vue({
  el: '#help',
  template: '<loading v-show="showLoading"></loading>',
  data: {
    showLoading: false
  },
  components: {
    Loading
  }
});
//拦截器
Vue.http.interceptors.push(function(request, next) {
  loading.showLoading = true
  next(function(response) {
    loading.showLoading = false
    return response
  })
});
//常量类
Vue.prototype.utils = Util;
Vue.prototype.$toast = Toast;
Vue.prototype.cache = Cache;
Vue.prototype.config = {};
