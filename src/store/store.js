import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        common: {
            factories: [
                {id: 3, label: '联迪'},
                {id: 4, label: '斯普瑞'}
            ],
            upgrade_types: [
                {id: 1, label: '单台升级'},
                {id: 2, label: '指定版本号升级'},
            ],
            upgrade_versions: {},
        },
    },
    mutations: {
        setVersions(state, data) {
            if (data.factory_id) {
                console.log("setVersion", "state.upgrade_versions", data)
                state.common.upgrade_versions[data.factory_id] = data.versions
            }
        },
        setUpgreadeType(state, upgradeTypes) {
            state.upgrade_types = upgradeTypes
        }
    },
    actions: {
        getVersions({commit, state}, factory_id) {
            return GET("/getFactoryVersions?factory_id=" + factory_id, (rows) => {
                var versions = []
                for (var i = 0; i < rows.length; i++) {
                    versions.push({id: rows[i].VersionId, label: rows[i].VersionId})
                }
                commit('setVersions', {factory_id, versions})
                return versions
            })
        },
    }
})

export default store
