//  链式流压缩文件
const fse = require('fs-extra')
const zlib = require('zlib')
fse.createReadStream('./node/demo.txt')
  .pipe(zlib.createGzip())
  .pipe(fse.createWriteStream('./node/test.txt.gz'))
console.log('文件压缩完成')