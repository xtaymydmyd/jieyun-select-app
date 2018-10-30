import { router } from 'assets/js/config'

import Vue from 'vue'

import filter from './filter'
import routes from './router'
import store from './store'
import App from './App.vue'

import locales from './locale'
Object.keys(locales).forEach(lang => {
    Vue.locale(lang, locales[lang])
})

router.addRoutes(routes)

window.router = router
window.store = store

const bus = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
window.bus = bus