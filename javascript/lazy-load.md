<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-12-14 12:27:06
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-12-14 12:29:51
 -->
# 原理

当图片在可视区域的时候，将图片的src设置为图片的路径，一般图片上会有一个data-src属性，也就是图片的真实路径。

```javascript
function debunce_finishi(fn, delay) {
    var timmer = null
    var last = 0
    return function () {
        var ctx = this
        var args = arguments
        var now = +(new Date())
        if (now - last >= delay) {
            last = now
            fn.apply(ctx, args)
        } else {
            clearTimeout(timmer)
            timmer = setTimeout(function () {
                last = now
                fn.apply(ctx, args)
            }, delay);
        }
    }
}
```

```javascript
function lazy_load() {
    var viewHight = window.innerHeight || document.documentElement.clientHeight
    var imgs = document.getElementsByTagName('img')
    var count = 0
    for (var i = count; i < imgs.length; i++) {
        var distance = viewHight - imgs[i].getBoundingClientRect().top
        if (distance > 0 && !imgs[i].src) {
            imgs[i].src = imgs[i].getAttribute('data-src')
            count = i + 1
        }
    }
}
```

```javascript
window.addEventListener("scroll", debunce_finishi(lazy_load, 1000), false)
```