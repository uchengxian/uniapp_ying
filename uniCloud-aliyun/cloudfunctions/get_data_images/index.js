const db = uniCloud.database()
exports.main = async (event, context) => {
      return await db.collection("list_images").orderBy("time","desc").get()
};
