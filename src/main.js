// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store/store'

import css from "./css/app.scss"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

window.axios = require('axios')

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.headers.common['Content-Type'] = 'application/json'
window.axios.defaults.timeout = 1000000

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]')

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.getAttribute('content')
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')
}

let userToken = document.head.querySelector('meta[name="x-user-token"]')
if (userToken) {
    window.axios.defaults.headers.common['X-USER-TOKEN'] = userToken.getAttribute('content')
}












/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router
})

