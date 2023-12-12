/*
 * description: 宽高和边线都需要配置成双倍的大小，绘图的时候再缩小一半这样比较清晰
 */
const commonTriangleShip = {  //  通用三角形船配置
  shape: 'triangleShip',
  strokeWidth: 2,
  triangleWidth: 20,
  triangleHeight: 40
}
const commonRhombusShip = {  //  通用菱形船配置
  shape: 'rhombusShip',
  strokeWidth: 2,
  rhombusWidth: 20,
  rhombusHeight: 40
}
const commonbigShip = {  //  通用放大后的船配置
  shape: 'bigShip',
  strokeWidth: 2,
  bigShipWidth: 80,
  bigShipHeight: (75/20)*80
}
const commonRadarObject = {  //  通用雷达目标配置
  shape: 'radarObject',
  strokeWidth: 2,
  radarObjectRadius: 15,
  centerRadius: 2
}
export const triangleWhite = {  //  三角形船图标白色系
  ...commonTriangleShip,
  fillColor: '#faf763',
  strokeColor: '#444444',
}
export const triangleDark = {  //  三角形船图标暗色系
  ...commonTriangleShip,
  fillColor: '#444444',
  strokeColor: '#faf763',
}
export const triangleFollow = {  //  关注船三角形船图标
  ...commonTriangleShip,
  fillColor: '#ff0000',
  strokeColor: '#444444',
}
export const triangleFollowDark = {  //  关注船三角形船图标暗色系
  ...commonTriangleShip,
  fillColor: '#ff0000',
  strokeColor: '#faf763',
}
export const triangleCutterSuctionDredger = {  // 绞吸船三角形船图标
  ...commonTriangleShip,
  fillColor: '#047CF8',
  strokeColor: '#444444',
}
export const triangleRakeSuctionBoat = {  // 耙吸船三角形船图标
  ...commonTriangleShip,
  fillColor: '#009944',
  strokeColor: '#444444',
}
export const triangleGrabBoat = {  // 抓斗船三角形船图标
  ...commonTriangleShip,
  fillColor: '#EB6100',
  strokeColor: '#444444',
}
export const triangleMudBarget = {  // 泥驳船三角形船图标
  ...commonTriangleShip,
  fillColor: '#992000',
  strokeColor: '#444444',
}
export const triangleSelfPrimingSelfUnloadingVessel = {  // 自吸自卸船三角形船图标
  ...commonTriangleShip,
  fillColor: '#CA09B4',
  strokeColor: '#444444',
}
export const trianglePassengerShip = {  // 客船三角形船图标
  ...commonTriangleShip,
  fillColor: '#51EOFF',
  strokeColor: '#444444',
}
export const triangleCargoShip = {  // 货船三角形船图标
  ...commonTriangleShip,
  fillColor: '#8FBC8F',
  strokeColor: '#444444',
}
export const triangleTankerShip = {  // 油船三角形船图标
  ...commonTriangleShip,
  fillColor: '#9400D3',
  strokeColor: '#444444',
}
export const triangleFishingShip = {  // 渔船三角形船图标
  ...commonTriangleShip,
  fillColor: '#4B0082',
  strokeColor: '#444444',
}
export const triangleHighSpeedShip = {  // 高速船三角形船图标
  ...commonTriangleShip,
  fillColor: '#FFA500',
  strokeColor: '#444444',
}
export const rhombusWhite = {  //  菱形船白色系
  ...commonRhombusShip,
  fillColor: 'transparent',
  strokeColor: '#444444',
}
export const rhombusDark = {  //  菱形船暗色系
  ...commonRhombusShip,
  fillColor: 'transparent',
  strokeColor: '#faf763',
}
export const rhombusFollow = {  //  关注船菱形船
  ...commonRhombusShip,
  fillColor: 'transparent',
  strokeColor: '#ff0000',
}
export const bigShipWhite = {  //  放大后渲染的船白色系
  ...commonbigShip,
  fillColor: '#faf763',
  strokeColor: '#444444',
}
export const bigShipDark = {  //  放大后渲染的船暗色系
  ...commonbigShip,
  fillColor: '#444444',
  strokeColor: '#faf763',
}
export const bigShipFollow = {  //  关注船放大后渲染的船
  ...commonbigShip,
  fillColor: '#ff0000',
  strokeColor: '#444444',
}
export const radarObjectNormal = {  //  雷达目标默认状态
  ...commonRadarObject,
  fillColor: 'white',
  strokeColor: '#d5caca',
  centerFillColor: '#d5caca'
}
export const radarObjectMissed = {  //  消失的雷达目标
  ...commonRadarObject,
  fillColor: '#808080',
  strokeColor: '#808080',
  centerFillColor: 'white'
}
export const fuseObject = { //  融合目标
  shape: 'fuseObject',
  strokeWidth: 2,
  fuseObjectRadius: 15,
  fillColor: 'white',
  strokeColor: '#d5caca',
  fuseObjectTriangleWidth: 16,
  fuseObjectTriangleHeight: 24,
  fuseObjectTriangleColor: '#faf763'
}