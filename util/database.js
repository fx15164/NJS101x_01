const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = cb => {
    mongoClient.connect('mongodb://localhost:27017')
    .then(client => {
        console.log('Conected');
        _db = client.db()
        cb();
    })
    .catch(err => {
        console.log(err);
    })
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw Error('Not database sound');
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;