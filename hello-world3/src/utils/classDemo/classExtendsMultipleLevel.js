/**
 * 类的继承，多层继承, 圆柱继承圆，圆继承点
 */
class Point{
  constructor(coordinatesx, coordinatesy){
    this.coordinatesx = coordinatesx;
    this.coordinatesy = coordinatesy;
  }
  show(){
    console.log('圆心为：' + this.coordinatesx + ',' + this.coordinatesy);
  }
}
class Circle extends Point{
  constructor(point, radius){
    super(point.coordinatesx, point.coordinatesy);
    this.radius = radius;
  }
  area(){
    return Math.PI*Math.pow(this.radius, 2);
  }
  show(){
    super.show();
    console.log('圆的面积为：' + this.area());
    console.log('圆的半径为：' + this.radius);
  }
}
class Cylinder extends Circle{
  constructor(circle,height){
    super(circle, circle.radius);
    this.height = height;
  }
  vol(){
    return super.area() * this.height;
  }
  cylinderArea(){
    return (super.area()*2 + 2*Math.PI*this.radius*this.height)
  }
  show(){
    super.show();
    console.log('圆柱体高度：' + this.height);
    console.log('圆柱体体积：' + this.vol());
    console.log('圆柱体的表面积：' + this.cylinderArea());
  }
}
const point1 = new Point(100,100);
const circle1 = new Circle(point1, 50);
const cylinder1 = new Cylinder(circle1, 200);
cylinder1.show();