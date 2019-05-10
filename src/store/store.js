import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        socketModule: {
            params: {
                host: '127.0.0.1',
                isConnect: false,
            },
            socket: null,
            messageList: [],
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
            if (!state.socketModule.params.host) {
                state.socketModule.params.host = "127.0.0.1"
            }
            try {
                var address = "ws://" + state.socketModule.params.host + "/message?moduleName=viewModule"
                console.log("连接地址", address)
                state.socketModule.socket = new WebSocket(address)

                if (!state.socketModule.socket) {
                    state.socketModule.params.isConnect = false
                    return
                }

                state.socketModule.socket.onmessage = (msg) => {
                    event = JSON.parse(msg.data)
                    console.log("onmessage", event)
                    state.socketModule.messageList.unshift(event)
                }

                state.socketModule.socket.onopen = () => {
                    state.socketModule.params.isConnect = true
                }

                state.socketModule.socket.onerror = () => {
                    state.socketModule.params.isConnect = false
                }
                state.socketModule.socket.onclose = () => {
                    console.log("websocket close")
                    state.socketModule.params.isConnect = false
                }

            } catch (e) {
                console.log("连接失败")
                setTimeout(() => {
                    state.socketModule.params.isConnect = false
                }, 600)
            }

        },
        sendMessage(msg) {
            if (state.socketModule.socket) {
                return state.socketModule.socket.send(msg)
            }
            return false
        },
        closeConnection({commit, state}) {
            if (state.socketModule.socket) {
                state.socketModule.socket.close()
            }
        }
    }
})

export default store
