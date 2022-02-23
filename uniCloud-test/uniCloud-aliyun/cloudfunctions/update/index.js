'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('table1')
	const res = await collection.where(event.search).update(event.update)
	return res
};
