//  链式流解压文件
const fse = require('fs-extra')
const zlib = require('zlib')
fse.createReadStream('./node/test.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fse.createWriteStream('test.txt'));
console.log('文件解压完成')