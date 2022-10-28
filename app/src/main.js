import Vue from 'vue'
import App from './App.vue'
import TypeNav from "@/components/TypeNav"
import store from "@/store"
Vue.component(TypeNav.name,TypeNav)
Vue.config.productionTip = false
import router from "@/Router"
import Carousel from "@/components/Carousel"
Vue.component(Carousel.name,Carousel)
import Pagination from "@/components/Pagination"
Vue.component(Pagination.name,Pagination)
import "@/mock/mokeServe.js"
import "swiper/css/swiper.css"
import *as API from "@/api"
import {Button, MessageBox,} from "element-ui"
import VueLazyload from 'vue-lazyload'
import pyy from "@/assets/images/彭于晏.jpg"
Vue.use(VueLazyload, {
  loading: pyy
})
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;  
import "@/plugins/validate"
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  }
  ,
  router,
  store
}).$mount('#app')
