<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-12-20 10:02:05
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-12-20 10:05:31
 -->
```javascript
function sleep(time){
  return new Promise(function(resovle){
    console.log(+new Date())
    setTimeout(resovle,time)
  })
}

sleep(1000).then(function(){
  console.log(+new Date())
})
```