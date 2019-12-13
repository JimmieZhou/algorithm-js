<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-12-13 18:09:24
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-12-13 21:49:35
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