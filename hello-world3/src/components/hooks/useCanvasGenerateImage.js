
const drawTriangle = (ctx, triangleWidth, triangleHeight, strokeWidth) => { //  绘制三角形
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(strokeWidth + triangleWidth/2, strokeWidth);
  ctx.lineTo(triangleWidth + strokeWidth, strokeWidth + triangleHeight);
  ctx.lineTo(strokeWidth, strokeWidth + triangleHeight);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}
const drawRhombus = (ctx, rhombusWidth, rhombusHeight, strokeWidth) => { //  绘制菱形
  ctx.beginPath();
  ctx.moveTo(strokeWidth + rhombusWidth/2, strokeWidth);
  ctx.lineTo(rhombusWidth + strokeWidth, strokeWidth + rhombusHeight/2);
  ctx.lineTo(strokeWidth + rhombusWidth/2, strokeWidth + rhombusHeight);
  ctx.lineTo(strokeWidth, strokeWidth + rhombusHeight/2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
const drawbigShip = (ctx, bigShipWidth, bigShipHeight, strokeWidth) => { //  放大后的船
  const shipHeadIrregularHeight = (13/75) * bigShipHeight;  //  船头不规则部分的高度
  const shipTailIrregularHeight = (6/75) * bigShipHeight;  //  船尾不规则部分的高度
  const shipTailIndentationWidth = (4/20)* bigShipWidth; //  船尾缩进部分的宽度
  ctx.beginPath();
  ctx.moveTo(strokeWidth + bigShipWidth/2, strokeWidth); //  1
  ctx.lineTo(bigShipWidth + strokeWidth, shipHeadIrregularHeight + strokeWidth); //  2
  ctx.lineTo(bigShipWidth + strokeWidth, bigShipHeight - shipTailIrregularHeight + strokeWidth);  //  3
  ctx.lineTo(strokeWidth + bigShipWidth - shipTailIndentationWidth, bigShipHeight + strokeWidth); //  4
  ctx.lineTo(strokeWidth + shipTailIndentationWidth, bigShipHeight + strokeWidth); //  5
  ctx.lineTo(strokeWidth, bigShipHeight - shipTailIrregularHeight + strokeWidth);  //  6
  ctx.lineTo(strokeWidth, shipHeadIrregularHeight + strokeWidth); //  7
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
/**
 * @description: 绘制圆形(雷达目标)
 * @param {*} ctx 画布对象
 * @param {*} radarObjectRadius 雷达目标半径
 * @param {*} centerRadius  中心点的圆半径
 * @param {*} strokeWidth 描边颜色
 * @param {*} centerFillColor 中心点颜色
 * @return {*}
 */
const drawCircle = (ctx, radarObjectRadius, centerRadius, strokeWidth, centerFillColor) => { //  绘制圆形
  ctx.beginPath();
  ctx.arc(radarObjectRadius+strokeWidth, radarObjectRadius+strokeWidth, radarObjectRadius, 0, Math.PI/180*360);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  //  绘制雷达目标中间的圆点
  ctx.fillStyle = centerFillColor;
  ctx.beginPath();
  ctx.arc(radarObjectRadius + strokeWidth, radarObjectRadius + strokeWidth, centerRadius, 0, Math.PI/180*360);
  ctx.closePath();
  ctx.fill();
}
/**
 * @description:  生成图片
 * @param {*} options 属性
 * shape形状，
 * fillColor填充颜色
 * strokeColor描边颜色
 * strokeWidth描边宽度
 * triangleWidth三角形宽度
 * triangleHeight三角形高度
 * rhombusWidth菱形宽度
 * rhombusHeight菱形高度
 * bigShipWidth放大后船型的宽
 * bigShipHeight放大后船型的高
 * radarObjectRadius雷达目标半径
 * centerFillColor雷达目标中心点颜色
 * fuseObjectRadius融合目标圆的半径
 * fuseObjectTriangleWidth融合目标里面三角形的宽
 * fuseObjectTriangleHeight融合目标里面三角形的高
 * fuseObjectTriangleColor融合目标里面三角形的填充颜色
 * 备注：形状绘制点都是从顶上开始，顺时针开始绘制
 * @return {*}  生成的图片
 */
export const canvasGenerateImage = (options) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const {
    shape, 
    fillColor, 
    strokeColor, 
    strokeWidth, 
    triangleWidth, 
    triangleHeight,
    rhombusWidth,
    rhombusHeight,
    bigShipWidth,
    bigShipHeight,
    radarObjectRadius,
    centerRadius,
    centerFillColor,
    fuseObjectRadius,
    fuseObjectTriangleWidth,
    fuseObjectTriangleHeight,
    fuseObjectTriangleColor
  } = options;
  if(shape ==='triangleShip'){  //  三角形船
    //  画布的宽高要在设置绘制样式之前设置
    canvas.width = triangleWidth + strokeWidth*2;
    canvas.height = triangleHeight + strokeWidth*2;
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    drawTriangle(ctx, triangleWidth, triangleHeight, strokeWidth);
  }else if(shape === 'rhombusShip'){ //  菱形船
    canvas.width = rhombusWidth + strokeWidth*2;
    canvas.height = rhombusHeight + strokeWidth*2;
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    drawRhombus(ctx, rhombusWidth, rhombusHeight, strokeWidth);
  }else if(shape === 'bigShip'){ //  放大后按实际大小渲染的船
    canvas.width = bigShipWidth + strokeWidth*2;
    canvas.height = bigShipHeight + strokeWidth*2;
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    drawbigShip(ctx, bigShipWidth, bigShipHeight, strokeWidth);
  }else if(shape === 'radarObject'){ //  雷达目标
    canvas.width = radarObjectRadius*2 + strokeWidth*2;
    canvas.height = radarObjectRadius*2 + strokeWidth*2;
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    drawCircle(ctx, radarObjectRadius, centerRadius, strokeWidth, centerFillColor);
  }else if(shape === 'fuseObject'){ //  融合目标
    canvas.width = fuseObjectRadius*2 + strokeWidth*2;
    canvas.height = fuseObjectRadius*2 + strokeWidth*2;
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    drawCircle(ctx, fuseObjectRadius, 0, strokeWidth, 'transparent');
    ctx.fillStyle = fuseObjectTriangleColor;
    ctx.beginPath();
    ctx.moveTo(strokeWidth + fuseObjectRadius, strokeWidth*2);
    ctx.lineTo(strokeWidth + fuseObjectRadius + fuseObjectTriangleWidth/2, strokeWidth*2 + fuseObjectTriangleHeight);
    ctx.lineTo(strokeWidth + fuseObjectRadius - fuseObjectTriangleWidth/2, strokeWidth*2 + fuseObjectTriangleHeight);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  return canvas.toDataURL();  //  将画布的绘制结果导出到base64格式的图片地址
}
export const generateBigShipImage = (width, fillColor, strokeColor) => {
  const bigShipWidth = width;
  const bigShipHeight = (75/20) * bigShipWidth;
  return canvasGenerateImage({
    shape: 'bigShip',
    strokeWidth: 2,
    bigShipHeight,
    bigShipWidth,
    fillColor,
    strokeColor,
  })
}