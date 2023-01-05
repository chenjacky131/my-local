const http = require("http");
const multiparty = require("multiparty"); //  处理formData对象的中间件
const path = require("path");
const fse = require("fs-extra");  //  文件处理模块

const server = http.createServer();
const UPLOAD_DIR = path.resolve(__dirname, ".", "qiepian"); //  在当前目录创建一个切片文件夹
//  解析post请求传递的参数
function resolvePost(req){
  return new Promise(resolve => {
    let chunk = "";
    req.on("data", data => {
      chunk += data;
    });
    req.on("end", () => {
      resolve(JSON.parse(chunk));
    })
  })
}
/**
 * @description: 合并切片
 * @param {*} filePath  合并后生成的文件路径
 * @param {*} fileName  文件名
 * @param {*} size  切片的尺寸
 * @return {*}
 */
async function mergeFileChunk(filePath, fileName, size){
  const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`);  //  切片所在目录
  let chunkPaths = await fse.readdir(chunkDir); //  所有切片路径
  chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1]); //  按顺序排列切片路径
  const arr = chunkPaths.map((chunkPath, index) => {
    return pipeStream(
      path.resolve(chunkDir, chunkPath),
      fse.createWriteStream(filePath, {
        start: index * size,
        end: (index + 1) * size
      })
    )
  })
  await Promise.all(arr); //  保证所有切片都被读取
}
/**
 * @description: 生成合并后的文件
 * @param {*} path  文件路径
 * @param {*} writeStream 文件流
 * @return {*}
 */
function pipeStream(path, writeStream){
  return new Promise(resolve => {
    const readStream = fse.createReadStream(path);
    readStream.pipe(writeStream);
    readStream.on("end", () => {
      fse.unlinkSync(path)
      resolve()
    });
  })
}
server.on("request", async (req, res) => {
  //  处理跨域问题，允许所有请求头和请求源
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if(req.url === "/upload"){
    const multipart = new multiparty.Form(); //  解析FormData对象
    multipart.parse(req, async (err, fields, files) => {
      if(err){  //  解析失败
        return
      }
      const [file] = files.file;
      const [fileName] = fields.fileName;
      const [chunkName] = fields.chunkName;
      const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`);  //  在qiepian文件夹下，创建新的文件夹，存放接收到的所有切片
      if(!fse.existsSync(chunkDir)){  //  文件夹不存在，新建改文件夹
        await fse.mkdirs(chunkDir);
      }

      //  把切片移动进chunkDir
      await fse.move(file.path, `${chunkDir}/${chunkName}`);
      res.end(JSON.stringify({  //  向前端输出
        code: 0,
        message: "切片上传成功"
      }))
    })
  }
  if(req.url === "/merge"){
    const data = await resolvePost(req);
    const {
      fileName,
      size
    } = data;
    const filePath = path.resolve(UPLOAD_DIR, fileName);  //  获取切片路径
    await mergeFileChunk(filePath, fileName, size);
    res.end(JSON.stringify({
      code: 0,
      message: "文件合并成功"
    }))
  }
})

server.listen(3000, () => {
  console.log("服务已启动")
})