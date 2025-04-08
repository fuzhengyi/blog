# ts
### 说说 typescript 的数据类型有哪些
- boolean
- number
- string
- array
- tuple 元祖
- enum 枚举
- any
- null undefined
- void 类型
- never 类型  
- object 类型 
### 类型索引
keyof类似Object.keys
```ts
interface Button {
    type: string
    text: string
}
type ButtonKeys = keyof Button //"type" | "text"
```
### 类型约束
extend
```ts
 type BaseType = string | numberr | bollean
 function copy<T extends BaseType>(arg: T): T {
    return arg
 }

 copy({}) //wrong
 copy(111)
 copy('ttt')
 copy(true)
```
### 类型约束和类型映射一起使用
```ts
function getValue<T, K extends keyof T>(obj: T, key: K): T[k] {
    return obj[key]
}
```
### 类型映射
```ts
type Readonly<T> = {
    readonly [P in keyof T]: T[p]
}

interface Obj {
    a: string
    b: string
}

type ReadOnlyObj = Readonly<obj>
```
### 条件类型
T extends U ? X :  Y 

### 方法特征的集合
```ts
interface Person {
    name: string
    age?: number
    readonly isMale: bollean
    say: (words: string) => string
    [propName: string]: any
}
```

### 交叉类型
```ts
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
```

### 联合类型
```ts
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
```

### 类型别名
```ts
// 基本类型别名
type UserId = number;

// 对象类型别名
type User = {
    id: UserId;
    name: string;
    email?: string; // 可选属性
};

// 联合类型别名
type Status = "active" | "inactive" | "pending";

// 泛型类型别名
type Nullable<T> = T | null;

// 复杂对象类型别名
type Point = {
    x: number;
    y: number;
};

type Circle = {
    center: Point;
    radius: number;
};

// 函数类型别名
type MathOperation = (a: number, b: number) => number;

// 示例用法
const user: User = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com"
};

const circle: Circle = {
    center: { x: 0, y: 0 },
    radius: 10
};

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;

console.log(user);             // 输出: { id: 1, name: 'John Doe', email: 'john.doe@example.com' }
console.log(circle);           // 输出: { center: { x: 0, y: 0 }, radius: 10 }
console.log(add(5, 3));         // 输出: 8
console.log(subtract(5, 3));    // 输出: 2
```