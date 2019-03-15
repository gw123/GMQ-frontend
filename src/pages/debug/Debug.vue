<template>
    <div class="page">
        <el-input placeholder="服务端地址" v-model="address" clearable></el-input>
        <el-button @click="doConnect"> {{isConnect ? '断开连接':'连接'}}</el-button>
    </div>
</template>
<script>
    export default {
        name: 'page',
        data() {
            return {
                address: '127.0.0.1:8080',
                isConnect: false,
                socket: null
            }
        },
        methods: {
            doConnect() {
                console.log(this.address)
                this.socket = new WebSocket(this.address)
                this.socket.onopen = () => {
                    this.isConnect = true
                }

                this.socket.onmessage = () =>{

                }
            },

        }
    }
</script>

<style scoped lang="scss">
    .page {
        h1 {
            color: #909090;
            background-color: aliceblue;
        }
    }
</style>
