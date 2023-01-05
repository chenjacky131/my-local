const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'runoob';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('数据库连接成功');
  const db = client.db(dbName);
  const collection = db.collection('site');
  // the following code examples can be pasted here...
  //  插入数据
  // const res = await collection.insertOne({name: "测试4", url:"http://www.baidu.com"})
  // const res  = await collection.insertMany([
  //   {
  //     name: '测试5',
  //     url: 'http://www.baidu.com'
  //   },
  //   {
  //     name: '测试6',
  //     url: 'http://www.baidu.com'
  //   },
  //   {
  //     name: '测试7',
  //     url: 'http://www.baidu.com'
  //   },
  // ])
  //  查询结果
  // const res = await collection.find({name: "测试1"}).toArray()
  //  修改数据
  // await collection.updateOne(
  //   {name: '测试7'},
  //   {
  //     $set: {
  //       url: 'http://www.google.com'
  //     },
  //     $currentDate: { lastModified: true }
  //   }
  // )
  //  删除数据
  // await collection.deleteOne({name: '测试7'})
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close())