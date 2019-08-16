import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/layout/Home'

import Ping from '../pages/net/ping'
import Setting_index from '../pages/mobile/AddDownloadJob'
import User_index from '../pages/mobile/AddVersion'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
            children: [
                {
                    path: '/net/ping',
                    name: 'Ping',
                    component: Ping
                },
                {
                    path: '/setting/index',
                    name: 'SettingIndex',
                    component: Setting_index
                },
                {
                    path: '/user/index',
                    name: 'UserIndex',
                    component: User_index
                }
            ]
        },
    ]
})
