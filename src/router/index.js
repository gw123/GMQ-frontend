import Vue from 'vue'
import Router from 'vue-router'

import Debug from '../pages/debug/Debug'
import Index from '../pages/layout/Home'
import Setting from '../pages/setting/Setting'
import Message from '../pages/message/Message'
import Devices from '../pages/devices/Devices'

import Download from '../pages/download/Download'
import AddDownloadJob from '../pages/download/AddDownloadJob'
import AddVersion from '../pages/download/AddVersion'

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
                },
                {
                    path: '/message',
                    name: 'message',
                    component: Message
                },
                {
                    path: '/download',
                    name: 'download',
                    component: Download
                },
                {
                    path: '/devices',
                    name: 'devices',
                    component: Devices
                },
                {
                    path: '/addDownloadJob',
                    name: 'addDownloadJob',
                    component: AddDownloadJob
                },
                {
                    path: '/addVersion',
                    name: 'addVersion',
                    component: AddVersion
                }
            ]
        },
    ]
})
