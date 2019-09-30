/**
 * 可以创建promise对象实例。promise实例传入的异步方法执行成功就执行注册的成功回调函数，失败就执行注册的失败回调函数。
 * @param {*} fn 
 */
function MyPromise (fn) {
    let self = this
    self.value = null
    self.error = null
    self.onFulfilled = null //成功的回调
    self.onRejected = null //失败的回调

    function resolve(value) {
        self.value = value
        self.onFulfilled(self.value) //resolve时执行成功回调
    }

    function reject(error) {
        self.error = error
        self.onRejected(self.error) //reject时执行失败的回调
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
