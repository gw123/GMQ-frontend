import Vue from 'vue'
import Router from 'vue-router'

import Debug from '../pages/debug/Debug'
import Index from '../pages/layout/Home'
import Setting from '../pages/setting/Setting'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
            children: [
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
        },
    ]
})
