<template>
    <div class="page">
        <div>
            <el-form ref="form" :model="form" label-width="180px">
                <el-form-item label="设备厂商">
                    <el-select v-model="form.factory_id" placeholder="请选择设备厂商">
                        <el-option v-for="(item , index) in  factories" :key="index" :label="item.label"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="新的版本">
                    <el-input  v-model="form.version" placeholder="新的版本"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">创建版本</el-button>
                    <router-link to="/download">
                        <el-button>返回</el-button>
                    </router-link>
                </el-form-item>
            </el-form>
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
                    version: ''
                },
            }
        },
        computed: {
            ...mapState({
                factories: state => state.common.factories,
                current_upgrade_versions: state => state.common.upgrade_versions
            })
        },
        watch: {
            'version'() {
                if (this.current_upgrade_versions) {
                    this.current_upgrade_versions.forEach(function (index, item) {
                        console.log(index, item)
                    })
                }
            },
        },
        methods: {
            onSubmit() {
                POST("/createDownload", this.form, (data) => {

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
    }
</style>
