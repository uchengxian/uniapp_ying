const db = uniCloud.database()
exports.main = async (event, context) => {
  let {skip=0} =event 
      return await db.collection("days_book").limit(5).skip(skip).orderBy("time","desc").get()
};
