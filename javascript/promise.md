<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-12-16 09:47:22
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-12-16 14:47:32
 -->
# 基础版本

- 设定三个状态 PENDING、FULFILLED、REJECTED ，只能由PENDING改变为FULFILLED、REJECTED，并且只能改变一次
- MyPromise接收一个函数executor，executor有两个参数resolve方法和reject方法
- resolve将PENDING改变为FULFILLED
- reject将PENDING改变为FULFILLED
- promise变为FULFILLED状态后具有一个唯一的value
- promise变为REJECTED状态后具有一个唯一的reason

```javascript
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(executor) {
  this.state = PENDING;
  this.value = null;
  this.reason = null;

  const resoved = value => {
    if (this.state === PENDING) {
      this.state = FULFILLED;
      this.value = value;
    }
  };

  const rejected = reason => {
    if (this.state === PENDING) {
      this.state = REJECTED;
      this.reason = reason;
    }
  };

  try {
    executor(resoved, rejected);
  } catch (error) {
    rejected(error);
  }
}
```

# then方法

- then方法接受两个参数onFulfilled、onRejected，它们分别在状态由PENDING改变为FULFILLED、REJECTED后调用
- 一个promise可绑定多个then方法
- then方法可以同步调用也可以异步调用
- 同步调用：状态已经改变，直接调用onFulfilled方法
- 异步调用：状态还是PENDING，将onFulfilled、onRejected分别加入两个函数数组onFulfilledCallbacks、onRejectedCallbacks，当异步调用resolve和reject时，将两个数组中绑定的事件循环执行。

```javascript
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  switch (this.state) {
    case PENDING:
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
      break;
    case FULFILLED:
      onFulfilled(this.value);
      break;
    case REJECTED:
      onRejected(this.value);
      break;
  }
};
```

# then方法异步调用

如下面的代码：输入顺序是：1、2、3

```javascript
console.log(1);

let promise = new Promise((resolve, reject) => {

  resolve(3);
});

promise.then((value) => {
  console.log(value);
});

console.log(2);
```

虽然resolve是同步执行的，我们必须保证then是异步调用的，我们用settimeout来模拟异步调用（并不能实现微任务和宏任务的执行机制，只是保证异步调用）

```javascript
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  if (typeof onFulfilled !== "function") {
    onFulfilled = function(value) {
      return value;
    };
  }
  if (typeof onRejected !== "function") {
    onRejected = function(reason) {
      return reason;
    };
  }
  switch (this.state) {
    case PENDING:
      this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          onFulfilled(this.value);
        }, 0);
      });
      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          onRejected(this.reason);
        }, 0);
      });
      break;
    case FULFILLED:
      setTimeout(() => {
        onFulfilled(this.value);
      }, 0);

      break;
    case REJECTED:
      setTimeout(() => {
        onRejected(this.reason);
      }, 0);
      break;
  }
};
```

# then方法链式调用

保证链式调用，即then方法中要返回一个新的promise，并将then方法的返回值进行resolve。

>注意：这种实现并不能保证then方法中返回一个新的promise，只能保证链式调用。

```javascript
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = function(value) {
      return value;
    };
  }
  if (typeof onRejected != "function") {
    onRejected = function(reason) {
      throw reason;
    };
  }
  const promise2 = new MyPromise((resolve, reject) => {
    switch (this.state) {
      case FULFILLED:
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolve(x);
          } catch (reason) {
            reject(reason);
          }
        }, 0);
        break;
      case REJECTED:
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x);
          } catch (reason) {
            reject(reason);
          }
        }, 0);
        break;
      case PENDING:
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolve(x);
            } catch (reason) {
              reject(reason);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolve(x);
            } catch (reason) {
              reject(reason);
            }
          }, 0);
        });
        break;
    }
  });
  return promise2;
};
```

# catch方法

若上面没有定义reject方法，所有的异常会走向catch方法：

```javascript
MyPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};
```

# finally方法

不管是resolve还是reject都会调用finally。

```javascript
MyPromise.prototype.finally = function(fn) {
    return this.then(value => {
       fn();
       return value;
    }, reason => {
        fn();
        throw reason;
    });
};
```

# Promise.resolve

Promise.resolve用来生成一个直接处于FULFILLED状态的Promise。

```javascript
MyPromise.resolve = function(value) {
  return new MyPromise((resolve, reject) => {
    resolve(value);
  });
};
```

# Promise.reject

Promise.reject用来生成一个直接处于REJECTED状态的Promise。

```javascript
MyPromise.reject = function(reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
};
```

# all方法

接受一个promise数组，当所有promise状态resolve后，执行resolve

```javascript
MyPromise.all = function (promises) {
    return new Promise((resolve, reject) => {
    if (promises.length === 0) {
        resolve([]);
    } else {
        let result = [];
        let index = 0;
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(data => {
                result[i] = data;
                if (++index === promises.length) {
                resolve(result);
                }
            }, err => {
                reject(err);
                return;
            });
        }
    }
    });
}
```

# race方法

接受一个promise数组，当有一个promise状态resolve后，执行resolve

```javascript
MyPromise.race = function (promises) {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            resolve();
        } else {
            let index = 0;
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(data => {
                    resolve(data);
                }, err => {
                    reject(err);
                    return;
                });
            }
        }
    });
}
```

