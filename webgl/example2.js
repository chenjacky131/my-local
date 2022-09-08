/*
 * @Author: ccw chencw@cniship.com
 * @Date: 2022-05-27 14:09:59
 * @LastEditors: ccw chencw@cniship.com
 * @LastEditTime: 2022-05-27 17:20:53
 * @FilePath: \Local\webgl\index.js
 * @Description: webGL画矩形
 */

//通过getElementById()方法获取canvas画布
var canvas = document.getElementById('webgl');
//通过方法getContext()获取WebGL上下文
var gl = canvas.getContext('webgl');
//顶点着色器源码
var vertexShaderSource = `
    attribute vec4 apos;
    void main(){
      gl_Position = apos;
    }
    `;
//片元着色器源码
var fragShaderSource = `
    void main(){
      gl_FragColor = vec4(1,0,0,1);
    }
    `;
//初始化着色器
var program = initShader(gl, vertexShaderSource, fragShaderSource);

//类型数组构造函数Float32Array创建顶点数组
// 矩形四个顶点坐标的数据
var data = new Float32Array([
  0.75, 0.75, 
  -0.75, 0.75,
  -0.75, -0.75, 
  0.75, -0.75]);

//获取顶点着色器的位置变量apos，即aposLocation指向apos变量。
var aposLocation = gl.getAttribLocation(program, 'apos');
//创建缓冲区对象
var buffer = gl.createBuffer();
//绑定缓冲区对象,激活buffer
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//顶点数组data数据传入缓冲区
gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
//缓冲区中的数据按照一定的规律传递给位置变量apos
gl.vertexAttribPointer(aposLocation, 2, gl.FLOAT, false, 0, 0);
//允许数据传递
gl.enableVertexAttribArray(aposLocation);
//开始绘制图形
gl.drawArrays(gl.LINE_LOOP, 0, 4);
//声明初始化着色器函数
function initShader(gl, vertexShaderSource, fragmentShaderSource) {
  //创建顶点着色器对象
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  //创建片元着色器对象
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  //引入顶点、片元着色器源代码
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  //编译顶点、片元着色器
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  //创建程序对象program
  var program = gl.createProgram();

  //附着顶点着色器和片元着色器到program
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  //链接program
  gl.linkProgram(program);
  //使用program
  gl.useProgram(program);
  //返回程序program对象
  return program;
}