const db = uniCloud.database()
exports.main = async (event, context) => {
        let {id} = event 
        //删除是remove不能写错了
        return await db.collection("days_book").doc(id).remove()
};
