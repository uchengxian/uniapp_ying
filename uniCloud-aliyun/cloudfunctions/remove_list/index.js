'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
 let {id} = event
 //删除是remove不能写错了
 return await db.collection("TodoList").doc(id).remove()
};
