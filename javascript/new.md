<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-12-14 11:48:36
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-12-14 11:51:47
 -->
# 原理

- 1.创建一个对象
- 2.链接到原型
- 3.改变this的指向
- 4.返回这个对象

```javascript
function create() {
    let obj = {}
    let con = [].shift.call(arguments)
    obj.__proto__ = con.prototype
    let result = con.apply(obj, arguments)
    return typeof result === 'object' ? result : obj
}
```