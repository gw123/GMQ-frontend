import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/layout/Home'
import Base from '../pages/settings/Base'
import MoneyHook from '../pages/settings/MoneyHook'
import Print from '../pages/settings/Print'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
            children: [
                {
                    path: '/base',
                    name: 'base',
                    component: Base
                },
                {
                    path: '/moneyHook',
                    name: 'moneyHook',
                    component: MoneyHook
                },
                {
                    path: '/print',
                    name: 'print',
                    component: Print
                },

            ]
        },
    ]
})
