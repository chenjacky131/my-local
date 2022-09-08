'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('table1')
	const res = await collection.skip((event.current - 1) * event.pageSize).limit(event.pageSize).get()
	return res
};
