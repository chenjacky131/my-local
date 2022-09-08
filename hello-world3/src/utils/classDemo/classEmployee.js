/**
 * 类的协作
 */
class MyDate{
  constructor(year, month, day){
    this.year = year;
    this.month = month;
    this.day = day;
  }
  show(){
    console.log('受雇时间是： ' + this.year + '年' + this.month + '月' + this.day + '日')
  }
}
class Employee{
  constructor(name, salary, workTime){
    this.name = name;
    this.salary = salary;
    this.workTime = workTime;
  }
  display(){
    console.log('姓名为' + this.name);
    console.log('工资为' + this.salary);
    this.workTime.show()
  }
}
const workTime1 = new MyDate('2022','02','11');
const employee1 = new Employee('tom','20k', workTime1);
employee1.display();