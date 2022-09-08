/**
 * @description: 强缓存的设置
 * 创建服务
 *首次请求 解析请求路径， fs.createReadStream().pipe() 读取文件
 *设置响应头Cache-Control：max-age=10 强缓存的相对时间
 */
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const server = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url, true);
  let filePath = path.join(__dirname, 'public', pathname) //  拼接出文件的路径
  console.log(req.url)  //  命中强缓存10秒内打印一次
  res.setHeader('Cache-Control', 'max-age=10')  //  设置强缓存过期时间为10秒
  res.setHeader('Expires', new Date(Date.now() + 10).toUTCString()) //  兼容低版本浏览器，设置绝对时间，获取的是服务器当前的时间
  fs.stat(filePath, function(err, statObj){
    if(err){
      res.statusCode = 404;
      res.end('NOT FOUND')      
    }else{
      if(statObj.isFile()){ //  如果是文件，用可读流加管道pipe进行文件内容到读取，利用mime获取文件内容格式，并设置编码规范为utf-8
        fs.createReadStream(filePath).pipe(res)
        res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8')
      }else{  //  如果是目录，找到目录下对应的index.html文件
        let htmlPath = path.join(filePath, 'index.html')
        fs.access(htmlPath, (err) => {  //  fs.access判断拼接的路劲是否可以访问
          if(err){
            res.statusCode = 404
            res.end('NOT FOUND')
          }else{
            fs.createReadStream(htmlPath).pipe(res)
            res.setHeader('Content-type', 'text/html;charset=utf-8')
          }
        })
      }
    }
  })
})
server.listen(3333, () => {
  console.log('server running at : 3333')
})