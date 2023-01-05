const http = require("http"); //  文件处理模块
const server = http.createServer(function(req, res){
  res.writeHead(200, {"Content-Type":"text/plain"});
  res.end('Hello World');
});

server.on("request", async (req, res) => {
  //  处理跨域问题，允许所有请求头和请求源
  if(req.url === "/upload"){
    multipart = new multiparty.Form();
    multipart.parse(req, async(err, fields, files) => {
      if(err){
        console.log("出错：", err);
        return
      }
      deleteFile(res);
    })
  }
})

server.listen(3030, () => {
  console.log("服务已启动http://127.0.0.1:3030")
})