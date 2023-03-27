const db = uniCloud.database()
exports.main = async (event, context) => {
  let {content} = event
	return await db.collection("TodoList").add({
    time:Date.now(),
    content 
   })
};
