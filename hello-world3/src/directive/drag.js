//  使用 v-drag:title加参数知道拖动哪个元素，默认拖动整个el
export const dirDrag = {
  mounted:(el, binding) => {
    let dragElement = el;
    if(binding.arg){
      dragElement = el.querySelector(`.${binding.arg}`);
    }
    //  设置初始样式,el不能有margin,不然计算结果会有误差，出现的结果就是鼠标点击刚移动时，会有一个位移的动作
    const _left = (document.documentElement.clientWidth - el.offsetWidth) / 2;
    const _top = (document.documentElement.clientHeight - el.offsetHeight) / 2;    
    el.style.setProperty('position','absolute');
    el.style.setProperty('top',_top + 'px');
    el.style.setProperty('left',_left + 'px');
    el.style.setProperty('z-index','1000');
    dragElement.style.setProperty('cursor','move');
    dragElement.addEventListener('mousedown', function(e){
      //  记录点击的那个点距离el的左边距和上边距
      const _clickedLeftDis = e.clientX - el.offsetLeft;
      const _clickedTopDis = e.clientY - el.offsetTop;
      const mousemoveHandler = function(e){ //  处理鼠标移动的逻辑
        let _left = e.clientX - _clickedLeftDis;
        let _top = e.clientY - _clickedTopDis;
        const minLeft = 0;  //  最小左边距
        const maxLeft = document.documentElement.clientWidth - el.offsetWidth;  //  最大左边距
        const minTop = 0; //  最小上边距
        const maxTop = document.documentElement.clientHeight - el.offsetHeight;  //  最大上边距
        //  判断左右边距
        if(_left < minLeft){
          _left = minLeft;
        }else if(_left > maxLeft){
          _left = maxLeft;
        }
        //  判断上下边距
        if(_top < minTop){
          _top = minTop;
        }else if(_top > maxTop){
          _top = maxTop;
        }
        el.style.setProperty('position','absolute');
        el.style.setProperty('top',_top + 'px');
        el.style.setProperty('left',_left + 'px');
        el.style.setProperty('z-index','1000');
      }
      if(![...e.target.classList].includes('resize-area')){ //  跳转大小的区域不能拖动
        document.addEventListener('mousemove', mousemoveHandler)
      }      
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', mousemoveHandler);
      });
    });
  }
}; 