###### Boolean类型
````
const flag:boolean = true;
````
##### Number类型
````
const count:number = 10;
````
##### String类型
````
const name:string = 'tom';
````
##### Enum类型
  . 普通枚举
  ````
  //  初始默认值为0，其余成员会按顺序自动增长，可以理解为数组下标
  enum Color{ 
    RED,
    PINK,
    BLUE
  }
  const red:Color = Color.RED;
  console.log(red); //  0
  ````
  . 设置初始值
  ````
  enum Color {
    RED = 2,
    PINK,
    BLUE
  }
  const pink:Color = Color.PINK;
  console.log(pink);  //  3
  ````
  . 字符串枚举
  ````
  enum Color {
    RED = '红色',
    PINK = '粉色',
    BLUE = '蓝色'
  }
  const pink: Color = Color.PINK;
  console.log(pink);  //  粉色
  ````
  . 常量枚举
  ````
  /*  使用const关键字修饰的枚举，常量枚举和普通枚举的区别是，整个枚举会在编译阶段被删除 */
  const enum Color {
    RED,
    PINK,
    BLUE
  }
  const color:Color[] = [Color.RED, Color.PINK, Color.BLUE];
  console.log(color); //  [0,1,2]
  //  编译后的结果
  var color = [0,/*RED*/ 1,/*PINK*/ 2/*BLUE*/]
  ````
##### Array类型
````
const arr:number[] = [1,2,3];
const arr2:Array<number> = [1,2,3];
````
##### 元组(tuple)类型
````
/* 上面的数组类型的形式，只能定义出内部为同种类型的数组。对于内部不同类型的数组可以用元组类型来定义 */
const tuple:[number, string] = [1,'shenzhen']
/* 元组只能表示一个已知元素数量和类型的数组，长度已指定，越界访问会提示错误。
例如，一个数组中可能有多种类型，数量和类型都不确定，那就直接any[]。 */
````
##### undefined和null
````
//  默认情况null和undefined是所有类型的子类型。也就是说你可以把null和undefined赋值给其它类型。
let a:undefined = undefined;
let b:null = null;
let str:string = 'tom';
str = undefined;  //  编译正确
str = null; //  编译正确
/* 如果你在tsconfig.json指定了'strickNullChecks': true,即开启严格模式后，null和undefined只能给它们自己的类型赋值 */
//  启用--strickNullChecks
let x:number;
x = 1;
x = undefined;  //  编译错误
x = null; //  编译错误
//  但是可以给void赋值
let c:void = undefined; //  编译正确
let d:void = null;  //  编译正确
````
##### any类型
````
let value:any = 1;
value = 'tom';  //  编译正确
value = []; //  编译正确
value = {}; //  编译正确
````
##### void类型
````
//  void意思是空白的，一般只用在函数上，告诉别人这个函数没有返回值
function sayHello():void {
  console.log('hellow, tom')
}
````
##### never类型
/* never的类型表示的是那些永远不存在的值的类型。例如never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型 */
  值会永不存在的两种情况:
  1. 如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值(因为抛出异常会直接中断程序运行，这使得程序运行不到返回值那一步)
  2. 程序中执行无限循环的代码(死循环),使得程序永远无法运行到返回值的那一步。
````
//  异常
function error(msg: string):never{  //  编译正确
  throw new Error(msg)
}
//  死循环
function loopForever():never {  //  编译正确
  while(true){}
}
````
##### unknown类型
````
//  unknown与any类型一样，所有类型都可以分配给unknown
let value:unknown = 1;
value = 'tom';  //  编译正确
value = false;  //  编译正确
/* 区别 any: any类型的值可以赋值给任何类型，任何类型的值也可以赋值给any。unknown: 任何类型的值都可以赋值给unknown，但是它只能赋值给unknown和any */  
````
#### 对象类型
  object,Object和{}类型
  . object: 用于表示所有的非原始类型，即我们不能把number、string、boolean、symbol等原始值类型赋值给object。在严格模式下，null和undefined类型也不能赋值给object。
  ````
  let object:object;
  object = 1; //  报错
  object = 'a'; //  报错
  object = true;  //  报错
  object = null;  //  报错
  object = undefined; //  报错
  object = {};  //  编译正确
  ````  
  . Object: Object代表所有拥有toString、hasOwnProperty方法的类型 所以所有原始类型、非原始类型都可以赋给Object(严格模式下null和undefined不可以)
  ````
  let bigObject:Object;
  object = 1; //  正确
  object = 'a'; //  正确
  object = true;  //  正确
  object = null;  //  错误
  object = undefined; //  错误
  object = {};  //  正确
  ````
  . {}: 和Object类型一样
