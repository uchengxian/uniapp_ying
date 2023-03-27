const db = uniCloud.database()
exports.main = async (event, context) => {
  let {detail} = event
	return await db.collection("days_book").add({
    ...detail,
    time:Date.now()
  })
};
