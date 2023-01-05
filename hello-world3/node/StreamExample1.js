//  读取流
const fse = require("fs-extra");
let data = '';
//  创建可读流
const readeStream = fse.createReadStream('./node/BufferExample1.js');
//  设置编码为utf-8
readeStream.setEncoding('UTF8');
//  处理流事件
readeStream.on('data', (chunk) => {
  data += chunk;
});
readeStream.on('end', () => {
  console.log('读取到的数据:',data);
});
readeStream.on('error', (err) => {
  console.log(err.stack)
})
console.log('程序执行完毕')