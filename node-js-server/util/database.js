/* const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
	MongoClient.connect(
		" mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.5"
	)
		.then(client => {
			console.log("Connected!");
			_db = client.db();
			callback();
		})
		.catch(err => {
			console.log(err);
			throw err;
		});
};

const getDb = () => {
	if (_db) {
		return _db;
	}
	throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb; */
