# 能用const就不要用let
```javascript
//只要是没有重新赋值的变量都可以用const声明
//bad
const userInfo = {
  age: 40
}

let result = false
if (userInfo.age > 30) {
  result = true
}

//good
const result = userInfo.age > 30
```

洋葱模型

```javascriptre
let middleware = []
middleware.push((next) => {
  console.log(1)
  next()
  console.log(1.1)
})
middleware.push((next) => {
  console.log(2)
  next()
  console.log(2.2)
})
middleware.push((next) => {
  console.log(3)
  next()
  console.log(3.3)
})

// let next = () => {}

function compose(middleware) {
  return function () {
    let args = arguments
    dispatch(0)
    function dispatch(i) {
      const fn = middleware[i]
      if (!fn) return null
      fn(function next() {
        dispatch(i + 1)
      }, ...args)
    }
  }
}

let fn = compose(middleware)
fn()
```
