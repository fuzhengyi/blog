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

## 重流和重绘

## 