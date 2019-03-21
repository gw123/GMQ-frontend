<template>

    <div class="sortItem">
        <div class="topItem" ref="topItem" :style="topItemStyle"></div>
        <div class="bottomItem" ref="bottomItem" :style="bottomItemStyle"></div>
        <div class="tip">{{val}}</div>
    </div>

</template>

<script>
    export default {
        props: {
            val: 0,
            step: 5
        },
        name: 'sortItem',
        data() {
            return {
                topItemStyle: {
                    height: "200px"
                },
                bottomItemStyle: {
                    height: "0px"
                },
            }
        },
        created() {
            //this.$refs.bottomItem is undefine
        },
        watch: {
            'val': function () {
                this.change2()
            }
        },
        mounted() {
            ////this.$refs.bottomItem can use on mounted
            this.change2()
        },
        methods: {
            change2() {
                var step = this.step
                if (!step) {
                    step = 5
                }
                var boxHeight = 200
                var bottomHeight = this.val * step
                this.bottomItemStyle.height = bottomHeight + "px"
                this.topItemStyle.height = (boxHeight - bottomHeight) + 'px'
            }
        }
    }
</script>

<style scoped lang="scss">
    .sortItem {
        width: 20px;
        height: 200px;
        float: left;
        .topItem {
            width: 100%;
        }
        .bottomItem {
            width: 18px;
            background-color: aqua;
            border: solid 1px #00abab29;
        }
        .tip {
            text-align: center;
        }
    }
</style>
