const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const mongoConnect = cb => {
    mongoClient.connect('mongodb+srv://admin:admin@cluster0.qczkvke.mongodb.net/?retryWrites=true&w=majority')
    .then(reuslt => {
        console.log('Conected');
        cb(reuslt);
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = mongoConnect;