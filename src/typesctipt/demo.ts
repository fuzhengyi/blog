// 交叉类型
function extend<T, U>(first: T, second: U): T & U {
    let result = {} as T & U;
    for (let key in first) {
        result[key] = first[key] as any;
    }

    for (let key in second) {
        if (!result?.hasOwnProperty(key)) {
            result[key] = second[key] as any;
        }
    }
    return result;
}
// 示例用法
const objA = { a: 1 };
const objB = { b: 2 };
const combined = extend(objA, objB);
console.log(combined); // 输出: { a: 1, b: 2 }


// 联合类型 多个类型中的一个类型
function printId(id: string | number) {
    if (typeof id === "string") {
        console.log("ID is a string:", id.toUpperCase());
    } else {
        console.log("ID is a number:", id.toString());
    }
}

// 示例用法
printId("abc"); // 输出: ID is a string: ABC
printId(123);   // 输出: ID is a number: 123