import Vue from 'vue'
import Router from 'vue-router'
import Debug from '../pages/Debug'
import Setting from '../pages/Setting'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/debug',
            name: 'debug',
            component: Debug
        },
        {
            path: '/setting',
            name: 'setting',
            component: Setting
        }
    ]
})
