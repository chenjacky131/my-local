const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
function Promise(executor){
  let _this = this;
  this.state = PENDING; //  状态
  this.value = undefined; //  成功结果
  this.reason = undefined;  //  失败原因
  this.onFulfilled = [];  //  成功的回调
  this.onRejected = []; //  失败的回调
  function resolve(value){
    if(_this.state === PENDING){
      _this.state = FULFILLED;
      _this.value = value
      _this.onFulfilled.forEach(fn => fn(value))
    }
  }
  function reject(reason){
    if(_this.state === PENDING){
      _this.state = REJECTED;
      _this.reason = reason;
      _this.onRejected.forEach(fn => fn(reason))
    }
  }
  try{
    executor(resolve, reject)
  }catch(e){
    reject(e)
  }
}
Promise.prototype.then = function(onFulfilled, onRejected){
  let _this = this;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason  };
  if(this.state === FULFILLED){
    typeof onFulfilled === 'function' && onFulfilled(this.value)
  }
  if(this.state === REJECTED){
    typeof onRejected === 'function' && onRejected(this.reason)
  }
  if(this.state === PENDING){
    typeof onFulfilled === 'function'&&this.onFulfilled.push(onFulfilled)
    typeof onRejected === 'function'&& this.onRejected.push(onRejected)
  }
  let promise2 = new Promise((resolve, reject) => {
    if(_this.state === FULFILLED){
      let x = onFulfilled(_this.value);
      resolvePromise(promise2, x, resolve, reject);
    }else if(_this.state === REJECTED){
      let x = onRejected(_this.reason);
      resolvePromise(promise2, x, resolve, reject);
    }else if(_this.state === PENDING){
      _this.onFulfilled.push(() => {
        let x = onFulfilled(_this.value);
        resolvePromise(promise2, x, resolve, reject)
      });
      _this.onRejected.push(() => {
        let x = onRejected(_this.reason)
        resolvePromise(promise2, x, resolve, reject)
      });
    };
  });
  return promise2;
}
module.exports = Promise;