# 项目中常用工具函数
```javascript
/*
 * 是否在微信里打开
 * */
let is_weixin = () => {
  let ua = navigator.userAgent.toLowerCase();
  // ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1 wechatdevtools/1.02.1912261 MicroMessenger/7.0.4 Language/zh_CN webview/16004332824475894 webdebugger port/15100".toLocaleLowerCase();
  if(ua.match(/MicroMessenger/i) == "micromessenger"){
    return true;
  } else {
    return false;
  }
};
// 判断手机系统类型
let systemType =() => {
  let u = window.navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if(isAndroid) {
    return "Android";
  }
  if(isIOS) {
    return "ios";
  }
  return "未知"
}

/*
 * 判断类型
 * */
const toString = Object.prototype.toString;
let isString = obj => {
  return toString.call(obj) === '[object String]';
};
let isObject = obj => {
  return toString.call(obj) === '[object Object]';
};
let isBoolean = obj => {
  return toString.call(obj) === '[object Boolean]';
};
let isNumber = obj => {
  return toString.call(obj) === '[object Number]';
};
let isFunction = obj => {
  return toString.call(obj) === '[object Function]';
};
let isArray = obj => {
  return toString.call(obj) === '[object Array]';
};
/*
 * @arr 数据源
 * @target 目标对象
 * @key 匹配的对象属性
 * */
let getArrayObjIndex = (arr, target, key) => {
  for(let i = 0, len = arr.length; i < len; i++) {
    if(arr[i][key] === target[key]) {
      return i;
    }
  }
};

let isUndefOrEmpty = (val) => {
  return val === '' || val === undefined || val === null
};

let getMaxOrMin = (arr, MaxMin) => {
  if(MaxMin == "max"){
    return Math.max.apply(Math,arr);
  }else if(MaxMin == "min"){
    return Math.min.apply(Math,arr);
  }else{
    return Math.min.apply(Math,arr);
  }
};

let goUrl = (url) =>{
  if(!url){
    console.warn("缺少url参数");
    return ;
  }
  var oA = document.createElement("a");
  oA.href = url;
  oA.style.display = "none";
  document.body.append(oA);
  oA.click();
}

//保留两位小数的方法 四舍五入法
let keepTwodecimalFull = (num) =>{
  var result = parseFloat(num);
  if(isNaN(result)){
    return "";
  }
  result = Math.round(num * 100) / 100;
  var s_x = result.toString();
  var pos_decimal = s_x.indexOf('.');//小数点的所索引值

  //当整数时，pos_decimal = -1 自动补0
  if(pos_decimal < 0){
    pos_decimal = s_x.length;
    s_x += '.';
  }
  while (s_x.length <= pos_decimal + 2){
    s_x += '0';
  }
  return s_x;
}

let getUrlParam = (url) => {
  let name, value, str;
  if(url){
    str = url;
  }else{
    str = location.href;
  }
  let num = str.indexOf("?");
  str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
  let arr = str.split("&"); //各个参数放到数组里
  let param = {};
  for (let i = 0; i < arr.length; i++) {
    num = arr[i].indexOf("=");
    if (num > 0) {
      name = arr[i].substring(0, num);
      value = arr[i].substr(num + 1);
      param[name] = value;
    }
  }
  return param
}

//去掉空格
let trim = function (str) {
  console.log(str);
  return str.replace(/\s/g,"")
}

//手机号验证
let iSphone = function () {
  return /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
}
//手机号验证
let regPhone = function () {
  return /^1[0-9]{10}$/
}

//防抖
let Debounce = (fn, t) => {
  let delay = t || 500;
  let timer;
  return function () {
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  };
};

//节流
let Throttle = (fn, t) => {
  let last;
  let timer;
  let interval = t || 500;
  return function () {
    let args = arguments;
    let now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, interval);
    } else {
      last = now;
      fn.apply(this, args);
    }
  }
}
// 获取当前时间转换格式到yyyyMMddhhmmssSSS
let getMillisecondsFormat = ()=> {
  let date = new Date();
  let y = date.getFullYear();
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  let S = date.getMilliseconds();
  if (S < 10) {
      S = "00" + S;
  } else if (S < 100) {
      S = "0" + S;
  }
  return '' + y + M + d + h + m + s + S;
}

/**
* @param strBirthday：指的是出生日期，格式为"1990-01-01"
*/
let GetAge = (strBirthday)=>{
  var returnAge,
     strBirthdayArr=strBirthday.split("-"),
    birthYear = strBirthdayArr[0],
    birthMonth = strBirthdayArr[1],
    birthDay = strBirthdayArr[2],
      d = new Date(),
    nowYear = d.getFullYear(),
    nowMonth = d.getMonth() + 1,
    nowDay = d.getDate();
  if(nowYear == birthYear){
      returnAge = 0;//同年 则为0周岁
  }
  else{
      var ageDiff = nowYear - birthYear ; //年之差
      if(ageDiff > 0){
          if(nowMonth == birthMonth) {
              var dayDiff = nowDay - birthDay;//日之差
              if(dayDiff < 0) {
                  returnAge = ageDiff - 1;
              }else {
                  returnAge = ageDiff;
              }
          }else {
              var monthDiff = nowMonth - birthMonth;//月之差
              if(monthDiff < 0) {
                  returnAge = ageDiff - 1;
              }
              else {
                  returnAge = ageDiff ;
              }
          }
      }else {
          returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
      }
  }
  return returnAge;//返回周岁年龄
}
/**
 *校驗日期 YYYY-MM-DD
 * @param {*} RQ
 * @returns true || false
 */
let RQcheck = (RQ) =>{
  var date = RQ;
  var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);

  if (result == null)
      return false;
  var d = new Date(result[1], result[3] - 1, result[4]);
  return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4]);
}

export {
  is_weixin,
  systemType,
  isString,
  isObject,
  isBoolean,
  isNumber,
  isFunction,
  isArray,
  getArrayObjIndex,
  isUndefOrEmpty,
  getMaxOrMin,
  goUrl,
  keepTwodecimalFull,
  getUrlParam,
  trim,
  iSphone,
  regPhone,
  Debounce,
  Throttle,
  getMillisecondsFormat,
  GetAge,
  RQcheck
}
```
