function say(age) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(`hello, joel。今年我 ${age} 岁`);
        }, 1000);
    });
}

async function demo() {
    for (var i = 0; i < 10; i++) {
        const v = await say(i); // 输出：hello, joel。今年我 26 岁  等待这个say 的异步，如果成功把回调 resole 函数的参数作为结果
        console.log(i)
    }
}

demo();
