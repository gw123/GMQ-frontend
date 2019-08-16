<template>
    <div class="page">
        <div>
            <el-form ref="form" :model="form" label-width="180px">
                <el-form-item label="设备厂商">
                    <el-select v-model="form.factory_id" @change="changeFactory" placeholder="请选择设备厂商">
                        <el-option v-for="(item , index) in  factories" :key="index" :label="item.label"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="升级方式">
                    <el-select v-if="upgrade_types" v-model="form.upgrade_type" placeholder="请选择活动区域">
                        <el-option v-for="(item , index) in  upgrade_types" :key="index" :label="item.label"
                                   :value="item.id"></el-option>
                    </el-select>

                    <el-select v-else="upgrade_types" v-model="form.upgrade_type" placeholder="请选择活动区域">
                        <el-option label="单台升级" value="1"></el-option>
                        <el-option label="指定版本升级" value="2"></el-option>
                        <el-option label="全部升级" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item v-show="form.upgrade_type==1" label="待升级设备">
                    <el-autocomplete
                            class="inline-input"
                            v-model="form.device_no"
                            @select="changeDeviceNo"
                            :fetch-suggestions="querySN"
                            placeholder="请输入内容"
                    ></el-autocomplete>
                </el-form-item>

                <el-form-item v-show="form.upgrade_type==2" label="待升级的版本">
                    <el-radio-group @change="changeCurrentVersion" v-model="form.current_version"
                                    v-if="current_upgrade_versions">
                        <el-radio v-for="(item , index) in  current_upgrade_versions" :key="index"
                                  :label="item.id"> {{item.label}}
                        </el-radio>
                    </el-radio-group>
                    <el-input v-else v-model="form.current_version" placeholder="待升级的版本"></el-input>
                </el-form-item>

                <el-form-item label="升级到的版本">
                    <el-radio-group @change="changeToUpgradeVersion" v-model="form.to_upgrade_version"
                                    v-if="current_upgrade_versions">
                        <el-radio :disabled="item.label == form.current_version"
                                  v-for="(item , index) in  current_upgrade_versions" :key="index"
                                  :label="item.label"> {{item.label}}
                        </el-radio>
                    </el-radio-group>
                    <el-input v-else v-model="form.current_version" placeholder="升级到的版本"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">创建升级任务</el-button>
                    <router-link to="/download">
                        <el-button>返回</el-button>
                    </router-link>
                </el-form-item>
            </el-form>
        </div>
        <div style="margin-left: 80px">
            <table class="gridtable" v-show="deviceInfo.factory" border="1">
                <tr>
                    <td>当前版本:</td>
                    <td>{{deviceInfo.version}}</td>
                    <td>型号:</td>
                    <td>{{deviceInfo.ModelNumber}}</td>
                    <td>是否支付:</td>
                    <td>{{deviceInfo.PayStatus}}</td>
                </tr>
                <tr>
                    <td>DB:</td>
                    <td>{{deviceInfo.bid}}</td>
                    <td>门店:</td>
                    <td>{{deviceInfo.meid}}</td>
                    <td>款台:</td>
                    <td>{{deviceInfo.checkstand_id}}</td>
                </tr>
                <tr>
                    <td>创建时间:</td>
                    <td colspan="5">{{deviceInfo.CreatedAt}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'page',
        data() {
            return {
                form: {
                    factory_id: '',
                    upgrade_type: 1,
                    device_no: '',
                    current_version: '',
                    to_upgrade_version: 0
                },
                current_upgrade_versions: [],
                deviceInfo: {
                    CreatedAt: "",
                    bid: 0,
                    checkstand_id: 0,
                    factory: 0,
                    meid: 0,
                    version: "",
                    ModelNumber: "",
                    PayStatus:0
                }
            }
        },
        computed: {
            ...mapState({
                factories: state => state.common.factories,
                upgrade_types: state => state.common.upgrade_types,
                to_upgrade_versions: state => state.common.upgrade_versions,
            })
        },
        created() {
        },
        methods: {
            ...mapActions({
                getVersions: 'getVersions'
            }),
            changeCurrentVersion(newVal) {
                if (newVal == this.form.to_upgrade_version_id) {
                    this.$message({
                        type: 'error',
                        message: '待升级版本和当前版本不能相同'
                    });
                }
            },
            changeToUpgradeVersion(newVal) {
                if (newVal == this.form.current_version) {
                    this.$message({
                        type: 'error',
                        message: '待升级版本和当前版本不能相同'
                    });
                }
            },
            changeFactory(val) {
                if (val != 0 && val != "") {
                    this.getVersions(val).then((versions) => {
                        console.log("current_upgrade_versions", versions)
                        this.current_upgrade_versions = versions
                    })
                }
            },
            changeDeviceNo(val) {
                // console.log("changeDeviceNo", val)
                this.deviceInfo.CreatedAt = val.payload.CreatedAt
                this.deviceInfo.bid = val.payload.bid
                this.deviceInfo.factory = val.payload.factory
                this.deviceInfo.meid = val.payload.meid
                this.deviceInfo.version = val.payload.version
                var qeuryUrl = '/querySN?key=' + val.value
                GET(qeuryUrl, (result) => {
                    if (result && result instanceof Array) {
                        this.deviceInfo.ModelNumber = result[0].payload.ModelNumber
                        this.deviceInfo.PayStatus = result[0].payload.PayStatus
                    }
                })
            },
            querySN(queryParam, cb) {
                if (this.form.factory_id == "" || this.form.factory_id == 0) {
                    this.$message({
                        type: 'success',
                        message: '请选择厂商id'
                    });
                    this.form.device_no = ""
                    return false
                }
                if (queryParam.length <= 2) {
                    cb([])
                    return
                }
                var qeuryUrl = '/queryAccountsBySN?key=' + queryParam + "&factory_id=" + this.form.factory_id
                GET(qeuryUrl, (result) => {
                    cb(result)
                })
            },
            onSubmit() {
                if (this.form.factory_id == "" || this.form.factory_id == 0) {
                    this.$alert("请选择厂商id")
                    return
                }
                if (this.form.upgrade_type == 2) {
                    if (this.form.current_version == "") {
                        this.$alert("请选择待升级的版本")
                        return
                    }
                    if (this.form.current_version == this.form.to_upgrade_version_id) {
                        this.$alert("版本相同")
                        return
                    }
                } else if (this.form.upgrade_type == 1) {
                    if (this.form.device_no == "") {
                        this.$alert("请输入要升级的设备")
                        return
                    }
                }
                if (this.form.to_upgrade_version == "") {
                    this.$alert("请选择要升级到的版本")
                    return
                }

                POST("/createDownload", this.form, (data) => {
                    this.$message({
                        type: 'success',
                        message: '创建升级任务成功'
                    });
                })
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

        table.gridtable {
            font-family: verdana, arial, sans-serif;
            font-size: 11px;
            color: #333333;
            border-width: 1px;
            border-color: #666666;
            border-collapse: collapse;
        }
        table.gridtable th {
            border-width: 1px;
            padding: 8px;
            border-style: solid;
            border-color: #666666;
            background-color: #dedede;
        }
        table.gridtable td {
            border-width: 1px;
            padding: 8px;
            border-style: solid;
            border-color: #666666;
            background-color: #ffffff;
        }
    }
</style>
