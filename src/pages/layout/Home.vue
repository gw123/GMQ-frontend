<template>
    <div class="rootpage">
        <header ref="header">
            <el-menu ref="header"
                     :default-active="currentPageIndex"
                     class="el-menu-demo"
                     mode="horizontal"
                     @select="handleSelect"
                     background-color="#545c64"
                     text-color="#fff"
                     :router="true"
                     active-text-color="#ffd04b">
                <el-menu-item index="base">基础设备</el-menu-item>
                <el-menu-item index="moneyHook">获取金额配置</el-menu-item>
                <el-menu-item index="print">打印配置</el-menu-item>
            </el-menu>
        </header>
        <div class="main" ref="main">
            <router-view/>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'BaseLayout',
        data() {
            return {
                currentPageIndex: 'base'
            }
        },
        created() {
            this.resizeWindow()
        },
        methods: {
            resizeWindow() {
                console.log("this.$refs", this.$refs)
            },
            handleSelect(key, keypath) {
                console.log(key, keypath);
            },
            handleOpen() {
                console.log("handleOpen")
            },
            handleClose() {
                console.log("handleClose")
            }
        }
    }
</script>

<style scoped lang="scss">
    .rootpage {
        header {
            background-color: antiquewhite;
        }
        .main {
            float: left;
            width: 100%;
        }
    }
</style>
