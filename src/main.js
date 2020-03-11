// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/reset.css";
import MyHttpServer from '././components/plugins/http';
import moment from 'moment'


Vue.use(ElementUI);
Vue.use(MyHttpServer);
Vue.config.productionTip = false

/* eslint-disable no-new */
 //全局日期格式

  Vue.filter('fmtdate',(v)=>{
  return moment(v).format(' YYYY-MM-DD')

  })
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
