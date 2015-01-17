var db = require('./mongo');

db.connect();

console.log(db.db());