##### 类
````
class Person {
  name: string;
  age: number;
  constructor(name:string, age:number){
    this.name = name;
    this.age = age;    
  }
  sayHi():void{
    console.log(`Hi,${this.name}`)
  }
}
````
##### 数组
````
const flag1:number[] = [1,2,3];
const flag2:Array<number> = [1,2,3]
````
##### 函数
  . 函数声明
  ````
  function add(x: number, y: number):number{
    return x + y;
  }
  ````
  . 函数表达式
  ````
  const add = function(x:number, y:number):number{
    return x + y;
  }
  ````
  . 接口定义函数
  ````
  interface Add {
    (x: number, y: number): number;
  }
  ````
  . 可选参数
  ````
  function add(x:number, y?: number): number{
    return y? x + y : x;
  }
  ````
  . 默认参数
  ````
  function add(x:number, y:number = 0): number{
    return x + y;
  }
  ````
  . 剩余参数
  ````
  function add(...numbers: number[]):number{
    let sum = 0;
    for(let i = 0; i < numbers.length; i++){
      sum += numbers[i];
    }
    return sum;
  }
  ````
  . 函数重载
  ````
  //  函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力
  function add(x:number, y: number):number;
  function add(x:string, y:string):string;
  function add(x:any, y:any):any{
    return x + y;
  }
  /* 函数重载真正执行的是同名函数最后定义的函数体，在最后一个函数体定义之前全部都属于函数类型定义，不能写具体的函数实现方法，只能定义类型 */
  ````
##### 类型推论
  如果没有明确指定类型，那么TypeScript会依照类型推论的规则推断出一个类型
  ````
  let x = 1;
  x = true; //  报错  
  ````
  上面的代码等介于
  ````
  let x:number = 1;
  x = true; //  报错
  ````
  如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成any类型而完全不被类型检查
  ````
  let x;
  x = 1;  //  正确
  x = true; //  正确
  ````
##### 类型断言
  某些情况下，我们可能比TypeScript更加清楚的知道某个变量的类型，所以我们可能希望手动指定一个值的类型。类型断言有两种方式
  . 尖括号写法
  ````
  let str:string = 'to be or not to be';
  let strLength:number = (<string>str).length;
  ````
  . as写法
  ````
  let str:string = 'to be or not to be';
  let strLength:number = (str as string).length;
  ````
##### 非空断言
  在上下文类型检查器无法断言类型时，可以使用缀表达式操作符 ! 进行断言操作对象是非null和非undefined的类型(即x!不会等于null或undefined)
  ````
  let user: string | null | undefined;
  console.log(user!.toUpperCase()); //  编译正确
  console.log(user.toUpperCase());  //  错误
  ````
##### 确定赋值断言
  ````
  let value:number;
  console.log(value); //  Variable 'value' is used before being assigned
  ````
  我们定义了变量，没有赋值就是用，则会报错。通过let x!:number;确定赋值断言，
  编译器就是知道该属性会被明确地赋值
  ````
  let value!:number;
  console.log(value); //  undefined编译正确
  ````
##### 联合类型
  ````
  let status:string | number;
  status = 'hello';
  status = 1
  ````
#####  类型别名
  类型别名用来给一个类型起个新名字。它只是起了个新名字，并没有创建新的类型。类型别名常用于联合类型。
  ````
  type count = number | number[];
  function hello(value:count){}
  ````
