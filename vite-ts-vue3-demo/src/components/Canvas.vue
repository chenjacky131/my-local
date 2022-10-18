<template>
  <div>
    <canvas id="canvas" width="500" height="500"></canvas>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
const drawLine = (ctx: CanvasRenderingContext2D ) => { //  画直线
  ctx.beginPath();
  ctx.moveTo(200,375);
  ctx.lineTo(250,50);
  ctx.lineTo(300,375);
  ctx.stroke();
}
const drawRect = (ctx: CanvasRenderingContext2D ) => { //  画矩形
  ctx.strokeRect(50,50,100,100);
  ctx.fillRect(50, 160, 100, 100);
  setTimeout(() => {
    ctx.clearRect(0,0,500,500); //  清除画布
  }, 1000);
}
const drawCircle = (ctx: CanvasRenderingContext2D ) => { //  画圆弧和圆
  ctx.beginPath();  //  开始画图路径
  drawStyle(ctx);
  ctx.arc(250,250, 100, 0, Math.PI, false);
  ctx.stroke();
  // ctx.closePath();  //  结束画图路径(非必须的)
  ctx.beginPath();
  ctx.arc(250,250,50,0,Math.PI*2,false);
  ctx.stroke();
  ctx.fill();
  // ctx.closePath();
}
const drawEllipse = (ctx: CanvasRenderingContext2D ) => {  //  画椭圆
  ctx.beginPath();
  ctx.ellipse(250,250,100,50,0,0,Math.PI*2);
  ctx.stroke();
}
const drawQuadraticCurve = (ctx: CanvasRenderingContext2D ) => {  //  画二次贝塞尔曲线
  ctx.beginPath();
  ctx.moveTo(0,250);
  ctx.quadraticCurveTo(250,500,500,250);
  ctx.stroke();
}
const drawBezierCurve = (ctx: CanvasRenderingContext2D ) => {  //  画三次贝塞尔曲线
  ctx.beginPath();
  drawStyle(ctx);
  ctx.moveTo(20,250);
  ctx.bezierCurveTo(125,125,375,375,480,250);
  ctx.stroke();
}
const drawStyle = (ctx: CanvasRenderingContext2D ) => {  //  绘制样式
  ctx.lineWidth = 1; //  线宽
  ctx.lineCap = 'round'; //  端点显示样式。默认butt，还有round,square
  ctx.lineJoin = 'miter'; //  线段连接处显示样式。默认miter，可选值round,bevel
  ctx.miterLimit = 5; //  如果交点距离大于miterLimit,连接效果会变成lineJoin=bevel的效果
  ctx.setLineDash([5, 10, 20, 5]); //  设置虚线样式
  console.log(ctx.getLineDash()); //  获取虚线样式
  ctx.lineDashOffset = 10;  //  虚线样式的起始偏移量
  //  改变透明度的几种方法
  ctx.fillStyle = 'rgba(0,255,0,0.5)';
  ctx.strokeStyle = 'rgba(255,0,0,0.2)';
  ctx.globalAlpha = 1;
  const gradient1 = ctx.createLinearGradient(200,0,300,0);  //  线性渐变
  gradient1.addColorStop(0,'red');
  gradient1.addColorStop(1,'black');
  const gradient2 = ctx.createRadialGradient(250,250,0,250,250,50); //  径向渐变
  gradient2.addColorStop(0,'red');
  gradient2.addColorStop(1,'black');
  ctx.fillStyle = gradient2;

}
const drawImagePattern = (ctx: CanvasRenderingContext2D ) => { //  图片样式
  let img = new Image();
  img.src = 'logo.png';
  img.onload = function() {
    const ptn = ctx.createPattern(img, 'no-repeat');  //  第二个参数绘制模式，类似css的backgroun-repeat
    ctx.fillStyle = ptn;
    ctx.fillRect(0,0,500,500);
  }
}
const drawImage = (ctx: CanvasRenderingContext2D ) => {  //  绘制图片
  const img = new Image();
  img.src = 'logo.png';
  img.onload = () => {
    //  正常绘制:drawImage(img,dx,dy);
    //  缩放：drawImage(image, dx, dy, dWidth, dHeight)：在绘制的基础上我们又增加了两个参数，这两个参数能控制绘制元素的大小，整体实现一个缩放的效果。
    //  裁剪：drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)：在缩放的基础上又增加了四个参数，整体也是在缩放的基础上增加了裁剪的功能。
    ctx.drawImage(img,0,0)
  }
}
const drawText = (ctx: CanvasRenderingContext2D ) => { //  绘制文字
  ctx.beginPath();
  ctx.font = '50px serif';
  ctx.textAlign = 'start';  //  文本对齐方式：left,right,center,start,end。和direction有关系
  ctx.direction = 'ltr';  //  ltr,rtl,inherit(默认值)
  ctx.textBaseline = 'bottom';  //  基线对齐选项:top,hanging,middle,alphabetic(默认值),ideographic和bottom
  ctx.shadowColor = 'black';
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.shadowBlur = 5;
  // ctx.strokeText('测试文字',50, 250,500); //  描边文字，最后一个参数为最大长度，超出最大长度后，字体会被压缩
  ctx.fillText('测试文字', 50,250,500);
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(50,250)
  ctx.lineTo(500,250);
  ctx.stroke();
  const text = ctx.measureText('Hi Canvas!'); //  返回一个文字属性对象，主要是获取文字长度
  console.log(text)
}
const saveAndRestore = (ctx: CanvasRenderingContext2D ) => { //  save和restore
  ctx.fillStyle = 'gray';
  ctx.fillRect(0,0,100,100);
  ctx.save();
  ctx.fillStyle = 'orange';
  ctx.fillRect(0,110, 100,100);
  ctx.restore();
  ctx.fillRect(0,220, 100,100)
}
const transformFunc = (ctx: CanvasRenderingContext2D ) => {  //  移动、旋转、缩放
  ctx.fillStyle = 'orange';
  ctx.save();
  ctx.save();
  ctx.save();
  ctx.translate(100,100);
  ctx.fillRect(0,0,100,100);

  ctx.restore();
  ctx.rotate(Math.PI/4);  //  旋转45°，Math.PI=180°
  ctx.fillRect(0,0,100,100);
  
  ctx.restore();
  ctx.scale(2,1);
  ctx.fillRect(100, 300, 100,100);
}
const initCanvas = () => {
  const canvas = <HTMLCanvasElement> document.querySelector('#canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  transformFunc(ctx);
}
onMounted(() => {
  initCanvas();
});

</script>
<style></style>