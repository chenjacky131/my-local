import L from 'leaflet';
import channelUtils from './channel-utils'
export const IrregularChannel = L.Class.extend({
  initialize:function(data,map,options){
    this.map = map;
    this.data = data;
    this.options = Object.assign({      
      middleLineColor: 'red',
      middleLineWeight: 1,
      channelColor: '#0073f5',
      channelWeight: 2
    },options);
    this._channelMiddleLineLatLngs = []; //  航道中线经纬度
    this.channel; //  航道图形
    this._channelLatlngs = [];  //  航道经纬度
    this.channelMiddleLine; //  航道中线图形
    this.channelWidthLines = []; //  航道宽度线段
    this.channelLengthLines = [];  //  航道长度线段 
    this.channelWithPoly = null;  //  航道宽度的图形
    this.channelLengthPoly = null;  //  航道长度的图形        
    this.generateChannel(data);
  },
  generateChannel:function(data){
    this.resetChannelVariables();
    data.map((latlng, index) => {
      this._channelMiddleLineLatLngs.push(latlng);
      const isLastLatlng = index === data.length - 1;
      this.channelCalculation(this._channelMiddleLineLatLngs, isLastLatlng, index);
    });
  },
  resetChannelVariables:function(){
    this._channelMiddleLineLatLngs = []
    this.channelWidthLines = [];
    this.channelLengthLines = [];   
  },
  channelCalculation:function(channelSegments, channelComplete, index){
    let lastPoint = ''  //  上个点
    let thisPoint = ''  //  这个点
    let middlePoint = '' // 每段的中间点
    let lastTwoPoint = ''  //  上两个点
    let targetPoint1Up = '' //  航线扩展点上部分
    let targetPoint1Down = '' //  航线扩展点下部分
    let targetPoint2Up = '' //  航线扩展点上部分
    let targetPoint2Down = '' //  航线扩展点下部分
    let targetPointMiddleUp = ''  //  每段航道宽度的上线段点
    let targetPointMiddleDown = ''  //  每段航道宽度的下线段点
    let oldTargetPoint2Up = ''  //  上一个点的替换点上
    let oldTargetPoint2Down = ''  //  上一个点的替换点下
    let assistShipChannelLineStart = '' //  用于显示每段航道长度的线段起点
    let assistShipChannelLineEnd = '' //  用于显示每段航道长度的线段终点
    let pointAngle = 0 // 起点和终点的角度
    let pointAngelCorner = 0  //  拐角的地理角度
    let firstChannelWidthLeft = 0// 第一段航道的上宽度
    let firstChannelWidthRight = 0// 第一段航道的下宽度
    let secondChannelWidthLeft = 0// 第二段航道的上宽度
    let secondChannelWidthRight = 0// 第二段航道的下宽度
    if(channelSegments.length < 2){ //  大于等于两个点才开始画航道
      return false;
    }
    for (let i = 0; i < channelSegments.length; i++) {
      if (i === channelSegments.length - 2) { //  新增线段的起点
        lastPoint = channelSegments[i]
        if(channelSegments.length > 2){
          firstChannelWidthLeft = Number(channelSegments[i].widthLeft)
          firstChannelWidthRight = Number(channelSegments[i].widthRight)
        }
      }
      if (i === channelSegments.length - 1) { //  新增线段的终点
        thisPoint = channelSegments[i]
        if(channelSegments.length == 2){
          firstChannelWidthLeft = Number(channelSegments[i].widthLeft)
          firstChannelWidthRight = Number(channelSegments[i].widthRight)
        }else{
          secondChannelWidthLeft = Number(channelSegments[i].widthLeft)
          secondChannelWidthRight = Number(channelSegments[i].widthRight)
        }
      }
      if (channelSegments.length >= 3 && i === channelSegments.length - 3) { //  新增线段前置的点
        lastTwoPoint = channelSegments[i]
      }
    }
    
    middlePoint = {
      lat: '' + (+lastPoint.lat + +thisPoint.lat) /  2,
      lng: '' + (+lastPoint.lng + +thisPoint.lng) /  2,
      widthLeft: thisPoint.widthLeft,
      widthRight: thisPoint.widthRight
    }

    if(channelSegments.length === 2){ //  航道只有两个点的情况
      pointAngle = channelUtils._getRotateAngle(lastPoint, thisPoint) <= 90 ? channelUtils._getRotateAngle(lastPoint, thisPoint) - 90 + 360 : channelUtils._getRotateAngle(lastPoint, thisPoint) - 90  //  垂直于航线的角度
      targetPoint1Up = channelUtils.getLonAndLat(lastPoint.lng, lastPoint.lat, pointAngle, firstChannelWidthLeft)
      targetPoint1Down = channelUtils.getLonAndLat(lastPoint.lng, lastPoint.lat, pointAngle >= 180 ? pointAngle - 180 : pointAngle + 180, firstChannelWidthRight)
      targetPoint2Up = channelUtils.getLonAndLat(thisPoint.lng, thisPoint.lat, pointAngle, firstChannelWidthLeft)
      targetPointMiddleUp = channelUtils.getLonAndLat(middlePoint.lng, middlePoint.lat, pointAngle, firstChannelWidthLeft)
      targetPointMiddleDown = channelUtils.getLonAndLat(middlePoint.lng, middlePoint.lat, pointAngle >= 180 ? pointAngle - 180 : pointAngle + 180, firstChannelWidthRight)
    } else {  //  航线超过两个点后
      pointAngle = channelUtils._getRotateAngle(lastPoint, thisPoint) <= 90 ?
        channelUtils._getRotateAngle(lastPoint, thisPoint) - 90 + 360 :
        channelUtils._getRotateAngle(lastPoint, thisPoint) - 90  //  垂直于航线的角度
      let angle1 = channelUtils._getRotateAngle(lastPoint, lastTwoPoint)
      let angle2 = channelUtils._getRotateAngle(lastPoint, thisPoint)
      let halfAngle = channelUtils._allDirection({ angle1: angle1, angle2: angle2 }, 'halfAngle')
      let bevelLength1 = 0 //  第一部分航道夹角对角线的长度
      let bevelLength2 = 0 //  第二部分航道夹角对角线的长度
      let bevelLength3 = 0 //  第三部分航道夹角对角线的长度
      let bevelLength4 = 0 //  第四部分航道夹角对角线的长度
      pointAngelCorner = channelUtils._fixDeg(channelUtils._allDirection({ angle1: angle1, angle2: angle2, halfAngle: halfAngle }, 'cornerAngle'))
      bevelLength1 = channelUtils._allDirection({ dis: firstChannelWidthLeft, angle1: angle1, angle2: angle2, pointAngelCorner: pointAngelCorner, halfAngle: halfAngle }, 'bevelLength')
      bevelLength2 = channelUtils._allDirection({ dis: firstChannelWidthRight, angle1: angle1, angle2: angle2, pointAngelCorner: pointAngelCorner, halfAngle: halfAngle }, 'bevelLength')
      bevelLength3 = channelUtils._allDirection({ dis: secondChannelWidthLeft, angle1: angle1, angle2: angle2, pointAngelCorner: pointAngelCorner, halfAngle: halfAngle }, 'bevelLength')
      bevelLength4 = channelUtils._allDirection({ dis: secondChannelWidthRight, angle1: angle1, angle2: angle2, pointAngelCorner: pointAngelCorner, halfAngle: halfAngle }, 'bevelLength')
      //  折角
      oldTargetPoint2Up = channelUtils.getLonAndLat(lastPoint.lng, lastPoint.lat, pointAngelCorner, bevelLength1)
      oldTargetPoint2Down = channelUtils.getLonAndLat(lastPoint.lng, lastPoint.lat, pointAngelCorner >= 180 ? pointAngelCorner - 180 : pointAngelCorner + 180, bevelLength2)
      targetPoint1Up = channelUtils.getLonAndLat(lastPoint.lng, lastPoint.lat, pointAngelCorner, bevelLength3)
      targetPoint1Down = channelUtils.getLonAndLat(lastPoint.lng, lastPoint.lat, pointAngelCorner >= 180 ? pointAngelCorner - 180 : pointAngelCorner + 180, bevelLength4)
      //  折角结束
      targetPoint2Up = channelUtils.getLonAndLat(thisPoint.lng, thisPoint.lat, pointAngle, secondChannelWidthLeft)
      targetPoint2Down = channelUtils.getLonAndLat(thisPoint.lng, thisPoint.lat, pointAngle >= 180 ? pointAngle - 180 : pointAngle + 180, secondChannelWidthRight)
      //  替换上一段的末端上下点
      if(index > 1){
        this._channelLatlngs[index - 2][1] = oldTargetPoint2Up
        this._channelLatlngs[index - 2][2] = oldTargetPoint2Down
      }
      targetPointMiddleUp = channelUtils.getLonAndLat(middlePoint.lng, middlePoint.lat, pointAngle, secondChannelWidthLeft)
      targetPointMiddleDown = channelUtils.getLonAndLat(middlePoint.lng, middlePoint.lat, pointAngle >= 180 ? pointAngle - 180 : pointAngle + 180, secondChannelWidthRight)
    }
    assistShipChannelLineStart = lastPoint
    assistShipChannelLineEnd = thisPoint
    //  往航道区域里面塞点
    this._channelLatlngs.push([
      targetPoint1Up,
      targetPoint2Up,
      targetPoint2Down,
      targetPoint1Down
    ])
    this.channelWidthLines.push({
      layer: L.polyline([targetPointMiddleDown, targetPointMiddleUp], {
        weight: 1,
        color: 'red',
        dashArray: [2,5]
      }),
      width: +middlePoint.widthOne + +middlePoint.widthTwo
    })
    this.channelLengthLines.push({
      layer: L.polyline([assistShipChannelLineStart, assistShipChannelLineEnd]),
      length: Math.round(this.map.distance(assistShipChannelLineStart, assistShipChannelLineEnd))
    })
    if(channelComplete){
      let channelLatlngs = []  //  航道区域点经纬度数组
      if (this._channelLatlngs.length === 1) { //  航线只有两个点的时候
        channelLatlngs.push(this._channelLatlngs[0][0])
        channelLatlngs.push(this._channelLatlngs[0][1])
        channelLatlngs.push(this._channelLatlngs[0][2])
        channelLatlngs.push(this._channelLatlngs[0][3])
      } else {
        for (let i = 0; i < this._channelLatlngs.length; i++) {  //  正向取航线上面的点
          if (i === this._channelLatlngs.length - 1) {
            channelLatlngs.push(this._channelLatlngs[i][0])
            channelLatlngs.push(this._channelLatlngs[i][1])
            channelLatlngs.push(this._channelLatlngs[i][2])
            channelLatlngs.push(this._channelLatlngs[i][3])
          } else {
            channelLatlngs.push(this._channelLatlngs[i][0])
            channelLatlngs.push(this._channelLatlngs[i][1])
          }
        }
        for (let i = this._channelLatlngs.length - 2; i >= 0; i--) { //  逆向取航线下面的点
          channelLatlngs.push(this._channelLatlngs[i][2])
          channelLatlngs.push(this._channelLatlngs[i][3])
        }
      }
      channelLatlngs.push(this._channelLatlngs[0][0]) //  封闭多边形
      let channelMiddleLineLatlngs = channelSegments.map(item => {
        return {
          lat: item.lat,
          lng: item.lng
        }
      });
      this.channel = L.polygon(channelLatlngs,{
        weight: this.options.channelWeight,
        color: this.options.channelColor
      });
      this.channelMiddleLine = L.polyline(channelMiddleLineLatlngs,{
        weight: this.options.middleLineWeight,
        color: this.options.middleLineColor
      });
    }
  }
})