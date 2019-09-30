/**
 * 因为resolve实现的是同步实现，所以在执行同步任务的时候，then回调函数没有注册到
 * 所以要异步实现reslove和reject
 */

//定义三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise (fn) {
    let self = this
    self.value = null
    self.error = null
    self.onFulfilled = null //成功的回调
    self.onRejected = null //失败的回调
    self.status = PENDING

    function resolve(value) {
        if (self.status === PENDING) {
            setTimeout(() => {
                self.status = FULFILLED;
                self.value = value;
                self.onFulfilled(self.value);
            })
        }
    }

    function reject(error) {
        if(self.status === PENDING) {
            setTimeout(() => {
                self.status = REJECTED
                self.error = error
                self.onRejected = self.error
            });
        }
    }
    fn(resolve,reject)
}
//实现then
MyPromise.prototype.then = function(onFulfilled,onRejected) {
    if(this.status === PENDING) {
        this.onFulfilled = onFulfilled
        this.onRejected = onRejected
    } else if(this.status === FULFILLED) {
        //如果状态是fulfilled,直接执行成功回调,并将成功值传入
        onFulfilled(this.value)
    } else {
        //如果状态是rejected,直接执行失败回调，并将失败原因传入
        onRejected(this.error)
    }
    return this
}
module.exports = MyPromise
