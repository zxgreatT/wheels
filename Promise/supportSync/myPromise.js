/**
 * 因为resolve实现的是同步实现，所以在执行同步任务的时候，then回调函数没有注册到
 * 所以要异步实现reslove和reject
 */
function MyPromise (fn) {
    let self = this
    self.value = null
    self.error = null
    self.onFulfilled = null //成功的回调
    self.onRejected = null //失败的回调

    function resolve(value) {
        //异步
        setTimeout(() => {
            self.value = value
            self.onFulfilled(self.value)
        });
    }

    function reject(error) {
        setTimeout(() => {
            self.error = error
            self.onRejected = self.error
        });
    }
    fn(resolve,reject)
}
//实现then
MyPromise.prototype.then = function(onFulfilled,onRejected) {
    //在这里给promise实现成功和失败的回调
    this.onFulfilled = onFulfilled
    this.onRejected = onRejected
}
module.exports = MyPromise
