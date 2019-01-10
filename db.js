var mongojs = require('mongojs');

var databaseUrl = 'mongodb://localhost/tgr2019test';
var collections = ['users'];
var option = {"auth":{"user":"admin","password":"trg"}}

var connect = mongojs(databaseUrl, collections);

module.exports = {
    connect: connect
};