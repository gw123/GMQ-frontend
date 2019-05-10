<template>
    <div class="page">
        <div>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-input placeholder="event_name" v-model="event_name" size="small"></el-input>

                    <el-button size="small" type="primary" style="width: 100%;margin-top: 10px" @click="sendMessage">
                        send
                    </el-button>
                </el-col>

                <el-col :span="20">
                    <el-input type="textarea"
                              :autosize="{ minRows: 4, maxRows: 6}"
                              placeholder="payload" size="small"
                              v-model="payload">
                    </el-input>
                </el-col>
            </el-row>

            <hr style="margin-top: 15px;margin-bottom: 15px">
        </div>
        <el-table
                :data="messageList"
                style="width: 100%"
                size="mini"
        >
            <el-table-column
                    prop="msg_id"
                    label="Message type"
                    width="120">
                <template slot-scope="scope">
                    {{ scope.row.msg_id }}<br>
                    {{ scope.row.event_name }} <br>
                    {{ scope.row.module_name }}
                </template>
            </el-table-column>

            <el-table-column
                    prop="payload"
                    label="payload"
                    :formatter="parsePayload"
            >
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex'
    import {Base64} from 'js-base64';

    export default {
        name: 'page',
        data() {
            return {
                event_name: "",
                payload: ""
            }
        },
        computed: {
            ...mapState({
                messageList: state => state.socketModule.messageList,
                host: state => state.socketModule.params.host
            })
        },
        watch: {
            'messageList': (newVal, oldVal) => {
                //console.log(newVal)
            }
        },
        methods: {
            sendMessage() {
                var url = "http://" + this.host + "/sendMessage"
                var event = {
                    msg_id: "0",
                    event_name: this.event_name,
                    module_name: 'WebModule',
                    payload: this.payload
                }
                axios.post(url, event).then((response) => {
                    var msg = response.data
                    if (msg.code == 0) {

                    } else {
                        alert(msg.msg)
                    }
                })
            },
            parsePayload(row, col) {
                if (row.event_name == "mns") {
                    var data;
                    try {
                        data = JSON.parse(row.payload)
                    } catch (e) {
                        return
                    }
                    //console.log("parsePayload",data)
                    var payload = Base64.decode(data.payload)
                    var tpl = "messagetype:" + data.messagetype + " ### "
                    tpl += "topic:" + data.topic + " ### "
                    tpl += "payload:" + payload
                    return tpl
                }

                return row.payload
            }
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
