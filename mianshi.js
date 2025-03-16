function lengthOfLongSubstring(str){
    let set = new Set();
    let longStr = 0;
    let l = 0;
    for(let r = 0; r<str.length; r++){
        let currentStr = str[r];
        while(set.has(currentStr)){
            set.delete(str[l]);
            l++;
        }
        set.add(currentStr);
        longStr = Math.max(longStr,r-l+1);

    }
    return longStr;
}
const str = "bbbbbbb"
const str2 = "phhdshfikh"
console.log(lengthOfLongSubstring(str));
console.log(lengthOfLongSubstring(str2));
