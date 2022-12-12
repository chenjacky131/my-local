let angleRadian = {
  rad: function rad(d) {  //  角度转成弧度
    return d * Math.PI / 180.0;
  },
  deg: function deg(d) {  //  弧度转成角度
    return d * 180 / Math.PI
  }
}
export default angleRadian