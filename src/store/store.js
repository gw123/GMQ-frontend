import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        socketModule: {
            params: {
                address: 'ws://127.0.0.1:8080/message',
                isConnect: false,
            },
            socket: null,
            messageList: []
        },
    },
    mutations: {
        setAddress(state, address) {
            // 变更状态
            state.address = address
        },
        setIsConnect(state, isConnect) {
            state.isConnect = isConnect
        }
    },
    actions: {
        doConnect({commit, state}) {
            if (!state.socketModule.params.address.startsWith("ws://")) {
                state.socketModule.params.address = "ws://" + state.socketModule.params.address
            }
            try {
                console.log("连接地址", state.socketModule.params.address)
                state.socketModule.socket = new WebSocket(state.socketModule.params.address)

                if (!state.socketModule.socket) {
                    state.socketModule.params.isConnect = false
                    return
                }

                state.socketModule.socket.onmessage = (msg) => {
                    console.log("onmessage", msg.data)
                    state.socketModule.messageList.push(msg.data)
                }

                state.socketModule.socket.onopen = () => {
                    state.socketModule.params.isConnect = true
                }

                state.socketModule.socket.onerror = () => {
                    state.socketModule.params.isConnect = false
                }

            } catch (e) {
                console.log("连接失败")
                setTimeout(() => {
                    state.socketModule.params.isConnect = false
                }, 600)
            }

        },
        closeConnection({commit, state}) {
            if (state.socketModule.socket) {
                state.socketModule.socket.close()
            }
        }
    }
})

export default store
