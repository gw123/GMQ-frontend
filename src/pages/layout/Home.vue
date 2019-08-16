<template>
    <div class="rootpage">
        <div class="menu">
            <el-button size="mini">
                <router-link to="/net/ping">网络测试</router-link>
            </el-button>
            <el-button size="mini">
                <router-link to="/setting/index">设置</router-link>
            </el-button>
            <el-button size="mini">
                <router-link to="/user/index">账号</router-link>
            </el-button>
        </div>
        <div class="main">
            <router-view/>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'HelloWorld',
        components: {},
        data() {
            return {
                currentPageIndex: "0"
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
        margin: 0 auto;
        padding: 5px;
    }
</style>
