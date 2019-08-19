<template>
    <div class="page">
        <p> 绑定设备</p>
        <div>
            <el-form ref="form" :model="form" label-width="180px">
                <el-form-item label="设备编号">
                    <el-autocomplete
                            class="inline-input"
                            v-model="form.device_no"
                            :fetch-suggestions="querySN"
                            placeholder="请输入内容"
                            style="width: 240px"
                    ></el-autocomplete>
                </el-form-item>

                <el-form-item label="门店ID">
                    <el-input v-model="form.merchant_id"
                              style="width: 230px"
                              placeholder="请输入门店ID">

                    </el-input>
                </el-form-item>

                <el-form-item label="门店名称">
                    <el-autocomplete
                            class="inline-input"
                            v-model="form.merchant_name"
                            :fetch-suggestions="queryMerchantsByName"
                            placeholder="请输入门店名称"
                            style="width: 360px"
                            @select="selectMerchantName"
                    ></el-autocomplete>
                </el-form-item>

                <!--<el-form-item label="款台信息">-->
                <!--<el-select v-model="form.checkstand_id">-->
                <!--<el-option v-for="(checkstand ,index) in checkstands" :key="index" :value="checkstand.Id">-->
                <!--{{checkstand.Name}}-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">绑定设备</el-button>
                    <router-link to="/download">
                        <el-button>返回</el-button>
                    </router-link>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'page',
        data() {
            return {
                form: {
                    device_no: '',
                    merchant_id: '',
                    merchant_name: '',
                    checkstand_id: ''
                },
                checkstands: []
            }
        },
        watch: {
            'form.merchant_id'(oldval, newval) {
                console.log(oldval, newval)
                this.queryMechantByID(oldval)


            }
        },
        methods: {
            querySN(queryParam, cb) {
                if (queryParam.length <= 2) {
                    cb([])
                    return
                }
                var qeuryUrl = '/querySN?key=' + queryParam
                GET(qeuryUrl, (result) => {
                    cb(result)
                }, () => {
                    cb([])
                })
            },
            queryMerchantsByName(queryParam, cb) {
                var qeuryUrl = '/queryMerchantsByName?key=' + queryParam
                GET(qeuryUrl, (result) => {
                    cb(result)
                }, () => {
                    cb([])
                })
            },
            queryMechantByID(id) {
                if (id == 0 || id == "") {
                    return
                }
                var qeuryUrl = '/queryMechantByID?key=' + id
                GET(qeuryUrl, (result) => {
                    this.form.merchant_id = result.id
                    this.form.merchant_name = result.name
                })
            },
            onSubmit() {
                if (this.form.merchant_id == "" || this.form.merchant_name == "") {
                    this.$alert("请填入参数")
                    return
                }

                this.$confirm('确定绑定该设备, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    POST("/bindDevice", this.form, (data) => {
                        this.$message({
                            type: 'info',
                            message: '绑定成功'
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消绑定'
                    });
                });

            },
            selectMerchantName(item) {
                if (item.id) {
                    this.form.merchant_id = item.id
                } else {
                    this.form.merchant_id = 0
                    this.$alert("数据不完整")
                }
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
