/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-12-13 18:09:33
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-12-13 18:17:27
 */
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