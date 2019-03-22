/*function add(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a + b > 1000) {
                return resolve(a + b)
            } else {
                return resolve(add(a + b, a))
            }
        }, 1000)
    })
}


add(10, 20).then((res) => {
    console.log(res)
})*/


var items = [10, 3, 5, 4, 8, 12, 22, 9, 7]
var steps = []
var times = 1

function ksort(list, left, right) {
    if (left >= right) {
        return
    }
    var key = list[left]
    var i = left
    var j = right
    var pos = left

    /*jilu*/
    let record = {i: i, j: j, key: key, times: times, subSteps: []}
    steps.push(record)
    times++
    /**/

    while (i < j) {
        while (list[j] >= key && i < j) {
            j--
        }

        if (j > pos) {
            list[pos] = list[j]

            //jilu
            let subSteps = {from: j, to: pos, pos: pos}
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
        ksort(list, left, i - 1)
    }
    if (i + 1 < right) {
        ksort(list, i + 1, right)
    }
}


ksort(items, 0, items.length - 1)

function displaySubStep(subStep) {
    console.log(subStep)
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(subStep)
        }, 1000)
    })
}

async function dispalyStep(step) {
    console.log(step.times)
    for (var i = 0; i < step.subSteps.length; i++) {
         await displaySubStep(step.subSteps[i])
    }

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve()
        }, 1000)
    })
}

async function show(steps) {
    for (var i = 0; i < steps.length; i++) {
        await dispalyStep(steps[i])
    }
}

show(steps)
