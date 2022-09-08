/*
 * @description: 协商缓存
 * 创建服务
 * 首次请求 解析请求路径， fs.createReadStream().pipe() 读取文件
 * 设置响应头Last-modified 返回浏览器
 * 再次请求，比较浏览器if-last-modified 和当前资源修改时间，相等则命中协商缓存，返回响应码304，反之返回路径对应的最新资源，和响应码200
 */
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const server = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url, true);
  res.setHeader('Cache-Control', 'no-cache')  //  禁用强缓存，才能进去协商缓存，否则，进入的是强缓存
  let filePath = path.join(__dirname, 'public', pathname) //  拼接出文件的路径
  fs.stat(filePath, function(err, statObj){
    if(err){
      res.statusCode = 404;
      res.end('NOT FOUND')      
    }else{
      if(statObj.isFile()){ //  判断浏览器请求的文件路径的change时间，通过statObj的ctime获得
        const ctime = statObj.ctime.toUTCString() //  获取文件的修改时间
        if(req.headers['if-modified-since'] === ctime){ //  如果请求头文件的上次修改时间等于文件的上次修改时间，命中协商缓存
          res.statusCode = 304
          res.end()
        }else{
          res.setHeader('Last-modified', ctime)
          fs.createReadStream(filePath).pipe(res)
          res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8')          
        }
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