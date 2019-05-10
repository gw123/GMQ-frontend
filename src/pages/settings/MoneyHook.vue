<template>
    <div class="page settings">
        <el-row class="row">
            <el-col :span="6" class="label">
                <div class="label"> 获取金额方式:</div>
            </el-col>
            <el-col :span="12">
                <el-select v-model="moneyHook.method" placeholder="无" size="mini">
                    <el-option
                            v-for="item in ['无','虚拟串口','物理监听','窗口获取','小票获取','直接显示']"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div v-if="moneyHook.method == '虚拟串口'">
            <el-row class="row">
                <el-col :span="6" class="label">
                    <div class="label"> 客显口:</div>
                </el-col>
                <el-col :span="12">
                    <el-select v-model="moneyHook.method" placeholder="无" size="mini">
                        <el-option
                                v-for="item in ['F1','F2','F3','F4','F5','F6','F7','F8','F9']"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row class="row">
                <el-col :span="6" class="label">
                    <div class="label"> 对接口:</div>
                </el-col>
                <el-col :span="12">
                    <el-select v-model="moneyHook.method" placeholder="无" size="mini">
                        <el-option
                                v-for="item in ['F1','F2','F3','F4','F5','F6','F7','F8','F9']"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-button> 创建对接口</el-button>
            <el-button> 检测客显口</el-button>
        </div>

        <div v-if="moneyHook.method == '物理监听'">
            <el-row class="row">
                <el-col :span="6" class="label">
                    <div class="label">输入串口:</div>
                </el-col>
                <el-col :span="12">
                    <el-select v-model="moneyHook.method" placeholder="无" size="mini">
                        <el-option
                                v-for="item in ['F1','F2','F3','F4','F5','F6','F7','F8','F9']"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>


    </div>
</template>
<script>
    export default {
        name: 'page',
        data() {
            return {
                moneyHook: {
                    method: '无',
                    autoStart: false
                }
            }
        },
        methods: {
            changeConfig() {

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
