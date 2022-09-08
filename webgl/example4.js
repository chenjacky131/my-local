/*
 * @Author: ccw chencw@cniship.com
 * @Date: 2022-05-27 14:09:59
 * @LastEditors: ccw chencw@cniship.com
 * @LastEditTime: 2022-06-06 15:35:02
 * @FilePath: \Local\webgl\index.js
 * @Description: webGL三维体验,画一个三角形
 * 平移变换有三种方法：
 * 1  手动修改顶点坐标数值
 * 2  利用for循环修改顶点左边数值，此计算由CPU完成
 * 3  利用着色器语言修改，此计算由GPU完成
 * 4 利用平移矩阵法
 */

//通过getElementById()方法获取canvas画布
var canvas = document.getElementById('webgl');
//通过方法getContext()获取WebGL上下文
var gl = canvas.getContext('webgl');
//顶点着色器源码
var vertexShaderSource = `
    attribute vec4 apos;
    void main(){
      mat4 m4 = mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, -0.4,0,0,1);
      gl_Position = m4*apos;
    }
    `;
//片元着色器源码
var fragShaderSource = `
    void main(){
      gl_FragColor = vec4(1,0,0,1);
    }
    `;

function drawScene(){
  //初始化着色器
  var program = initShader(gl, vertexShaderSource, fragShaderSource);

  //9个元素构建三个顶点的xyz坐标值
  // 数组里9个元素，每间隔3个为一组，分别代表xyz轴上的坐标值
  var data=new Float32Array([
    0, 0, 1,//三角形顶点1坐标
    0, 1, 0.0,//三角形顶点2坐标
    1, 0, 0//三角形顶点3坐标
  ]);
  //获取顶点着色器的位置变量apos，即aposLocation指向apos变量。
  var aposLocation = gl.getAttribLocation(program, 'apos');
  //创建缓冲区对象
  var buffer = gl.createBuffer();
  //绑定缓冲区对象,激活buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  //顶点数组data数据传入缓冲区
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  //缓冲区中的数据按照一定的规律传递给位置变量apos
  gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0);
  //允许数据传递
  gl.enableVertexAttribArray(aposLocation);
  //开始绘制图形
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
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
drawScene();