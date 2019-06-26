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

var serverHost = window.serverHost ? window.serverHost : "http://127.0.0.1:10086"

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
import {MessageBox} from 'element-ui';


window.POST = function (url, data, successCall, faildCall) {
    if (url.indexOf('/') == 0) {
        url = serverHost + url
    }

    return axios.post(url, data).then(function (response) {
        if (response.data.code == 0) {
            if (successCall == undefined) {
                MessageBox.alert("请求成功")
            } else {
                return successCall(response.data.data)
            }
        } else {
            if (faildCall == undefined) {
                MessageBox.alert(response.data.msg)
            } else {
                return faildCall(response.data)
            }
        }
    }).catch(function (ret) {
        //console.log("e", ret)
        //Sentry.captureException(ret);
        if (ret && ret.response && ret.response.status == 401) {
            MessageBox.alert("认证过期 ,请重新登录")
            setTimeout(function () {
                window.location.reload()
            }, 1000)
            return
        }
        if (faildCall == undefined) {
            MessageBox.alert("网络错误")
        } else {
            faildCall("网络错误")
        }
    })
}

window.GET = function (url, successCall, faildCall) {
    if (url.indexOf('/') == 0) {
        url = serverHost + url
    }
    console.log(url)
    return axios.get(url).then(function (response) {
        if (response.data.code == 0) {
            if (successCall == undefined) {
                MessageBox.alert("请求成功")
            } else {
                return successCall(response.data.data)
            }
        } else {
            if (faildCall == undefined) {
                MessageBox.alert(response.data.msg)
            } else {
                return faildCall(response.data)
            }
        }
    }).catch(function (ret) {
        console.log("get request ", ret)
        if (ret && ret.response && ret.response.status == 401) {
            MessageBox.alert("认证过期 ,请重新登录")
            setTimeout(function () {
                window.location.reload()
            }, 1000)
            return
        }

        if (faildCall == undefined) {
            MessageBox.alert("网络错误")
        } else {
            faildCall("网络错误")
        }
    })
}


/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router
})

