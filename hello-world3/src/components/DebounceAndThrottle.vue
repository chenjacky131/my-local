<template>
  防抖和节流函数
</template>
<script setup>
/**
 * @description: 防抖函数，在给定的时间内触发多次，只执行一次
 * @param {Function} func  需要执行的函数
 * @param {Number} wait  等待的时长毫秒
 * @return {Function}  包装好的防抖函数
 */
const debounce = (func, wait) => {
  let timer,context
  return function(...args){
    context = this;
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.call(context,args);
    }, wait);
  }
};
/**
 * @description: 节流函数，每隔给定时长，调用一次
 * @param {Function} func 要调用的函数
 * @param {Number} wait 调用间隔
 * @return {Function}  包装好的节流函数
 */
const throttle = (func, wait) => {
  let timeNow,context,args,timeLast = 0;  
  return function(){
    context = this;    
    timeNow = +new Date();
    args = arguments;
    if(timeNow - timeLast > wait){
      func.apply(context,args);
      timeLast = timeNow;
    }
  }
}
// const handleMove = throttle(function(e){
//   console.log(e, this)
// }, 1000);
const handleMove = debounce(function(e){
  console.log(e, this)
}, 200);
document.body.addEventListener('mousemove', handleMove);
</script>
