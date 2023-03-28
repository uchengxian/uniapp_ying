'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  let {detail} = event 
	//返回数据给客户端
	return await db.collection("days_book").doc(detail._id).update({
    title:detail.title,
    content :detail.content
  })
};
