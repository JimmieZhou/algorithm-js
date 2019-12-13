<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-12-13 18:09:24
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-12-13 21:57:31
 -->
# 模拟实现call

- 1.判断当前this是否为函数，防止 Function.prototype.myCall() 直接调用
- 2.context 为可选参数，如果不传的话默认上下文为 window
- 3.为context 创建一个 Symbol（保证不会重名）属性，将当前函数赋值给这个属性
- 4.处理参数，传入第一个参数后的其余参数
- 5.调用函数后即删除该Symbol属性

```javascript
Function.prototype.myCall = function (context = window, ...args) {
    if (this === Function.prototype) {
        return undefined
    }
    const fn = Symbol()
    context[fn] = this
    const result = context[fn](...args)
    delete context.fn
    return result
}
```

# 模拟实现apply

apply实现类似于call，参数是数组

```javascript
Function.prototype.myApply = function (context = window, args) {
    if (this === Function.prototype) {
        return undefined
    }
    const fn = Symbol()
    context[fn] = this
    let result
    if (Array.isArray(args)) {
        result = context[fn](...args)
    } else {
        result = context[fn]()
    }
    delete context[fn]
    return result
}
```

# 模拟实现bind
- 1.处理参数，返回一个闭包
- 2.判断是否为构造函数调用，如果是则使用new调用当前函数
- 3.如果不是，使用apply，将context和处理好的参数传入

```javascript
Function.prototype.myBind = function (context = window, ...args1) {
    if (this === Function.prototype) {
        throw new TypeError('error')
    }
    const _this = this
    return function F(...args2) {
        if (this instanceof F) {
            return new _this(...args1, ...args2)
        }
        return _this.apply(context, args1.concat(...args2))
    }
}
```

# 扩展

获取函数中的参数：

```javascript
// 获取argument对象 类数组对象 不能调用数组方法
    function test1() {
      console.log('获取argument对象 类数组对象 不能调用数组方法', arguments);
    }

    // 获取参数数组  可以调用数组方法
    function test2(...args) {
      console.log('获取参数数组  可以调用数组方法', args);
    }

    // 获取除第一个参数的剩余参数数组
    function test3(first, ...args) {
      console.log('获取argument对象 类数组对象 不能调用数组方法', args);
    }

    // 透传参数
    function test4(first, ...args) {
      fn(...args);
      fn(...arguments);
    }

    function fn() {
      console.log('透传', ...arguments);
    }

    test1(1, 2, 3);
    test2(1, 2, 3);
    test3(1, 2, 3);
    test4(1, 2, 3);
```