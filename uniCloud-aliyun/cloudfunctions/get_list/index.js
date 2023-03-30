const db = uniCloud.database()
exports.main = async (event, context) => {
  let {collectionName="days_book",skip=0} =event
 return await db.collection(collectionName).limit(5).skip(skip).orderBy("time","desc").get()
};
