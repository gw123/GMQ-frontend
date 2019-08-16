<template>
    <div class="page">
        <el-tag type="warning" size="mini">网络稳定性测试</el-tag>
        <el-steps style="width: 200px" :active="active" finish-status="success"  size="mini">
            <el-step title="步骤 1" style="font-size: 12px">
            </el-step>
            <template slot="step">
                <span> s1 </span>
            </template>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
        </el-steps>
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
       el-step{
           font-size: 12px;
       }
    }
</style>
