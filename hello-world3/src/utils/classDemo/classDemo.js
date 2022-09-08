/**
 * 类方法演示
 */
class Person{
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
  study(){
    console.log(this.name + '在学习')
  }
  sleep(){
    console.log(this.name + '在睡觉')
  }
}
const p1 = new Person('tom', 18)
const p2 = new Person('jack', 19)
console.log(p1.name)
console.log(p2.name)
p1.study()
p2.sleep()