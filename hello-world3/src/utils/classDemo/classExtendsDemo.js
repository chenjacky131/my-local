/**
 * 类的继承
 */
class Father{
  constructor(sex){
    this.sex = sex
  }
  show(){
    console.log('性别为' + this.sex)
  }
}
class Son extends Father{
  constructor(father,name){
    super(father.sex);
    this.name = name
  }
  display(){
    super.show()
    console.log('姓名为' + this.name)
  }
}
const father1 = new Father('男');
const son1 = new Son(father1, 'Tom');
son1.display();