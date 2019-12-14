<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-12-14 11:57:05
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-12-14 12:02:07
 -->
# 原理

```javascript
a instanceof Object
```

判断Object的prototype是否在a的原型链上。

# 实现

```javascript
function myInstance(target, origin) {
    let proto = target.__proto__
    if (proto) {
        if (proto === origin.prototype) {
            return true
        } else {
            return myInstance(proto, origin)
        }
    } else {
        return false
    }
}
```