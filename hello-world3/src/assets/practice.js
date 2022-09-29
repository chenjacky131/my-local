/*
  1.所有函数都是对象，对象中可以包含属性和方法
  2.每个函数都有一个特殊的属性叫做原型或者叫做原型对象--prototype(箭头函数除外)
  3.所有原型对象都有一个constructor属性
  4.所有对象上都有__proto__属性
  5.每个对象的__proto__都是指向它的构造函数的原型对象prototype
  6.Function函数是所有函数的祖先函数
*/
function Person(myName, myAge){
  this.name = myName;
  this.age = myAge;
}
Person.prototype.say = function() {
  console.log(this.name +' say hi');  
}
let person = new Person('tom', 18);
console.log(person.__proto__ === Person.prototype)  //  true
console.log(person.__proto__.constructor === Person)  //  true

/*
  1.JavaScript中的函数是引用类型(对象类型)，既然是对象，所以也是通过构造函数创建出来的。
  2.所有函数都是通过Function构造函数创建出来的对象(例如普通声明的函数或是构造函数都是Function创建出来的实例对象)
  3.JavaScript中只要是函数就有prototype属性，Function的prototype同样指向Function的原型对象
  4.JavaScript中只要是原型对象就有constructor属性，Function原型对象的constructor属性指向它对应的构造函数
  5.所有对象都有__proto__属性，它指向该对象构造函数的原型
  6.Function的__proto__属性比较特殊，应为它自身就是祖先函数，所以Function的__proto__属性指向它的原型对象
*/