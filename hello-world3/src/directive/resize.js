
 // v-resize:ratio-1-2-3-4-5-6.keepRatio(1为1/2为宽高比，3最小宽度，4最大宽度，5最小高度，6最大高度,keepRatio保持宽高比)
export const dirResize = {
  mounted:(el, binding) => {
    //  设置初始样式,el不能有margin,不然计算结果会有误差，出现的结果就是鼠标点击刚移动时，会有一个位移的动作
    const _left = (document.documentElement.clientWidth - el.offsetWidth) / 2;
    const _top = (document.documentElement.clientHeight - el.offsetHeight) / 2;    
    let defaultMinWidth = 300;
    let defaultMaxWidth = 1000;
    let defaultMinHeight = 300;
    let defaultMaxHeight = 1000;
    const keepRatio = binding.modifiers.keepRatio;  //  保持缩放比例
    const ratioString = (binding.arg).split('-');
    const ratio = ratioString[1]/ratioString[2];
    const minWidth = ratioString[3];
    const maxWidth = ratioString[4];
    const minHeight = ratioString[5];
    const maxHeight = ratioString[6];
    minWidth ? defaultMinWidth = minWidth : '';
    maxWidth ? defaultMaxWidth = maxWidth : '';
    minHeight ? defaultMinHeight = minHeight : '';
    maxHeight ? defaultMaxHeight = maxHeight : '';
    el.style.setProperty('position','absolute');
    el.style.setProperty('top',_top + 'px');
    el.style.setProperty('left',_left + 'px');
    el.style.setProperty('z-index','1000');
    const resizeEle = document.createElement('div');
    resizeEle.setAttribute('style',`
      width: 20px;
      height: 20px;
      position:absolute;
      z-index:1000;
      right:0;
      bottom:0;
      border-bottom: 2px solid #000;
      border-right: 2px solid #000;
      cursor:nwse-resize;`);
    resizeEle.setAttribute('class','resize-area');
    const resizeChildEle = document.createElement('div'); //  跳转尺寸的元素
    resizeChildEle.setAttribute('style',`
    width: 10px;
    height: 10px;
    position:absolute;
    right:2px;
    bottom:2px;
    border-bottom: 2px solid #000;
    border-right: 2px solid #000;`);
    resizeChildEle.setAttribute('class','resize-area');
    resizeEle.appendChild(resizeChildEle);
    el.appendChild(resizeEle);
    resizeEle.addEventListener('mousedown', function(e){
      document.documentElement.style.setProperty('cursor','nwse-resize');
      const mousemoveHandler = function(e){ //  处理鼠标移动的逻辑
        let _width = e.clientX - el.offsetLeft;
        let _height = e.clientY - el.offsetTop;
        //  宽度边界的判断
        if(_width < defaultMinWidth){
          _width = defaultMinWidth;
        }else if(_width > defaultMaxWidth){
          _width = defaultMaxWidth;
        }
        //  高度的判断
        if(keepRatio === true){
          _height = _width / ratio;      
        }else{
          if(_height < defaultMinHeight){
            _height = defaultMinHeight;
          }else if(_height > defaultMaxHeight){
            _height = defaultMaxHeight;
          }    
        }
        el.style.setProperty('width',_width + 'px');
        el.style.setProperty('height',_height + 'px');
      }
      document.addEventListener('mousemove', mousemoveHandler)
      document.addEventListener('mouseup', () => {
        document.documentElement.style.setProperty('cursor','auto');
        document.removeEventListener('mousemove', mousemoveHandler);
      });
    });
  }
}; 