/**
 * 实现链式调用
 */

//定义三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'


function MyPromise (fn) {
    let self = this
    self.value = null
    self.error = null
    self.status = PENDING
    //储存回调
    self.onFulfilledCallbacks = []
    self.onRejectedCallbacks = []

    function resolve(value) {
        if (self.status === PENDING) {
            setTimeout(() => {
                self.status = FULFILLED;
                self.value = value;
                self.onFulfilledCallbacks.forEach(callback => {
                    callback(self.value)
                });
            })
        }
    }

    function reject(error) {
        if(self.status === PENDING) {
            setTimeout(() => {
                self.status = REJECTED
                self.error = error
                self.onRejectedCallbacks.forEach(callback => {
                    callback(self.error)
                })
            });
        }
    }
    fn(resolve,reject)
}
//实现then
MyPromise.prototype.then = function(onFulfilled,onRejected) {
    if(this.status === PENDING) {
       this.onFulfilledCallbacks = [...this.onFulfilledCallbacks,onFulfilled]
       this.onRejectedCallbacks = [...this.onRejectedCallbacks,onRejected]
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
