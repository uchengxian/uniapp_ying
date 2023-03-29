const db = uniCloud.database()
exports.main = async (event, context) => {
  let {detail,titles} = event
	return await db.collection("list_images").add({
    title:titles,
    url:detail[0],
    time:Date.now()
  })
};
