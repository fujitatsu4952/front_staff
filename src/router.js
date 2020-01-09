import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Control'
import Hotel from './views/Hotel'
import Qrcode from './views/Qrcode/Qrcodegenerator'

var url = window.location.href;
    var decoded = decodeURI(url); //日本語が入ったURLクエリにも対応する為のデコード
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
    path: '/hotel',
    name: 'hotel',
    component: Hotel
  },
  {
    path: '/qrcode',
    name: 'qrcode',
    component: Qrcode
  },
]
})