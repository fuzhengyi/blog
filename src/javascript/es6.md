# 设计模式
1. 装饰器Decorator的实现原理  
  **什么是装饰者模式**  
  装饰器是类的的一种附加功能，支持注释、修改，添加功能代码。装饰器比继承等方式灵活，而且不污染原来的代码，代码逻辑松耦合，目前处于ES6提案的第二阶段（stage2），可以借助babel等工具使用该实验性的特性。  
  **应用场景**
  装饰者模式由于松耦合，多用于一开始不确定对象的功能，或者对象经常变动的时候。尤其是在参数检查、参数拦截等场景。
  **代码实现**  
  es6实现  

Decorator  
使用@操作符将装饰器添加到类或者类的方法作为修饰。
```javascript
//1.修饰类
function runBoolFun(target){
  target.runBool = true;
  return target;
}

@runBoolFun
class Person{}
console.log(Person.runBool)
```
