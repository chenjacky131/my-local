const path = require("path");
const fse = require("fs-extra"); 
const saveFile = async (res, files) => {  //  保持文件的操作
  const file = files.file[0];
  const fileToSave = path.resolve(__dirname, file.originalFilename)
  if(fse.existsSync(fileToSave)){
    console.log("文件已存在，将用新文件替换酒旧文件");
    fse.remove(fileToSave).then(() => console.log("删除成功"));
  }
  await fse.move(file.path, fileToSave);
  res.end(JSON.stringify({
    message: "文件上传成功"
  }));
}
const saveFormData = async (res, fields) => { //  保持表单数据
  const {name, age, number} = fields;
  const writer = fse.createWriteStream(path.resolve(__dirname, 'form-info.txt'));
  writer.write(`姓名:${name}\n`, 'utf8');
  writer.write(`年龄:${age}\n`, 'utf8');
  writer.write(`电话:${number}\n`, 'utf8');
  writer.end();
  res.end(JSON.stringify({
    message:"保持成功"
  }))
}
const deleteFile = (res) => {
    fse.unlink(path.resolve(__dirname,'demo.txt'), (err) => {
      if(err&&err.code === 'ENOENT') {
        res.end('文件不存在，删除失败')
      }else{
         res.end('删除成功');
      };     
    })  
}
module.exports = {
  deleteFile: deleteFile
}