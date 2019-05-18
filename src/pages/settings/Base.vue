<template>
    <div class="page settings">
        <el-row class="row">
            <el-col :span="2" :xs="12">
                <el-switch v-model="scannerSettings.hook_zhifubao" active-color="#13ce66"></el-switch>
            </el-col>
            <el-col :span="12" :xs="12">是否支持支付宝付款</el-col>
        </el-row>

        <el-row class="row">
            <el-col :span="2" :xs="12">
                <el-switch v-model="scannerSettings.hook_weixin" active-color="#13ce66"></el-switch>
            </el-col>
            <el-col :span="12" :xs="12">是否支持微信付款</el-col>
        </el-row>

        <el-row class="row">
            <el-col :span="2" :xs="12">
                <el-switch v-model="scannerSettings.hook_chuzhi" active-color="#13ce66"></el-switch>
            </el-col>
            <el-col :span="12" :xs="12">是否支持储值卡</el-col>
        </el-row>

        <el-row class="row">
            <el-col :span="2" :xs="12">
                <el-switch v-model="scannerSettings.hook_chuzhi" active-color="#13ce66"></el-switch>
            </el-col>
            <el-col :span="12" :xs="12">是否支持扫码设备</el-col>
        </el-row>

        <div style="height: 20px"></div>
        <el-row class="row">
            <el-col :span="2" :xs="12">
                <el-switch v-model="voiceSettings.enableVioce" active-color="#13ce66"></el-switch>
            </el-col>
            <el-col :span="12" :xs="12">是否支持语音播报</el-col>
        </el-row>

        <el-row class="row">
            <el-col :span="2" :xs="12">
                <el-switch v-model="scannerSettings.autoStart" active-color="#13ce66"></el-switch>
            </el-col>
            <el-col :span="12" :xs="12">是否支持开机自启动</el-col>
        </el-row>

        <el-row class="row">
            <el-col :span="4" :xs="12" class="label">
                <div class="label">键盘延迟 :</div>
            </el-col>
            <el-col :span="12" :xs="12">
                <el-input v-model="scannerSettings.interval" type="number" size="mini"></el-input>
            </el-col>
        </el-row>

        <el-row class="row">
            <el-col :span="4" :xs="12" class="label">
                <div class="label">唤起热键 :</div>
            </el-col>
            <el-col :span="12" :xs="12">
                <el-select v-model="base.wakeUpKey" placeholder="请选择热键" size="mini">
                    <el-option
                            v-for="item in ['F1','F2','F3','F4','F5','F6','F7','F8','F9']"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>

        <div class="footer">
            <el-button type="primary" size="mini" @click="saveConfig">保存</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'page',
        data() {
            return {
                scannerSettings: {
                    hook_weixin: true,
                    hook_zhifubao: true,
                    hook_chuzhi: true,
                    interval: 80
                },
                voiceSettings: {
                    enableVioce: true
                },
                base: {
                    wakeUpKey: 'F7',
                    autoStart: false
                }
            }
        },
        methods: {
            saveConfig() {
                var configs = [
                    {
                        moduleName: 'ScannerModule',
                        configs: this.scannerSettings
                    },
                    {
                        moduleName: 'VoiceModule',
                        configs: this.voiceSettings
                    },
                    {
                        moduleName: 'CSharpModule',
                        configs: this.base
                    },
                ]

                var url = 'http://127.0.0.1:8082/changeConfig'

                axios.post(url, configs).then((response) => {
                    console.log(response)
                }).catch(() => {
                    this.$message('连接失败')
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .page {
    }

    .settings {
        padding: 25px;
        .row {
            margin-bottom: 15px;
            .label {
                line-height: 30px;
            }
        }
    }
</style>
