const db = uniCloud.database()
exports.main = async (event, context) => {
  let {id} = event 
  return await db.collection("days_book").doc(id).get()
};
