// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection(event.collectionName).where({
    group: event.group,
    uid: event.uid,
  }).count()
}