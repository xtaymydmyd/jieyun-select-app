import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Lockr from 'lockr'
import Cookies from 'js-cookie'
import _ from 'lodash'
import moment from 'moment'
import locale from 'moment/locale/zh-cn.js' // moment中文
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'

Vue.use(VueI18n)
Vue.use(Vuex)
Vue.config.lang = 'zh'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import 'font-awesome/css/font-awesome.css'

import constGlobal from 'assets/js/constGlobal'
import http from 'assets/js/http'
import global from 'assets/js/global'

const FastClick = require('fastclick')
FastClick.attach(document.body)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    error: 'static/img/imgError.png',
    attempt: 1
})

/** 滚动分页***/
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui'
Vue.use(Mint)
import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll)
import { Loadmore } from 'mint-ui'
Vue.component(Loadmore.name, Loadmore)

const HOST = 'http://127.0.0.1:8088'
window.HOST = HOST
axios.defaults.baseURL = HOST
axios.defaults.timeout = 1000 * 15
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/json'

const router = new VueRouter({
    base: '/', // APP
    routes: []
})
Vue.use(VueRouter)

router.beforeEach((to, from, next) => {
    NProgress.start()
    sessionStorage.setItem('from', JSON.stringify(from.path))
    sessionStorage.setItem('to', JSON.stringify(to.path))
    global.wxSetTitle(to.meta.title)
    console.log('from: ', from, ' to==> ', to)
    next()
})

router.afterEach(transition => {
    NProgress.done()
    window.scrollTo(0, 0)
})

localStorage.setItem('logOffStatus', 0)

window.axios = axios
window._ = _
window.moment = moment
window.Lockr = Lockr
window.Cookies = Cookies
window.constGlobal = constGlobal
window.http = http.methods
window.common = global

export { router }