##### 交叉类型
  交叉类型就是联合类型的相反，用 & 操作符表示，交叉类型就是两个类型必须存在
  ````
  interface IpersonA {
    name: string,
    age: number
  }
  interface IpersonB {
    name: string,
    gender: string
  }
  let person:IpersonA && IpersonB = {
    name: 'tom',
    age: 18,
    gender: 'male'
  }
  ````
  注意：交叉类型取的是多个类型的并集，但是如果key值相同但是类型不同，则该key为
  never类型
  ````
  interface PersonA {
    name: string
  }
  interface PersonB {
    name: number
  }
  function testFn(params: PersonA & PersonB){
    console.log(params)
  }
  testFn({name: 'tom'})
  ````
##### 类型守卫
  类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。
  目前主要有四种方式来实现类型保护：
  1. in关键字
  ````
  interface InObj1 {
    a: number,
    x: string
  }
  interface InObj2 {
      a: number,
      y: string
  }
  function isIn(arg: InObj1 | InObj2) {
      // x 在 arg 打印 x
      if ('x' in arg) console.log('x')
      // y 在 arg 打印 y
      if ('y' in arg) console.log('y')
  }
  isIn({a:1, x:'xxx'});
  isIn({a:1, y:'yyy'});
  ````
  2.  typeof 关键字
  ````
  function isTypof(val: string | number){
    if(typeof val === 'number') return 'number';
    if(typeof val === 'string') return 'string';
    return  'not a number or string'
  }
  ````
  typeof x中，x必须是'number','string','boolena','symbol'类型
  3.  instanceof
  ````
  function createDate(date: Date | string){
    console.log(Date);
    return date instanceof(Date) ? date.getDate() : new Date(date);    
  }
  ````
  4.  自定义类型保护的类型谓词
  ````
  function isNumber(num:any):num is number{
    return typeof num === 'number';
  }
  function isString(str: any): str is string{
    return typeof str === 'string';
  }
  ````
##### 接口
  我们用接口来定义对象的类型，接口是对象属性和方法的描述
  ````
  interface Person{
    name:string;
    age:number;
  }
  let tom:Person = {
    name: 'Tom',
    age: 18
  }
  ````
  接口一般首字母大写
  . 设置接口可选|只读
  ````
  interface Person{
    readonly name: string;
    age?: number;
  }
  ````
  . 索引签名
  用索引签名来定义任意属性，一旦定义了任意属性，那么确定属性和可选属性的类型都
  必须是它的类型的子集
  ````
  interface Person {
    name: string;
    age?: number;
    [prop:string]: any; //  prop字段必须是string类型或number类型。值是any类型
  }
  const p1:Person = {name:'tom'};
  const p2:Person = {name:'jerry', age: 28};
  const p3:Person = {name:'harry', sex: 1}
  ````
##### 接口和类型别名的区别
  .都可以用来描述对象或者函数的类型，只是语法不同
  ````
  type myType = {
    name: string;
    say():void;
  }
  interface myInterface{
    name: string;
    say():void;
  }  
  ````
  都允许扩展
  .interface使用extends来扩展
  ````
  interface MyInterface {
    name: string;
    say():void;
  }
  interface MyInterface2 extends MyInterface {
    sex: string;
  }
  let person:MyInterface2 = {
    name: 'tom',
    sex: 'male',
    say():void{
      console.log('hello, tom')
    }
  }
  ````
  .type使用&实现扩展
  ````
  type MyType = {
    name: string;
    say():void;
  }
  type MyType2 = MyType & {
    sex: string;
  }
  let value: MyType2 = {
    name: 'tom',
    sex: 'male',
    say():void{
      console.log('hello tom')
    }
  }
  ````
  .type可以声明基本数据类型别名/联合类型/元组等，而interface不行
  ````
  //  基本类型别名
  type UserName = string;
  type UserName = string | number;
  //  联合类型
  type Animal = Pig | Dog | Cat;
  type List = [string,boolean,number];
  ````
  .interface可以合并声明而type不行
  ````
  interface Person {
    name: string;
  }
  interface Person {
    age: number;
  }
  //  此时Person具有name和age属性
  ````
