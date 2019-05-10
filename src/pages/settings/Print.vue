<template>
    <div class="page ">
        <div class="settings">
            <h4 style="text-align: center;line-height: 30px">已经配置好的打印机</h4>
            <el-row class="row header">
                <el-col span="4" class="col">
                    打印机名称
                </el-col>
                <el-col span="4" class="col">
                    打印机类型
                </el-col>
                <el-col span="6" class="col">
                    打印机地址
                </el-col>
                <el-col span="3" class="col">
                    打印次数
                </el-col>
                <el-col span="3" class="col">
                    纸宽
                </el-col>
                <el-col span="4" class="col">
                    操作
                </el-col>
            </el-row>
            <el-row class="row" v-for="(currentPrinter,index) in printerList" :key="index">
                <div v-if="currentPrinter.isEdit">
                    <el-col :span="4" class="col">
                        <el-input v-model="currentPrinter.printerName" placeholder="打印机名称" size="mini"></el-input>
                    </el-col>
                    <el-col :span="4" class="col">
                        <el-select v-model="currentPrinter.type" placeholder="打印机类型" size="mini">
                            <el-option
                                    v-for="item in ['USB','串口','驱动','网口','并口']"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" class="col">
                        <el-input v-model="currentPrinter.addr" placeholder="打印机地址" size="mini"></el-input>
                    </el-col>
                    <el-col :span="3" class="col">
                        <el-select v-model="currentPrinter.times" placeholder="打印次数" size="mini">
                            <el-option
                                    v-for="item in ['1','2','3','4','5']"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3" class="col">
                        <el-select v-model="currentPrinter.width" placeholder="纸宽" size="mini">
                            <el-option
                                    v-for="item in ['58','80']"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4" class="col bianji">
                        <span @click="editPrinter(currentPrinter,false)">确定</span>
                        <span @click="deletePrinter(index)"> 删除</span>
                    </el-col>
                </div>
                <div v-else>
                    <el-col :span="4" class="col">
                        {{currentPrinter.printerName}}&nbsp;
                    </el-col>
                    <el-col :span="4" class="col">
                        {{currentPrinter.type}}&nbsp;
                    </el-col>
                    <el-col :span="6" class="col">
                        {{currentPrinter.addr}}&nbsp;
                    </el-col>
                    <el-col :span="3" class="col">
                        {{currentPrinter.times}}&nbsp;
                    </el-col>
                    <el-col :span="3" class="col">
                        {{currentPrinter.width}}&nbsp;
                    </el-col>
                    <el-col :span="4" class="col bianji">
                        <span @click="editPrinter(currentPrinter ,true)">编辑</span>
                        <span @click="deletePrinter(index)"> 删除</span>
                    </el-col>
                </div>
            </el-row>
        </div>
        <div style="height: 10px"></div>

        <div class="bottom">
            <el-row>
                <el-col :span="6">
                    <p>点击搜索打印机</p>
                </el-col>
                <el-col :span="18" class="search-box">
                    <el-button class="btn" type="success" size="small" @click="submit">保存应用</el-button>
                    <el-button class="btn" type="success" size="small" @click="addPrinter(false)">添加打印机</el-button>
                    <el-button class="btn" type="success" size="small" @click="searchPrinter">搜索打印机</el-button>
                </el-col>
                <div class="clearfix"></div>
            </el-row>
        </div>


        <div class="settings" v-if="isShowSearchBox">
            <h4 style="text-align: center;line-height: 30px">新的打印机</h4>
            <el-row class="row header">
                <el-col :span="6" class="col">
                    打印机类型
                </el-col>
                <el-col :span="8" class="col">
                    打印机地址
                </el-col>

                <el-col :span="6" class="col">
                    操作
                </el-col>
            </el-row>

            <el-row class="row" v-for="(currentPrinter,index) in searchPrinterList" :key="index">
                <el-col :span="6" class="col">
                    {{currentPrinter.type}}&nbsp;
                </el-col>
                <el-col :span="8" class="col">
                    {{currentPrinter.addr}}&nbsp;
                </el-col>
                <el-col :span="6" class="col bianji">
                    <span @click="addPrinter(currentPrinter)">添加</span>
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
                printerList: [],
                isShowSearchBox: false,
                searchPrinterList: [],
            }
        },
        methods: {
            changeConfig() {

            },
            searchPrinter() {
                this.isShowSearchBox = true
                this.searchPrinterList.push({
                    printerName: 'sub001',
                    type: 'USB',
                    width: 80,
                    times: 1,
                    addr: '/dev1',
                    isEdit: true
                }, {
                    printerName: 'sub002',
                    type: 'USB',
                    width: 80,
                    times: 1,
                    addr: '/dev2',
                    isEdit: true
                })
            },
            addPrinter(printer) {
                // for (var i = 0; i < this.printerList.length; i++) {
                //     if (this.printerList[i].isEdit) {
                //         this.$message('请在编辑完当前打印机后再添加')
                //         return
                //     }
                // }
                console.log(printer)
                if (printer) {
                    this.printerList.push(printer)
                } else {
                    this.printerList.push({
                        printerName: '',
                        type: 'USB',
                        width: 80,
                        times: 1,
                        addr: '',
                        isEdit: true
                    })
                }
            },
            editPrinter(printer, flag) {
                if (!flag) {
                    if (printer.printerName == "") {
                        this.$message("请输入打印机名称")
                        return
                    }
                    if (printer.addr == "") {
                        this.$message("请输入打印机地址")
                        return
                    }
                    if (printer.type == "") {
                        this.$message("请选择打印机类型")
                        l
                        return
                    }
                }
                printer.isEdit = flag
            },
            deletePrinter(index) {
                this.printerList.splice(index, 1)
            }
        }
    }
</script>

<style scoped lang="scss">
    .page {
    }

    .settings {
        height: 200px;
        border: 1px solid #8e5f28;
        padding: 5px;
        overflow-y: scroll;
        .header {
            .col {
                text-align: center;
                font-size: 14px;
                font-weight: 600;
            }
        }
        .row {
            margin-bottom: 10px;
            margin-top: 5px;
            .col {
                padding: 0 3px;
                text-align: center;
            }
            .label {
                line-height: 30px;
            }
            .bianji {
                font-size: 14px;
                line-height: 30px;
                box-sizing: border-box;
                span {
                    display: inline-block;
                    width: 46%;
                    text-align: center;
                }
            }
        }
    }

    .bottom {
        padding: 15px;
        line-height: 30px;
        .search-box {
            .btn {
                float: right;
                margin-left: 15px;
            }
        }
    }
</style>
