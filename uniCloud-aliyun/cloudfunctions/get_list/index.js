'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  let {skip=0} =event
  console.log(skip);
 return await db.collection("TodoList").limit(5).skip(skip).orderBy("time","desc").get()
};
