//  EventEmitter支持若干个事件监听器
const events = require('events');
const event = new events.EventEmitter();
event.on('some_event', function(arg1, arg2){
  console.log('事件1触发', arg1, arg2)
})
event.on('some_event', function(arg1, arg2){
  console.log('事件2触发', arg1, arg2)
})
setTimeout(() => {
  event.emit('some_event', '参数1', '参数2')
}, 1000);
console.log(event.listenerCount('some_event'))