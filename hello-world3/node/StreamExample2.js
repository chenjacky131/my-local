//  写入流
const fse = require('fs-extra')
let data = '测试文字'
//  创建一个写入流
const writeStream = fse.createWriteStream('output.txt')
//  使用utf-8编码写入数据
writeStream.write(data, 'UTF8');
//  标记文件末尾
writeStream.end()
//  处理流事件
writeStream.on('finish', () => {
  console.log('写入完成')
})
writeStream.on('error', (err) => {
  console.log(err.stack)
})
console.log('程序执行完毕')