##### 泛型
  .基本使用
  ````
  function getValue<T>(arg:T):T{
    return arg;
  }
  1.定义要使用的类型
  getValue<string>('tom');  //  定义T为string类型
  2.利用TypeScript的类型推断
  getValue('tom');  //  自动推导类型为string  
  ````
  .多个参数
  ````
  function getValue<T,U>(arg:[T,U]):[T,U]{
    return arg;
  }
  //  使用
  getValue(['tom',18]);
  ````
  .泛型约束
  ````
  interface Lengthwise {
    length: number;
  }
  function getValue<T extends Lengthwise>(arg:T):T{
    console.log(arg.length);
    return arg;
  }
  //  使用
  getValue('tom');
  getValue([1,2,3]);
  getValue({length:8});
  ````
  .泛型接口
  ````
  interface KeyValue<T,U> {
    key: T;
    value: U;
  }
  const p1:KeyValue<string,number> = {
    key: 'tom',
    value: 18
  }
  const p2:KeyValue<number,string> = {
    key: 18,
    value: 'harry'
  }
  ````
  .泛型类
  ````
  class Test<T>{
    value: T;
    add: (x:T, y:T) => T;
  }
  let myTest = new Test<number>();
  myTest.value = 0;
  myTest.add = function (x,y) {
    return x + y;
  }
  ````
  .泛型类型别名
  ````
  type Cat<T> = {list:T[]} | T[];
  let c1:Cat<string> = {list: ['1']};
  let c2:Cat<number> = [1,2,3];
  ````
  .泛型参数的默认类型
  ````
  function createArray<T = string>(length: number, value: T):Array<T>{
    let result:T[] = [];
    for(let i = 0; i < length; i++){
      result[i] = value;
    }
    return result;
  }
  ````
  .泛型工具类型
    typeof
    ````
    //  先定义变量，再定义类型
    let p1 = {
      name: 'tom',
      age: 18,
      gender: 'male'
    }
    type Person = typeof p1;
    function getName(p:Person):string{
      return p.name;
    }
    getName(p1);
    ````
    keyof
    ````
    interface Person {
      name: string;
      age: number;
      gender: 'male' | 'female'
    }
    type PersonKey = keyof Person;  //  type PersonKey = 'name'|'age'|'gender'
    function getValueByKey(p:Person, key: PersonKey) {
      return p[key];
    }
    let val = getValueByKey({name:'tom',age:18, gender:'male'}, 'name');
    console.log(val);   //  tom
    ````
    in
    ````
    type Keys = 'a'|'b'|'c';
    type Obj = {
      [p in Keys]: any
    }
    //  {a: any, b: any, c:any}
    ````
    infer
    ````
    type ReturnType<T> = T extends (...args:any[]) => infer R? R : any;
    ````
    extends
    ````
    interface Lengthwise {
      length: number;
    }
    function loggingIdentify<T extends Lengthwise>(arg: T):T{
      console.log(arg.length);
      return arg;
    }
    ````
    索引访问操作符[]
    ````
    interface Person {
      name: string;
      age: number;
    }
    type x = Person[name];  //  x is string
    ````
