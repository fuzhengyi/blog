# javascript
## 异步递归写法
```javascript
const foo = (n) => {
  return new Promise((resolve) =>{
    if(n<8){
      setTimeout(()=>{
        ++n;
        resolve(foo(n))
      },1000)
    }else{
      resolve(n)
    }
  })
}

(async () => console.log(await foo(0)))(); // 8秒后打印8
```

## 图片压缩
```javascript
let asyncCompression = (file) =>{
  let num = 1
  return new Promise((resolve,reject)=>{
    let fReader = new FileReader();
    fReader.readAsDataURL(file);
    fReader.onload = function (){
      (async (base64)=>{
        let res = await compressFn(base64,num)
        resolve(res)
      })(this.result)
    }
  })
}

let compressFn = (base64,num)=>{
  return new Promise((resolve,reject) =>{
    //最多压三次
    if(num <= 3){
      let img = new Image();
      img.src = base64;
      // console.log(base64,'tupian',num)
      let compressionRatio = getCompressionRatio(base64);
      if(base64.length/1024 < 1024){
        return resolve(base64)
      }
      //异步
      img.onload = function(){
        let width = img.width, height = img.height;
        console.log('图片的原始宽高',width,height);
        //生成canvas
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        //压缩
        let base64 = canvas.toDataURL('image/jpeg', compressionRatio);
        // console.log(base64,'xx',num)
        console.log('第'+num+'次压缩', base64.length/1024,'kb,压缩率',compressionRatio);
        if(base64.length/1024 > 1024){
          num++;
          resolve(compressFn(base64,num))
        }else{
          resolve(base64)
        }
      }
    }else{
      resolve(base64)
    }
  })
}

let getCompressionRatio =(file) =>{
  let compressionRatios = 0.1;
  let fileM = file.length / 1024 / 1024;
  switch(true){
    case fileM > 10: compressionRatios = ((fileM - 10)/fileM); break;
    case fileM <= 10 && fileM >8: compressionRatios = 0.1; break;
    case fileM <= 8 && fileM >6: compressionRatios = 0.2; break;
    case fileM <= 6 && fileM >4: compressionRatios = 0.3; break;
    case fileM <= 4 && fileM >2: compressionRatios = 0.4; break;
    case fileM <= 2 && fileM >1: compressionRatios = 0.5; break;
    case fileM <= 1 && fileM >0.5: compressionRatios = 0.6; break;
    default: compressionRatios = 0.5;
  }
  return compressionRatios
}

let dataURItoBlob = (dataurl, filename) =>{
  //将base64转换为文件
  var arr = dataurl.split(","),
  mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]),
  n = bstr.length,
  u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime
  });
}

export{
  asyncCompression,
  dataURItoBlob
}
```

## axios封装
```javascript
import axios from 'axios';
import conf from '../config/config';
import cookie from '../utils/cookie';
import {goUrl,isUndefOrEmpty,getUrlParam,getMillisecondsFormat } from '../utils/util';
window.axiosCancelArr = [];

const service = axios.create({
  timeout: 600000,
  auth: true,
  method: 'post'
});

const METHOD_MAP = {
  'get': 'params',
  'post': 'data'
};

service.interceptors.request.use(config => {
  let commonParams = {
    streamNo: conf.request.streamNoHead + getMillisecondsFormat() + Math.floor(Math.random() * 999999),
  };
  /*
   * 添加通用参数
   * */
  config.headers["Accept-Language"] = cookie.get("language") || "zh-CN";
  if (!config.auth) {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  config[METHOD_MAP[config.method]] = {
    ...config[METHOD_MAP[config.method]],
    ...commonParams
  };
  /*
   * 添加验证参数
   * */
  if (config.auth === true) {
    config[METHOD_MAP[config.method]] = {
      ...config[METHOD_MAP[config.method]]
    };
  }
  /*
   * 过滤值为空参数
   * */
  config[METHOD_MAP[config.method]] && Object.keys(config[METHOD_MAP[config.method]]).forEach((val) => {
    if (isUndefOrEmpty(config[METHOD_MAP[config.method]][val])) {
      delete config[METHOD_MAP[config.method]][val];
    }
  });

  return config;
}, error => {
  Promise.reject(error);
});
service.interceptors.response.use(
  response => {
    let resultCode,resultDesc;
    if (response && response.data.error_code) {
      resultCode = response.data.error_code;
      resultDesc = response.data.error_msg;
      if (resultCode == '0') {
        return response.data;
      } else {
        return Promise.reject(response);
      }
    } else {
      resultCode = response && response.data && response.data.resultCode;
      let errCode = ['00000006','00000007','00000008'];//登录信息失败需要跳转登录的情况
      if(errCode.includes(resultCode)){
        if(getUrlParam().returnTips || getUrlParam().returnUrl){
          goUrl(decodeURIComponent(getUrlParam().returnTips || getUrlParam().returnUrl));
        }else{
          return response.data;
        }
      }
      return response.data;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
```

## 格式化数字后的input光标处理
```html
<input ref="input" type="text" v-model="inputText" />
```
```javascript
import mask from 'vanilla-masker'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    mask:String //999 9999 9999
  },
  data() {
    return {
      inputText: this.value
    }
  },
  watch:{
    inputText(newVal,oldVal){
      let selection = null;
      try{
        selection = this.$refs.input.selectionStart
        let direction = newVal.length - oldVal.length
        selection = this._getInputMaskSelection(selection, direction, this.maskValue(newVal))
        this.lastDirection = direction
      }catch(e){}
      this.$emit('input',this.maskValue(newVal));
      this.$nextTick(()=>{
        if(this.$refs.input.selectionStart !== selection){
          this.$refs.input.selectionStart = selection;
          this.$refs.input.selectionEnd = selection;
        }
        if(this.inputText !== this.maskValue(newVal)){
          this.inputText = this.maskValue(newVal)
        }
      })
    },
    mask(val){
      if(val && this.inputText){
        this.inputText = this.maskValue(this.inputText)
      }
    },
    value(val){
      this.inputText = val;
    }
  },
  methods: {
    maskValue(val){
      var val1 = this.mask? mask.toPattern(val,this.mask) : val;
      return val1;
    },
    _getInputMaskSelection (selection, direction, maskVal, loop) {
      if (!this.mask || (loop && direction === 0)) {
        return selection
      }
      if (direction === 0) {
        direction = this.lastDirection
      }
      if (direction > 0) {
        const maskChar = this.mask.substr(selection - direction, 1)
        if (!maskChar.match(/[9SA]/)) {
          return this._getInputMaskSelection(selection + 1, direction, maskVal, true)
        }
      }
      return selection
    }
  }
}
```

## 洋葱模型
```javascript
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
