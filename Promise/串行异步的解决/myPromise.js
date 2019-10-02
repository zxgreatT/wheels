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
    const self = this
    let bridgePromise
    //防止使用不传成功或失败回调函数，所以默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : error => {throw error}
    if(this.status === PENDING) {
       return bridgePromise = new MyPromise((resolve,reject) => {
           self.onFulfilledCallbacks.push((value) => {
               try{
                   let x = onFulfilled(value)
               }catch{
                   
               }
           })
       })
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
