//  管道流
const fse = require('fs-extra')
//  创建一个可读流
const readStream = fse.createReadStream('./node/demo.txt')
//  创建一个可写流
const writeStream = fse.createWriteStream('./node/demo_copy.txt')
//  管道读取操作
readStream.pipe(writeStream)
console.log('程序执行完毕')