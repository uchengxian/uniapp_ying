const db = uniCloud.database()
exports.main = async (event, context) => {
  let {detail,titles,table} = event
	return await db.collection(table).add({
    title:titles,
    url:detail[0],
    time:Date.now()
  })
};
