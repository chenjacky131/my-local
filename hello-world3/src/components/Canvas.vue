<template>
  <div>
    <canvas id="canvas" width="500" height="500"></canvas>
  </div>
</template>
<script setup>
import { onMounted, reactive } from 'vue';
const drawLine = (ctx) => { //  画直线
  ctx.beginPath();
  ctx.moveTo(200,375);
  ctx.lineTo(250,50);
  ctx.lineTo(300,375);
  ctx.stroke();
}
const drawRect = (ctx) => { //  画矩形
  ctx.strokeRect(50,50,100,100);
  ctx.fillRect(50, 160, 100, 100);
  setTimeout(() => {
    ctx.clearRect(0,0,500,500); //  清除画布
  }, 1000);
}
const drawCircle = (ctx) => { //  画圆弧和圆
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
const pathCircle = (ctx) => { //  画路径的圆弧
  ctx.moveTo(0,250);
  ctx.lineTo(250,250);
  ctx.arcTo(500,250,500,500,250);
  ctx.stroke();
}
const drawEllipse = (ctx) => {  //  画椭圆
  ctx.beginPath();
  ctx.ellipse(250,250,100,50,0,0,Math.PI*2);
  ctx.stroke();
}
const drawQuadraticCurve = (ctx) => {  //  画二次贝塞尔曲线
  ctx.beginPath();
  ctx.moveTo(0,250);
  ctx.quadraticCurveTo(250,500,500,250);
  ctx.stroke();
}
const drawBezierCurve = (ctx) => {  //  画三次贝塞尔曲线
  ctx.beginPath();
  drawStyle(ctx);
  ctx.moveTo(20,250);
  ctx.bezierCurveTo(125,125,375,375,480,250);
  ctx.stroke();
}
const drawStyle = (ctx) => {  //  绘制样式
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
const drawImagePattern = (ctx) => { //  图片样式
  let img = new Image();
  img.src = 'logo.png';
  img.onload = function() {
    const ptn = ctx.createPattern(img, 'no-repeat');  //  第二个参数绘制模式，类似css的backgroun-repeat
    ctx.fillStyle = ptn;
    ctx.fillRect(0,0,500,500);
  }
}
const drawImage = (ctx) => {  //  绘制图片
  const img = new Image();
  img.src = 'logo.png';
  img.onload = () => {
    //  正常绘制:drawImage(img,dx,dy);
    //  缩放：drawImage(image, dx, dy, dWidth, dHeight)：在绘制的基础上我们又增加了两个参数，这两个参数能控制绘制元素的大小，整体实现一个缩放的效果。
    //  裁剪：drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)：在缩放的基础上又增加了四个参数，整体也是在缩放的基础上增加了裁剪的功能。
    ctx.drawImage(img,0,0)
  }
}
const drawText = (ctx) => { //  绘制文字
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
const saveAndRestore = (ctx) => { //  save和restore
  ctx.fillStyle = 'gray';
  ctx.fillRect(0,0,100,100);
  ctx.save();
  ctx.fillStyle = 'orange';
  ctx.fillRect(0,110, 100,100);
  ctx.restore();
  ctx.fillRect(0,220, 100,100)
}
const transformFunc = (ctx) => {  //  移动、旋转、缩放
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
const drawNet = (ctx) => {
  ctx.beginPath();
  for(let i=0; i <= 500; i+=10){
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'gray';
    ctx.moveTo(i,0);
    ctx.lineTo(i,500);
    ctx.stroke();
    ctx.moveTo(0,i);
    ctx.lineTo(500,i);
    ctx.stroke();
  }
}
const compositeOption = (ctx, operation) => {  //  合成操作
  /*
    source-over:在现有画布的上下文之上绘制图形
    source-in:新图形只在新图形和目标图像重叠的地方绘制
    source-out: 在不与现有画布重叠的地方绘制新图形
    source-atop: 新图形只在与现有画布内容重叠的地方绘制
    destination-over: 在现有画布内容后面绘制图形
    destination-in: 现有的画布内容保持在新图形和现有画布内容重叠的位置，其它地方都是透明。
    destination-out: 现有内容保持在新图形不重叠的地方
    destination-atop: 现有画布内容只保留与新图形重叠的部分，新的图形是在画布内容后面绘制的。
    lighter: 两个重叠图形的颜色是通过颜色值相加来确定的
    copy: 只显示新图形
    xor: 图像中，那些重叠和正常绘制之外的其它地方是透明的
    multiply: 将顶层元素与底层元素相应像素相乘，结果是一副更黑暗的图片
    screen: 像素被倒转，相乘，在倒转，结果是一副更明亮的图片
    overlay: multiply和screen的结合，原本暗的地方更暗，原本亮的地方更亮
    darken: 保留两个图层中最暗的像素
    lighten: 保留两个图层中最暗的像素
    color-dodge: 将底层除以顶层的反置
    color-burn: 将反置的底层除以顶层，然后将结果反过来
    hard-light: 屏幕相乘，类似于叠加，但上下图层互换了。
    soft-light: 将顶层减去底层或者相反来得到一个正值
    difference: 一个柔和版本的强光，纯黑或纯白不会导致纯黑或纯白。
    exclusion: 和difference相似，但对比度较低
    hue: 保留了底层的亮度和色度，同时采用了顶层的色调。
    saturation: 保留底层的亮度和色调，同时采用顶层的色度。
    color: 保留了底层的亮度，同时采用了顶层的色调和色度
    luminosity: 保持底层的色调和色度，同时采用顶层的亮度
  */  
  ctx.globalCompositeOperation = operation;
  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.fillRect(50,100, 300,150);
  ctx.beginPath();
  ctx.fillStyle = 'green';
  ctx.fillRect(150, 200, 300, 150);
}
const textAnimation = () => { //  requestAnimationFrame文字动画
  (() => {
    let i = 0;
    const ctx = canvas.getContext('2d');
    let myRef;
    function animationFunc(timeStamp){
      ctx.clearRect(0,0,500,500);
      ctx.beginPath();
      ctx.font = '50px serif';
      ctx.textAlign = 'start';  //  文本对齐方式：left,right,center,start,end。和direction有关系
      ctx.direction = 'ltr';  //  ltr,rtl,inherit(默认值)
      ctx.textBaseline = 'bottom';  //  基线对齐选项:top,hanging,middle,alphabetic(默认值),ideographic和bottom
      ctx.shadowColor = 'black';
      ctx.shadowOffsetX = 10;
      ctx.shadowOffsetY = 10;
      ctx.shadowBlur = 5;
      ctx.fillText('测试文字', i,250,500);
      ctx.closePath();
      const text = ctx.measureText('Hi Canvas!'); //  返回一个文字属性对象，主要是获取文字长度
      i++;
      console.log('requestAnimationFrame：', timeStamp)
      myRef = requestAnimationFrame(animationFunc);
      if(i + text.width > 500) cancelAnimationFrame(myRef)
    }    
    myRef = requestAnimationFrame(animationFunc)
  })(); 
}
const useClip = (ctx) => { // 裁剪
  const img = new Image();
  img.src = 'logo.png';
  img.onload = () => {
    // ctx.arc(250,250,50,0, Math.PI*2, false);
    const path1 = new Path2D();
    path1.rect(200,200,100,100);
    ctx.clip(path1);
    ctx.drawImage(img,150, 150)
  }
}
const advanceAnimation = (ctx) => {  //  高级动画
  const ball = {
    x: 100,
    y: 50,
    radius: 25,
    color: 'blue',
    vx:1,
    vy:3,
    draw: function(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  };
  function draw(){
    // ctx.clearRect(0,0,500,500);
    //  用带透明度的矩形代替清空
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(0,0,500,500);
    ball.draw();
    //  添加加速度
    ball.vx *= .995
    ball.vy += .35
    //  添加速率
    ball.x += ball.vx;
    ball.y += ball.vy;
    //  添加边界
    const x = ball.x + ball.vx;
    const y = ball.y + ball.vy;
    if(x > 500 || x < 0){
      ball.vx = -ball.vx;
    }
    if(y > 500 || y < 0){
      ball.vy = -ball.vy;
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}
const saveImg = (ctx) => {  //  画布保存图片
  const img = new Image();
  img.src = 'logo.png';
  img.onload = function(){  //  加载一张logo图，附加到home页面
    const imgDom = document.createElement('img');
    imgDom.id = 'img';
    imgDom.src = img.src;
    document.querySelector('#app>.home').appendChild(imgDom);
    setTimeout(() => {  //  把画布的内容转换成图片，替换id为img的图片
      const img = document.querySelector('#img');
      const url = canvas.toDataURL('image/png');
      img.src = url;
      //  下载图片到本地,将base64转换为文件对象
      const arr = url.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];  //  此处得到的为文件类型
      const bstr = atob(arr[1]);  //  解码base64，atob为window自带函数
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      //  通过以下方式将上面的变量生成文件对象，三个参数分别为文件内容、文件名、文件类型
      const file = new File([u8arr], 'img_circle', {type: mime});
      //  将文件通过a标签下载
      const aDom = document.createElement('a');
      aDom.download = file.name;  //  设置文件名
      let href = URL.createObjectURL(file); //  将file对象转换成UTF-16字符串
      aDom.href = href; //  放入href
      document.body.appendChild(aDom);
      aDom.click();
      document.body.removeChild(aDom);
      URL.revokeObjectURL(href);  //  释放刚才生成的UTF-16字符串
    }, 2000);
  }
}
const processColor = (ctx) => { //  反向颜色,灰度图
  const img = new Image();
  img.src = 'logo.png';
  img.onload = function(){
    (function original(){
      const info = {
        x: 0,
        y: 0,
        width: 100,
        height: 100
      }
      ctx.drawImage(img, info.x, info.y, info.width, info.height);
    }());
    (function invert(){
      const info = {
        x: 100,
        y: 0,
        width: 100,
        height: 100
      }
      ctx.drawImage(img, info.x, info.y, info.width, info.height);
      const imageData = ctx.getImageData(info.x, info.y, info.width, info.height);
      const data = imageData.data;
      for(let i = 0,length = data.length; i< length; i+=4){
        data[i] = 255 - data[i];  //  red
        data[i + 1] = 255 - data[i + 1];  //  green
        data[i + 2] = 255 - data[i + 2];  //  blue      
      }
      ctx.putImageData(imageData, info.x, info.y);      
    }());
    (function grayscale(){
      const info = {
        x: 200,
        y: 0,
        width: 100,
        height: 100
      }
      ctx.drawImage(img, info.x, info.y, info.width, info.height);
      const imageData = ctx.getImageData(info.x, info.y, info.width, info.height);
      const data = imageData.data;
      for(let i = 0,length = data.length; i< length; i+=4){
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;  //  red
        data[i + 1] = avg;  //  green
        data[i + 2] = avg;  //  blue      
      }
      ctx.putImageData(imageData, info.x, info.y); 
    }());
  }
}
const colorPick = (canvas,ctx) => {  //  拾色器
  const hoverDom = document.createElement('div');
  const selectDom = document.createElement('div');
  const homeDom = document.querySelector('#app>.home');
  homeDom.appendChild(hoverDom);
  homeDom.appendChild(selectDom);
  hoverDom.style = 'width: 100px;height:100px;border: 1px solid #ccc;font-size:12px;word-break:break-all;';
  selectDom.style= 'width: 100px;height:100px;border: 1px solid #ccc;font-size:12px;word-break:break-all;';
  function pickColor(type, event, destination){
    const x = event.layerX;
    const y = event.layerY;
    const pixel = ctx.getImageData(x,y,1,1);
    const data = pixel.data;
    const rgba = `rgba(${data[0]},${data[1]},${data[2]},${parseFloat(data[3] / 255).toFixed(2)})`;
    destination.style.background = rgba;
    if(type === 'move'){
      destination.textContent = `划过的颜色:${rgba}`;
    }else{
      destination.textContent = `选中的颜色:${rgba}`;
    }
  }
  canvas.addEventListener('mousemove', function(e){
    pickColor('move', e, hoverDom);
  });
  canvas.addEventListener('click', function(e){
    pickColor('click', e, selectDom);
  });
}
const initCanvas = () => {
  const canvas = document.querySelector('#canvas');
  if(canvas.getContext){
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.strokeStyle = 'green';
    ctx.translate(250,250);
    ctx.moveTo(-250, 0);
    ctx.lineTo(250,0);
    ctx.stroke(); 
    ctx.restore();
    ctx.save();
    ctx.translate(250,250);
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(0, 250);
    ctx.lineTo(0, -250);
    ctx.stroke();
    ctx.fillText('x', 250/2, 0);
    ctx.fillText('y', 0,250/2);
    // ctx.restore();
    ctx.rotate(-Math.PI/180 * 90)
    ctx.fillText('x1', 10, 0);
    ctx.fillText('y1', 0, 10);
  }  
}
onMounted(() => {
  initCanvas();
});

</script>
<style lang="scss" scoped>
canvas{
  border: 1px solid gray;
}
</style>