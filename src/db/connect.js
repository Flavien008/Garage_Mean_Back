const { MongoClient, Db } = require("mongodb");
const config = require('config');

let client = null;
const dbName = config.get('garage_mean');

function connect(url, callback) {
  if (client === null) {
    client = new MongoClient(url);

    client.connect((err) => {
      if (err) {
        client = null;
        callback(err);
      } else {
        callback();
      }
    });
  } else {
    callback();
  }
}

function db() {
  var db = new Db(client, dbName);
  return db;
}

function fermer() {
  if (client) {
    client.close();
    client = null;
  }
}

module.exports = { connect, client, db, fermer };
