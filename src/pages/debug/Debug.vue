<template>
    <div class="page">
        <el-button @click="begin">开始</el-button>
        <sort-item v-for="(item ,index ) in dataList" :val="item"></sort-item>
        <div class="messageWrap">

        </div>
    </div>
</template>
<script>
    import SortItem from '../../components/SortItem';

    export default {
        components: {
            SortItem
        },
        name: 'page',
        data() {
            return {
                dataList: [10, 3, 5, 4, 8, 12, 22, 9, 7],
                steps: [],

            }
        },
        created() {

        },
        mounted() {
            //this.ksort(this.dataList, 0, this.dataList.length - 1)
        },
        methods: {
            begin() {
                var tempArr = this.dataList.concat()
                this.ksort(tempArr, 0, this.dataList.length - 1)

                tempArr = this.dataList.concat()
                for (var i = 0; i < this.steps.length; i++) {
                    var step = this.steps[i]
                    console.log(step)
                    for (var j = 0; j < step.subSteps.length -1; j++) {
                        var subStep = step.subSteps[j]
                        console.log(subStep.to, subStep.from)

                        tempArr[subStep.to] = tempArr[subStep.from]

                        console.log(subStep.from, subStep.to, tempArr[subStep.from])
                        console.log(tempArr)
                    }
                    var subStep = step.subSteps[j]
                    tempArr[subStep.to] = step.key
                    break
                }

                this.dataList = tempArr
                console.log(this.dataList)
            },
            ksort(list, left, right) {
                if (left >= right) {
                    return
                }
                let key = list[left]
                let i = left
                let j = right
                let pos = left

                /*jilu*/
                let record = {i: i, j: j, key: key, subSteps: []}
                this.steps.push(record)
                /**/

                while (i < j) {
                    while (list[j] >= key && i < j) {
                        j--
                    }

                    if (j > pos) {
                        list[pos] = list[j]

                        //jilu
                        let subSteps = {from: j, to: pos, pos: j}
                        record.subSteps.push(subSteps)
                        //

                        pos = j
                    }

                    while (list[i] <= key && i < j) {
                        i++
                    }

                    if (i < pos) {
                        list[pos] = list[i]

                        //jilu
                        let subSteps = {from: i, to: pos, pos: i}
                        record.subSteps.push(subSteps)
                        //
                        pos = i
                    }
                }

                //jilu
                let subSteps = {from: left, to: pos, pos: pos}
                record.subSteps.push(subSteps)
                //
                list[pos] = key
                if (left < i - 1) {
                    this.ksort(list, left, i - 1)
                }
                if (i + 1 < right) {
                    this.ksort(list, i + 1, right)
                }
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