##### 内置工具类型
  1. Required:将类型的属性变成必选
  ````
  interface Person {
    name?:string;
    age?: number;
    hobby?:string[];
  }
  const user:Required<Person> = {
    name: 'tom',
    age: 18,
    hobby: ['swimming', 'football']
  }
  ````
  2. Partial:将所有属性转换成可选属性
  ````
  interface Person {
    name: string,
    age: 18
  }
  let person:Partial<Person> = {
    name: 'tom',
    age: 18
  }
  ````
  3. Exclude:将某个类型从另一个类型中移除掉，剩余的属性构成新的类型
  ````
  type T0 = Exclude<'a'|'b'|'c','a'>; //  'b'|'c'
  type T1 = Exclude<'a'|'b'|'c','a'|'b'>; //  'c'
  type T3 = Exclude<string | number | (() => void), Function>;  //  string | number
  ````
  4. Extract:Extract<T,U>从T中提取U,适用于并集类型
  ````
  type T0 = Extract<'a'|'b'|'c', 'a'|'f'>;  //  'a'
  type T1 = Extract<string | number | (() => void), Function>;  //  () => void
  ````
  5. Readonly:把数组或对象的所有属性转换为只读的
  ````
  interface Person {
    name: string;
    age: number;
    gender?: 'male' | 'female';
  }
  let p:Readonly<Person> = {
    name: 'tom',
    age: 18
  }
  p.age = 19
  ````
  6. Record: Record<K extends keyof any, T>的作用是将K中所有的属性的值转化为T类型
  ````
  type Property = 'key1'|'key2';
  type Person = Record<Property, string>;
  const p:Person = {
    key1: 'tom',
    key2: 'hello'
  }
  ````
  7. Pick: 从某个类型中挑出一些属性来
  ````
  type Person = {
    name: string;
    age: number;
    gender: string;
  }
  type P1 = Pick<Person, 'name'|'age'>; //  {name:string, age:number}
  const user:P1 = {
    name: 'tom',
    age: 19
  }
  ````
  8. Omit: Omit<T, K>从T中取出出去K的其它属性
  ````
  interface Person {
    name: string;
    age: number;
    gender: string;
  }
  type P1 = Omit<Person, 'gender' | 'age'>; //  {name: string}
  const user:P1 = {
    name: 'tom'
  }
  ````
  9. NonNullable:去除类型中的null和undefined
  ````
  type P1 = NonNullable<string|number|undefined>; //  string | number
  type P2 = NonNullable<string[] | null | undefined>; //  string[]
  ````
  10. ReturnType:用来得到一个函数的返回值类型
  ````
  type Func = (value: string) => string;
  const test:ReturnType<Func> = '1';
  ````
  11. Parameters:获得函数参数类型组成的元组
  ````
  type P1 = Parameters<(a:number, b:string) => void>; //  [number,string]
  ````
  12. InstanceType:返回构造函数类型T的实例类型
  ````
  class C {
    x = 0;
    y = 0;
  }
  type D = InstanceType<typeof C>;  //  C
  ````
##### tsconfig.json
  . 重要字段
    1. files - 设置要编译的文件名称；
    2. include - 设置需要进行编译的文件，支持路径模式匹配；
    3. exclude - 设置无需进行编译的文件，支持路径模式匹配；
    4. compilerOptions - 设置与编译流程相关的选项；
  . compilerOptions选项
    ````
    "compilerOptions": {
      /* 基本选项 */
      "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
      "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
      "lib": [],                             // 指定要包含在编译中的库文件
      "allowJs": true,                       // 允许编译 javascript 文件
      "checkJs": true,                       // 报告 javascript 文件中的错误
      "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
      "declaration": true,                   // 生成相应的 '.d.ts' 文件
      "sourceMap": true,                     // 生成相应的 '.map' 文件
      "outFile": "./",                       // 将输出文件合并为一个文件
      "outDir": "./",                        // 指定输出目录
      "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
      "removeComments": true,                // 删除编译后的所有的注释
      "noEmit": true,                        // 不生成输出文件
      "importHelpers": true,                 // 从 tslib 导入辅助工具函数
      "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

      /* 严格的类型检查选项 */
      "strict": true,                        // 启用所有严格类型检查选项
      "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
      "strictNullChecks": true,              // 启用严格的 null 检查
      "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
      "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

      /* 额外的检查 */
      "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
      "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
      "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
      "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

      /* 模块解析选项 */
      "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
      "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
      "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
      "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
      "typeRoots": [],                       // 包含类型声明的文件列表
      "types": [],                           // 需要包含的类型声明文件名列表
      "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

      /* Source Map Options */
      "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
      "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
      "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
      "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

      /* 其他选项 */
      "experimentalDecorators": true,        // 启用装饰器
      "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
    }
    ````