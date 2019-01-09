var mongojs = require('mongojs');

var databaseUrl = 'mongodb://202.139.192.107/tgr2019test';
var collections = ['user'];
var option = {"auth":{"user":"admin","password":"trg"}}

var connect = mongojs(databaseUrl, collections, option);

module.exports = {
    connect: connect
};