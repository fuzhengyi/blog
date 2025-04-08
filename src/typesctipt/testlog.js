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
