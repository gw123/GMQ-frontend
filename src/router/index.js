import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/layout/Home'
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
