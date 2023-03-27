'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  let {skip=0} =event
 return await db.collection("TodoList").limit(6).skip(skip).orderBy("time","desc").get()
};
