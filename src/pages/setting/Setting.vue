<template>
    <div class="page">
        <el-form ref="form" :model="params" label-width="120px" size="small">
            <el-form-item label="server addr">
                <el-input placeholder="服务端地址" v-model="params.server_addr" clearable></el-input>
            </el-form-item>

            <el-form-item label="服务端地址">
                <el-input placeholder="服务端地址" v-model="params.address" clearable></el-input>
            </el-form-item>

            <el-form-item label="连接服务器">
                <!--<el-button @click="doConnect"> {{isConnect ? '断开连接':'连接'}}</el-button>-->
                <el-switch
                        v-model="params.isConnect"
                        active-color="#13ce66"
                        inactive-color="#314949">
                </el-switch>
            </el-form-item>

        </el-form>
    </div>
</template>
<script>
    import {mapState,mapActions} from 'vuex'

    export default {
        name: 'page',
        data() {
            return {}
        },
        computed: {
            ...mapState({
                params: state => state.socketModule.params,
                socket: state => state.socketModule.socket,
                messageList: state => state.socketModule.messageList
            })
        },
        watch: {
            'params.address'() {
                if (this.params.isConnect) {
                    this.doConnect()
                }
            },
            'params.isConnect'() {
                if (this.params.isConnect && this.params.address) {
                    this.doConnect()
                }
                if (!this.params.isConnect){
                    this.closeConnection()
                }

            }
        },
        methods: {
            ...mapActions({
                doConnect: 'doConnect',
                closeConnection: 'closeConnection'
            })
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
