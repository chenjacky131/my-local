/**
 * 静态成员
 */
class Student{
  static home = '北二环'  //  新写法
  constructor(name){
    this.name = name
  }
  show(){
    console.log('学校：' + Student.school);
    console.log('家：' + Student.home);
    console.log('姓名：' + this.name);
  }
}
Student.school = '北京大学';  //  老写法
const student1 = new Student('张杰');
const student2 = new Student('谢娜');
student1.show();
student2.show();